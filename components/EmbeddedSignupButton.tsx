'use client'

import Script from 'next/script'
import { useCallback, useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    fbAsyncInit?: () => void
    FB: any
  }
}

const APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID
const CONFIG_ID = process.env.NEXT_PUBLIC_FB_LOGIN_CONFIG_ID

export default function EmbeddedSignupButton() {
  const [sdkReady, setSdkReady] = useState(false)

  // simpan session info dari postMessage
  const wabaIdRef = useRef<string | null>(null)
  const phoneIdRef = useRef<string | null>(null)

  useEffect(() => {
    // 1) Listener session info dari popup
    const onMessage = (event: MessageEvent) => {
      // hanya terima dari domain FB
      if (
        event.origin !== 'https://www.facebook.com' &&
        event.origin !== 'https://web.facebook.com'
      ) {
        return
      }
      try {
        const data = JSON.parse(event.data as string)
        if (data?.type === 'WA_EMBEDDED_SIGNUP') {
          if (data.event === 'FINISH') {
            const { phone_number_id, waba_id } = data.data || {}
            wabaIdRef.current = waba_id ?? null
            phoneIdRef.current = phone_number_id ?? null
            console.log('FINISH:', { waba_id, phone_number_id })
          } else if (data.event === 'CANCEL') {
            console.warn('User cancelled at step:', data?.data?.current_step)
          } else if (data.event === 'ERROR') {
            console.error('Flow error:', data?.data?.error_message)
          }
        }
        // (opsional) tampilkan raw payload untuk debugging
        // console.log("Session info:", data);
      } catch {
        // non-JSON messages can be ignored
      }
    }
    window.addEventListener('message', onMessage)

    // 0) Init FB SDK
    window.fbAsyncInit = function () {
      if (!APP_ID) {
        console.error('Missing NEXT_PUBLIC_FB_APP_ID')
        return
      }
      window.FB.init({
        appId: APP_ID,
        autoLogAppEvents: true,
        xfbml: false,
        version: 'v24.0',
      })
      setSdkReady(true)
    }

    return () => window.removeEventListener('message', onMessage)
  }, [])

  // 2) Callback setelah FB.login
  const fbLoginCallback = useCallback(async (response: any) => {
    // response.authResponse.code akan ada jika response_type='code'
    if (response?.authResponse?.code) {
      const code = response.authResponse.code as string
      const waba_id = wabaIdRef.current
      const phone_number_id = phoneIdRef.current

      // kirim ke backend untuk exchange token (server-to-server)
      await fetch('/api/es/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, waba_id, phone_number_id }),
      }).catch(console.error)

      alert('Signup selesai. Code & IDs dikirim ke server.')
    } else {
      console.log('Login cancelled/closed.', response)
    }
  }, [])

  // 3) Launch flow saat tombol diklik
  const launchWhatsAppSignup = useCallback(() => {
    if (!window.FB) return

    window.FB.login(fbLoginCallback, {
      config_id: CONFIG_ID, // ← wajib: Configuration ID
      response_type: 'code', // ← wajib untuk System User token
      override_default_response_type: true, // ← pastikan pakai 'code'
      extras: {
        version: 'v3',
        sessionInfoVersion: '3',
        featureType: 'whatsapp_business_app_onboarding', // ← ini kunci "Business App Onboarding"
        // setup: { ... } // opsional: prefill (nama bisnis, email, dsb.)
      },
    })
  }, [fbLoginCallback])

  return (
    <>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        async
        defer
        crossOrigin="anonymous"
      />
      <button
        onClick={launchWhatsAppSignup}
        disabled={!sdkReady}
        style={{
          padding: '12px 16px',
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          background: sdkReady ? '#111827' : '#9ca3af',
          color: 'white',
          fontWeight: 600,
          cursor: sdkReady ? 'pointer' : 'not-allowed',
        }}
      >
        {sdkReady ? 'Login with Facebook' : 'Loading Facebook SDK...'}
      </button>
    </>
  )
}

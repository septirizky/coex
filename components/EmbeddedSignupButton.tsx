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
  const wabaIdRef = useRef<string | null>(null)
  const phoneIdRef = useRef<string | null>(null)

  useEffect(() => {
    window.addEventListener('message', (event: MessageEvent) => {
      if (
        event.origin !== 'https://www.facebook.com' &&
        event.origin !== 'https://web.facebook.com'
      )
        return
      try {
        const data = JSON.parse(String(event.data))
        if (data?.type === 'WA_EMBEDDED_SIGNUP') {
          if (data.event === 'FINISH') {
            const { phone_number_id, waba_id } = data.data || {}
            wabaIdRef.current = waba_id ?? null
            phoneIdRef.current = phone_number_id ?? null
            console.log('FINISH:', { waba_id, phone_number_id })
          } else if (data.event === 'CANCEL') {
            console.warn('Cancel at:', data?.data?.current_step)
          } else if (data.event === 'ERROR') {
            console.error('Flow error:', data?.data?.error_message)
          }
        }
      } catch {}
    })

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
  }, [])

  const fbLoginCallback = useCallback((response: any) => {
    if (response?.authResponse?.code) {
      const code = response.authResponse.code as string
      const waba_id = wabaIdRef.current
      const phone_number_id = phoneIdRef.current
      fetch('/api/es/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, waba_id, phone_number_id }),
      }).catch(console.error)
      alert('Signup selesai. Code & IDs dikirim ke server.')
    } else {
      console.log('Login cancelled/closed.', response)
    }
  }, [])

  const launchWhatsAppSignup = useCallback(() => {
    if (!window.FB) {
      console.warn('FB SDK not ready')
      return
    }
    if (!CONFIG_ID) {
      console.error('Missing NEXT_PUBLIC_FB_LOGIN_CONFIG_ID')
      return
    }

    try {
      window.FB.login(fbLoginCallback, {
        config_id: CONFIG_ID,
        response_type: 'code',
        override_default_response_type: true,
        extras: {
          version: 'v3',
          sessionInfoVersion: '3',
          featureType: 'whatsapp_business_app_onboarding',
        },
      })
    } catch (e) {
      console.error('FB.login threw:', e)
    }
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
          color: '#fff',
          fontWeight: 600,
        }}
      >
        {sdkReady ? 'Login with Facebook' : 'Loading Facebook SDK...'}
      </button>
    </>
  )
}

'use client'
import Script from 'next/script'
import { useCallback, useEffect, useState } from 'react'

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

  useEffect(() => {
    window.fbAsyncInit = function () {
      if (!APP_ID) {
        console.error('Missing NEXT_PUBLIC_FB_APP_ID')
        return
      }
      window.FB.init({
        appId: APP_ID,
        autoLogAppEvents: true,
        xfbml: false,
        version: 'v24.0', // Graph API version yang kamu pakai
      })
      setSdkReady(true)
    }
  }, [])

  const launchEmbeddedSignup = useCallback(() => {
    if (!window.FB) return

    const extras: any = {
      feature: 'whatsapp_embedded_signup',
      // ini yang memaksa flow jadi WhatsApp Business App Onboarding
      featureType: 'whatsapp_business_app_onboarding',
      version: 'v3',
      sessionInfoVersion: '3',
      ...(CONFIG_ID ? { config_id: CONFIG_ID } : {}),
    }

    window.FB.login(
      function (response: any) {
        if (response?.authResponse) {
          fetch('/api/auth/capture', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ response }),
          })
          alert('Signup completed! Check server logs.')
        } else {
          console.log('User cancelled/closed.')
        }
      },
      {
        scope:
          'email,public_profile,business_management,whatsapp_business_management,whatsapp_business_messaging',
        return_scopes: true,
        extras,
      }
    )
  }, [])

  return (
    <>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        async
        defer
        crossOrigin="anonymous"
      />
      <button onClick={launchEmbeddedSignup} disabled={!sdkReady}>
        {sdkReady
          ? 'Connect with WhatsApp Business'
          : 'Loading Facebook SDK...'}
      </button>
    </>
  )
}

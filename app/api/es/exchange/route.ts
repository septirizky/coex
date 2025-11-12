import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { code, waba_id, phone_number_id } = await req.json().catch(() => ({}))

  // TODO: simpan sementara (DB) lalu lakukan "code exchange" server-to-server
  //       gunakan kredensial App (APP_ID + APP_SECRET)
  console.log('ES EXCHANGE:', { code, waba_id, phone_number_id })

  // Contoh umum (pseudocode):
  // const r = await fetch(`https://graph.facebook.com/v24.0/oauth/access_token`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //   body: new URLSearchParams({
  //     client_id: process.env.FB_APP_ID!,
  //     client_secret: process.env.FB_APP_SECRET!,
  //     code, // ← code dari Embedded Signup
  //     // ... parameter sesuai "Exchange Token" di Builder
  //   }),
  // });
  // const token = await r.json();

  return NextResponse.json({ ok: true })
}

import EmbeddedSignupButton from '../components/EmbeddedSignupButton'

export default function HomePage() {
  return (
    <main>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>
        WhatsApp Embedded Signup
      </h1>
      <p style={{ color: '#4b5563', marginBottom: 24 }}>
        Demo Next.js untuk meluncurkan WhatsApp Embedded Signup via Facebook JS
        SDK.
      </p>
      <EmbeddedSignupButton />
      <hr style={{ margin: '32px 0' }} />
      <h2>Langkah berikutnya</h2>
      <ol>
        <li>
          Tambahkan domain Vercel ke{' '}
          <em>Allowed Domains for the JavaScript SDK</em> di App Dashboard.
        </li>
        <li>
          Pastikan App punya izin: <code>whatsapp_business_management</code> dan{' '}
          <code>business_management</code>.
        </li>
        <li>
          (Opsional) Buat Configuration ID di Facebook Login for Business
          (WhatsApp Embedded Signup) dan isi env.
        </li>
        <li>
          Set <code>WHATSAPP_VERIFY_TOKEN</code> dan siapkan Webhooks (lihat{' '}
          <code>/api/webhooks/whatsapp</code>).
        </li>
      </ol>
    </main>
  )
}

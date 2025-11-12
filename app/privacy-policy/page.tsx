export const metadata = { title: "Privacy Policy" };
export default function PrivacyPolicy() {
  return (
    <main>
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toISOString().slice(0,10)}</p>
      <p>This Privacy Policy describes how we collect, use, and share information when you use our website and WhatsApp Embedded Signup.</p>
      <h2>Information We Collect</h2>
      <ul>
        <li>Account info from Facebook Login (e.g., name, email) and permissions granted.</li>
        <li>Business assets shared during Embedded Signup (e.g., WABA ID).</li>
        <li>Technical logs for security and debugging.</li>
      </ul>
      <h2>How We Use Information</h2>
      <ul>
        <li>To initiate and complete WhatsApp Embedded Signup.</li>
        <li>To configure webhooks and manage WhatsApp Business resources.</li>
        <li>To comply with legal obligations and platform policies.</li>
      </ul>
      <h2>Sharing</h2>
      <p>We do not sell your information. We may share with service providers and Meta Platforms to enable WhatsApp Business Platform, or if required by law.</p>
      <h2>Data Retention</h2>
      <p>We retain information only as long as necessary for onboarding and service provisioning.</p>
      <h2>Your Choices</h2>
      <p>You may revoke permissions in your Meta account settings and contact us to request deletion.</p>
      <h2>Contact</h2>
      <p>Email: support@example.com</p>
    </main>
  );
}

export const metadata = { title: "Terms of Service" };
export default function Terms() {
  return (
    <main>
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toISOString().slice(0,10)}</p>
      <p>By using this site and initiating WhatsApp Embedded Signup, you agree to these Terms.</p>
      <h2>Use of Service</h2>
      <ul>
        <li>You must provide accurate information and comply with Meta policies.</li>
        <li>You are responsible for your WhatsApp Business Account and phone numbers connected.</li>
      </ul>
      <h2>Acceptable Use</h2>
      <p>No unlawful, abusive, or prohibited activities. Respect user privacy and consent in messaging.</p>
      <h2>Disclaimer</h2>
      <p>Service provided on an “as is” basis without warranties.</p>
      <h2>Limitation of Liability</h2>
      <p>We are not liable for indirect or consequential damages to the extent permitted by law.</p>
      <h2>Contact</h2>
      <p>Email: support@example.com</p>
    </main>
  );
}

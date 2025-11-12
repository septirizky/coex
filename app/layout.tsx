export const metadata = {
  title: "WhatsApp Embedded Signup Demo",
  description: "Next.js sample for WhatsApp Embedded Signup",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{fontFamily: "system-ui, Arial", margin: 0, padding: 0}}>
        <div style={{maxWidth: 960, margin: "0 auto", padding: "32px"}}>
          {children}
        </div>
      </body>
    </html>
  );
}

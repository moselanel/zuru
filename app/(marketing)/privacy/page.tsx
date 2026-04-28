import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Privacy Policy | Zuru",
  description: "Privacy Policy for Zuru - The African Tourism Platform",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zuru-sand">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-zuru-plum-dark to-zuru-plum py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 border-zuru-amber/30 bg-zuru-amber/10 text-zuru-amber">
              Legal
            </Badge>
            <h1 className="text-3xl font-bold text-zuru-sand md:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-zuru-sand/70">
              Last updated: April 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg mx-auto max-w-3xl">
            <div className="rounded-xl bg-white p-8 shadow-sm md:p-12">
              <div className="mb-8 rounded-lg bg-zuru-amber/10 p-4 text-sm text-zuru-ink/70">
                <strong>Note:</strong> This privacy policy is designed to comply with South Africa&apos;s 
                Protection of Personal Information Act (POPIA). We recommend having it reviewed by 
                a legal professional to ensure full compliance with your specific use case.
              </div>

              <h2 className="text-xl font-semibold text-zuru-ink">1. Introduction</h2>
              <p className="text-zuru-ink/70">
                Zuru (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your personal information 
                and your right to privacy. This Privacy Policy explains how we collect, use, disclose, 
                and safeguard your information when you use our platform and services.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">2. Information We Collect</h2>
              <p className="text-zuru-ink/70">We collect information that you provide directly to us, including:</p>
              <ul className="mt-2 text-zuru-ink/70">
                <li><strong>Account Information:</strong> Name, email address, phone number, company name</li>
                <li><strong>Content:</strong> Destination information, images, descriptions, and listings you upload</li>
                <li><strong>Communications:</strong> Messages you send through our contact forms or support channels</li>
                <li><strong>Payment Information:</strong> Billing details processed securely through our payment providers</li>
              </ul>
              <p className="mt-4 text-zuru-ink/70">We automatically collect certain information, including:</p>
              <ul className="mt-2 text-zuru-ink/70">
                <li>Device and browser information</li>
                <li>IP address and location data</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar technologies</li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">3. How We Use Your Information</h2>
              <p className="text-zuru-ink/70">We use your personal information to:</p>
              <ul className="mt-2 text-zuru-ink/70">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent transactions and abuse</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">4. Information Sharing</h2>
              <p className="text-zuru-ink/70">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="mt-2 text-zuru-ink/70">
                <li><strong>Service Providers:</strong> Third parties that perform services on our behalf</li>
                <li><strong>Business Transfers:</strong> In connection with any merger or acquisition</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>With Your Consent:</strong> When you have given us permission to share</li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">5. Your Rights Under POPIA</h2>
              <p className="text-zuru-ink/70">
                Under South Africa&apos;s Protection of Personal Information Act (POPIA), you have the right to:
              </p>
              <ul className="mt-2 text-zuru-ink/70">
                <li>Access your personal information we hold</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Lodge a complaint with the Information Regulator</li>
              </ul>
              <p className="mt-4 text-zuru-ink/70">
                To exercise these rights, please contact us at info@azizes.co.za.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">6. Data Security</h2>
              <p className="text-zuru-ink/70">
                We implement appropriate technical and organizational security measures to protect 
                your personal information against unauthorized access, alteration, disclosure, or 
                destruction. However, no method of transmission over the Internet is 100% secure.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">7. Data Retention</h2>
              <p className="text-zuru-ink/70">
                We retain your personal information for as long as necessary to fulfill the purposes 
                outlined in this policy, unless a longer retention period is required by law. When 
                we no longer need your information, we will securely delete or anonymize it.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">8. International Data Transfers</h2>
              <p className="text-zuru-ink/70">
                Your information may be transferred to and processed in countries other than South Africa. 
                We ensure appropriate safeguards are in place to protect your information in accordance 
                with this policy and applicable law.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">9. Children&apos;s Privacy</h2>
              <p className="text-zuru-ink/70">
                Our services are not directed to individuals under 18. We do not knowingly collect 
                personal information from children. If you believe we have collected information 
                from a child, please contact us immediately.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">10. Changes to This Policy</h2>
              <p className="text-zuru-ink/70">
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">11. Contact Us</h2>
              <p className="text-zuru-ink/70">
                If you have questions about this Privacy Policy or wish to exercise your rights, 
                please contact our Information Officer:
              </p>
              <ul className="mt-2 text-zuru-ink/70">
                <li>Email: info@azizes.co.za</li>
                <li>Phone: +27 82 316 6905</li>
                <li>Address: Bel Air Shopping Centre, Bellairs Dr, Northriding, Johannesburg, 2169</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

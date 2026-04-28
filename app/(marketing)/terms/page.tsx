import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Terms of Service | Zuru",
  description: "Terms of Service for Zuru - The African Tourism Platform",
}

export default function TermsPage() {
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
              Terms of Service
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
                <strong>Note:</strong> This is a template Terms of Service. We recommend having 
                these terms reviewed by a legal professional familiar with South African law 
                and POPIA requirements before publishing.
              </div>

              <h2 className="text-xl font-semibold text-zuru-ink">1. Agreement to Terms</h2>
              <p className="text-zuru-ink/70">
                By accessing or using Zuru&apos;s services, website, or platform (collectively, the &quot;Service&quot;), 
                you agree to be bound by these Terms of Service. If you disagree with any part of 
                these terms, you may not access the Service.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">2. Description of Service</h2>
              <p className="text-zuru-ink/70">
                Zuru provides a multi-tenant destination management platform for tourism boards, 
                destination marketing organizations (DMOs), and destination management companies (DMCs). 
                Our services include website hosting, content management, lead generation tools, 
                and related tourism technology solutions.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">3. User Accounts</h2>
              <p className="text-zuru-ink/70">
                When you create an account with us, you must provide accurate, complete, and 
                current information. You are responsible for safeguarding the password and for 
                all activities that occur under your account. You must notify us immediately 
                of any unauthorized access or use of your account.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">4. Subscription and Payments</h2>
              <p className="text-zuru-ink/70">
                Some aspects of the Service are billed on a subscription basis. You will be 
                billed in advance on a recurring monthly or annual basis. Subscription fees 
                are non-refundable except as required by law or as explicitly stated in 
                these terms.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">5. Content Ownership</h2>
              <p className="text-zuru-ink/70">
                You retain all rights to the content you upload to the Service. By uploading 
                content, you grant Zuru a license to use, store, and display that content 
                solely for the purpose of providing the Service. We do not claim ownership 
                of your content.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">6. Acceptable Use</h2>
              <p className="text-zuru-ink/70">
                You agree not to use the Service for any unlawful purpose or in any way that 
                could damage, disable, or impair the Service. You may not attempt to gain 
                unauthorized access to any part of the Service or any systems connected to it.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">7. Intellectual Property</h2>
              <p className="text-zuru-ink/70">
                The Service and its original content (excluding user content), features, and 
                functionality are and will remain the exclusive property of Zuru and its 
                licensors. The Service is protected by copyright, trademark, and other laws.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">8. Termination</h2>
              <p className="text-zuru-ink/70">
                We may terminate or suspend your account immediately, without prior notice, 
                for any reason, including breach of these Terms. Upon termination, your right 
                to use the Service will immediately cease. We will provide reasonable notice 
                and opportunity to export your data where possible.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">9. Limitation of Liability</h2>
              <p className="text-zuru-ink/70">
                To the maximum extent permitted by law, Zuru shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages resulting 
                from your use of the Service. Our total liability shall not exceed the amount 
                you have paid us in the twelve months prior to the claim.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">10. Governing Law</h2>
              <p className="text-zuru-ink/70">
                These Terms shall be governed by and construed in accordance with the laws 
                of the Republic of South Africa. Any disputes arising from these terms shall 
                be subject to the exclusive jurisdiction of the courts of South Africa.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">11. Changes to Terms</h2>
              <p className="text-zuru-ink/70">
                We reserve the right to modify these terms at any time. We will provide 
                notice of significant changes by email or through the Service. Your continued 
                use of the Service after such modifications constitutes acceptance of the 
                updated terms.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">12. Contact Us</h2>
              <p className="text-zuru-ink/70">
                If you have any questions about these Terms, please contact us at:
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

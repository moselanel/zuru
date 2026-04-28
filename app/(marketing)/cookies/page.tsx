import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Cookie Policy | Zuru",
  description: "Cookie Policy for Zuru - The African Tourism Platform",
}

export default function CookiesPage() {
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
              Cookie Policy
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
              <h2 className="text-xl font-semibold text-zuru-ink">1. What Are Cookies?</h2>
              <p className="text-zuru-ink/70">
                Cookies are small text files that are placed on your device when you visit a website. 
                They are widely used to make websites work more efficiently, provide a better user 
                experience, and give website owners useful information about how their site is being used.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">2. How We Use Cookies</h2>
              <p className="text-zuru-ink/70">Zuru uses cookies for the following purposes:</p>
              
              <h3 className="mt-6 text-lg font-semibold text-zuru-ink">Essential Cookies</h3>
              <p className="text-zuru-ink/70">
                These cookies are necessary for the website to function and cannot be switched off. 
                They are usually set in response to actions you take, such as setting your privacy 
                preferences, logging in, or filling in forms.
              </p>

              <h3 className="mt-6 text-lg font-semibold text-zuru-ink">Performance Cookies</h3>
              <p className="text-zuru-ink/70">
                These cookies allow us to count visits and traffic sources so we can measure and 
                improve the performance of our site. They help us know which pages are the most 
                and least popular and see how visitors move around the site.
              </p>

              <h3 className="mt-6 text-lg font-semibold text-zuru-ink">Functional Cookies</h3>
              <p className="text-zuru-ink/70">
                These cookies enable the website to provide enhanced functionality and personalization. 
                They may be set by us or by third-party providers whose services we have added to our pages.
              </p>

              <h3 className="mt-6 text-lg font-semibold text-zuru-ink">Analytics Cookies</h3>
              <p className="text-zuru-ink/70">
                We use analytics services to help us understand how visitors engage with our website. 
                These services may use cookies to collect information about your visits, including 
                pages viewed, time spent on the site, and how you arrived at our website.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">3. Cookies We Use</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-zuru-ink/10">
                      <th className="py-2 text-left font-semibold text-zuru-ink">Cookie Name</th>
                      <th className="py-2 text-left font-semibold text-zuru-ink">Purpose</th>
                      <th className="py-2 text-left font-semibold text-zuru-ink">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-zuru-ink/70">
                    <tr className="border-b border-zuru-ink/5">
                      <td className="py-2">session_id</td>
                      <td className="py-2">Maintains user session</td>
                      <td className="py-2">Session</td>
                    </tr>
                    <tr className="border-b border-zuru-ink/5">
                      <td className="py-2">auth_token</td>
                      <td className="py-2">Authentication</td>
                      <td className="py-2">7 days</td>
                    </tr>
                    <tr className="border-b border-zuru-ink/5">
                      <td className="py-2">preferences</td>
                      <td className="py-2">User preferences</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr className="border-b border-zuru-ink/5">
                      <td className="py-2">_ga</td>
                      <td className="py-2">Google Analytics</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr className="border-b border-zuru-ink/5">
                      <td className="py-2">cookie_consent</td>
                      <td className="py-2">Cookie consent status</td>
                      <td className="py-2">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">4. Third-Party Cookies</h2>
              <p className="text-zuru-ink/70">
                Some cookies on our website are set by third-party services. These include:
              </p>
              <ul className="mt-2 text-zuru-ink/70">
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>Stripe:</strong> For secure payment processing</li>
                <li><strong>Supabase:</strong> For authentication and database services</li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">5. Managing Cookies</h2>
              <p className="text-zuru-ink/70">
                Most web browsers allow you to control cookies through their settings. You can 
                typically find these settings in the &quot;Options&quot; or &quot;Preferences&quot; menu of your browser. 
                The following links provide information on how to manage cookies in common browsers:
              </p>
              <ul className="mt-2 text-zuru-ink/70">
                <li><a href="https://support.google.com/chrome/answer/95647" className="text-zuru-sunset hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-zuru-sunset hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-zuru-sunset hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" className="text-zuru-sunset hover:underline">Microsoft Edge</a></li>
              </ul>
              <p className="mt-4 text-zuru-ink/70">
                Please note that disabling cookies may affect the functionality of our website 
                and your user experience.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">6. Updates to This Policy</h2>
              <p className="text-zuru-ink/70">
                We may update this Cookie Policy from time to time to reflect changes in our 
                practices or for other operational, legal, or regulatory reasons. Please revisit 
                this page regularly to stay informed about our use of cookies.
              </p>

              <h2 className="mt-8 text-xl font-semibold text-zuru-ink">7. Contact Us</h2>
              <p className="text-zuru-ink/70">
                If you have questions about our use of cookies, please contact us:
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

"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock, User, ArrowLeft, Share2, Linkedin, Twitter } from "lucide-react"
import { notFound, useParams } from "next/navigation"

const articles: Record<string, {
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  readTime: string
  category: string
  content: string
}> = {
  "future-of-african-tourism-technology": {
    title: "The Future of African Tourism Technology: Trends Shaping 2026 and Beyond",
    excerpt: "From AI-powered trip planning to sustainable travel tracking, discover the technology trends transforming how African destinations connect with global travelers.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200",
    author: "Zuru Team",
    date: "April 20, 2026",
    readTime: "8 min read",
    category: "Industry Insights",
    content: `
## The Digital Transformation of African Tourism

African tourism is experiencing a technological revolution. As global travelers become increasingly digital-first, destinations across the continent are embracing innovative technologies to enhance visitor experiences and streamline operations.

### AI-Powered Trip Planning

Artificial intelligence is transforming how travelers discover and plan African adventures. Modern AI systems can:

- **Personalize recommendations** based on traveler preferences, budget, and travel style
- **Optimize itineraries** considering distances, opening hours, and seasonal factors
- **Provide instant answers** to common questions about visas, vaccinations, and local customs
- **Generate dynamic pricing** that responds to demand while remaining competitive

Leading destinations like Rwanda and South Africa are already implementing AI chatbots that can answer traveler queries in multiple languages, 24/7.

### Mobile-First Experiences

With smartphone penetration exceeding 80% in many African countries, mobile technology is central to the tourism experience:

- **Mobile booking systems** allow travelers to reserve experiences on the go
- **Digital tickets and passes** reduce paper waste and queuing times
- **Location-based services** help visitors navigate destinations safely
- **Mobile payment integration** supports both local and international payment methods

### Sustainable Travel Tracking

Travelers increasingly want to understand their environmental impact. New technologies enable:

- **Carbon footprint calculators** for flights and ground transportation
- **Conservation contribution tracking** showing how tourism fees support wildlife protection
- **Community impact reports** demonstrating benefits to local populations
- **Sustainable certification verification** helping travelers choose responsible operators

### Virtual and Augmented Reality

VR and AR are opening new possibilities for African tourism:

- **Virtual safaris** allow potential visitors to preview experiences before booking
- **AR-enhanced tours** overlay historical and cultural information on real-world views
- **Virtual museum experiences** make African art and history accessible globally
- **Training simulations** help guides deliver better experiences

### The Road Ahead

By 2030, we expect African tourism to be fully digitally integrated, with seamless experiences from discovery to departure. The destinations that embrace these technologies today will be the leaders of tomorrow.

The key is not just adopting technology for its own sake, but using it to enhance what makes African tourism special: authentic experiences, incredible wildlife, rich cultures, and warm hospitality.

---

*Ready to transform your destination's digital presence? [Contact Zuru](/contact) to learn how we can help.*
    `
  },
  "why-african-destinations-need-modern-websites": {
    title: "Why African Destinations Need Modern Websites in 2026",
    excerpt: "87% of travelers research online before booking. Here's why outdated websites are costing African destinations millions in lost bookings.",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800",
    author: "Zuru Team",
    date: "April 15, 2026",
    readTime: "5 min read",
    category: "Digital Strategy",
    content: `
## The Cost of Outdated Digital Presence

In 2026, your website is often the first impression potential visitors have of your destination. Yet many African tourism organizations are still operating with websites built a decade ago, costing them millions in lost bookings.

### The Numbers Don't Lie

Recent research reveals striking statistics about traveler behavior:

- **87%** of travelers research destinations online before booking
- **75%** abandon websites that take more than 3 seconds to load
- **68%** won't book with a destination that doesn't have a mobile-friendly website
- **52%** lose trust in organizations with outdated or poorly designed websites

### What Modern Travelers Expect

Today's travelers have high expectations shaped by experiences with leading digital platforms:

**Speed and Performance**
- Pages that load in under 2 seconds
- Smooth scrolling and transitions
- Quick search and filter capabilities

**Mobile Excellence**
- Responsive design that works on all devices
- Touch-friendly navigation
- Mobile payment options

**Rich Visual Content**
- High-quality images and videos
- 360-degree virtual tours
- User-generated content integration

**Seamless Booking**
- Real-time availability checking
- Instant confirmation
- Multiple payment options including mobile money

### The Competitive Landscape

While African destinations lag behind, competitors are investing heavily:

- **European destinations** spend an average of $500,000 annually on digital presence
- **Asian tourism boards** are leading in mobile-first design
- **Middle Eastern destinations** offer fully integrated booking experiences

### Making the Transition

Modernizing your digital presence doesn't have to be overwhelming. Start with:

1. **Audit your current site** - Identify critical issues affecting user experience
2. **Prioritize mobile** - Most of your traffic is likely coming from smartphones
3. **Invest in content** - Quality imagery and compelling copy drive conversions
4. **Enable direct booking** - Reduce friction in the purchase journey
5. **Measure everything** - Use analytics to continuously improve

### The ROI of Digital Investment

Destinations that have modernized their digital presence report:

- **40% increase** in website engagement
- **25% reduction** in bounce rates
- **60% improvement** in direct bookings
- **3x growth** in international inquiries

---

*Don't let an outdated website hold your destination back. [See how Zuru can help](/features) modernize your digital presence.*
    `
  },
  "guide-to-destination-marketing-africa": {
    title: "The Complete Guide to Destination Marketing in Africa",
    excerpt: "Learn how leading African tourism boards are using digital marketing to attract international visitors and grow sustainable tourism.",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800",
    author: "Zuru Team",
    date: "April 10, 2026",
    readTime: "12 min read",
    category: "Marketing",
    content: `
## Destination Marketing in the Digital Age

Effective destination marketing requires a sophisticated blend of storytelling, technology, and strategic partnerships. This guide covers everything African tourism organizations need to know to compete globally.

### Understanding Your Target Markets

Before any marketing activity, understand who you're trying to reach:

**Primary Markets for African Tourism:**
- **Europe** - Germany, UK, France, Netherlands (safari and beach holidays)
- **North America** - USA and Canada (adventure and wildlife)
- **Middle East** - UAE, Saudi Arabia (luxury travel)
- **Asia** - China, Japan, India (emerging markets)
- **Intra-African** - Growing domestic and regional tourism

Each market requires tailored messaging, channels, and timing.

### Content Marketing Strategy

Content is the foundation of modern destination marketing:

**Blog and Editorial Content**
- Publish 2-4 articles weekly covering destinations, experiences, and practical information
- Optimize for search engines with relevant keywords
- Create evergreen content that remains valuable over time

**Visual Storytelling**
- Invest in professional photography and videography
- Showcase authentic experiences, not just landscapes
- Feature local people and communities
- Create short-form video content for social platforms

**User-Generated Content**
- Encourage visitors to share their experiences
- Create branded hashtags and photo opportunities
- Feature traveler stories on your platforms
- Build a community of destination ambassadors

### Social Media Excellence

Each platform serves a different purpose:

**Instagram** - Visual inspiration and discovery
- Post stunning imagery daily
- Use Stories for behind-the-scenes content
- Leverage Reels for viral potential

**Facebook** - Community building and advertising
- Create engaged community groups
- Use targeted advertising for specific markets
- Share longer-form content and articles

**YouTube** - Deep engagement and SEO
- Publish destination guides and virtual tours
- Create series featuring different experiences
- Optimize for search discovery

**TikTok** - Reaching younger travelers
- Create authentic, unpolished content
- Participate in trends relevant to travel
- Partner with travel content creators

### Influencer Partnerships

Strategic influencer collaborations can dramatically expand reach:

- **Identify the right partners** - Alignment with your brand is more important than follower count
- **Offer genuine experiences** - The best content comes from authentic visits
- **Set clear expectations** - Define deliverables, timelines, and usage rights
- **Measure impact** - Track engagement, reach, and actual bookings

### Search Engine Optimization

SEO remains critical for long-term success:

- **Target high-intent keywords** - "Gorilla trekking Rwanda" beats "African vacation"
- **Create comprehensive guides** - In-depth content ranks higher
- **Build quality backlinks** - Partner with travel publications and bloggers
- **Optimize for local search** - Ensure Google Business profiles are complete

### Measuring Success

Key metrics to track:

- **Website traffic** by source and geography
- **Engagement rates** across social platforms
- **Share of voice** compared to competitors
- **Direct bookings** and inquiry volume
- **Cost per acquisition** for paid campaigns

---

*Want help developing your destination marketing strategy? [Talk to our team](/contact) about how Zuru can support your goals.*
    `
  },
  "ai-trip-planning-african-tourism": {
    title: "How AI Trip Planning is Revolutionizing African Tourism",
    excerpt: "Artificial intelligence is helping travelers discover hidden gems and plan personalized African adventures. Here's how destinations can leverage this technology.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
    author: "Zuru Team",
    date: "April 5, 2026",
    readTime: "6 min read",
    category: "Technology",
    content: `
## The AI Revolution in Travel Planning

Artificial intelligence is fundamentally changing how travelers discover and plan their African adventures. For destinations, this represents both an opportunity and a challenge.

### How AI Trip Planning Works

Modern AI trip planners use multiple technologies:

**Natural Language Processing (NLP)**
Travelers can describe their ideal trip in plain language: "I want a romantic safari with good photography opportunities and no crowds." The AI interprets these preferences and generates relevant recommendations.

**Machine Learning**
Systems learn from millions of past trips to understand what combinations of experiences work well together, optimal timing for activities, and realistic daily itineraries.

**Personalization Engines**
AI considers traveler profiles, past behavior, stated preferences, and even social media activity to customize recommendations.

### Benefits for Travelers

AI planning offers significant advantages:

- **Time savings** - Hours of research condensed into minutes
- **Hidden gems** - Discovery of experiences they might never have found
- **Optimized logistics** - Routes and timing that maximize experiences
- **Budget alignment** - Recommendations that match financial constraints
- **Personalization** - Trips tailored to individual interests and travel styles

### Opportunities for Destinations

Destinations can leverage AI to:

**Improve Discovery**
- Ensure your experiences are properly indexed in AI systems
- Provide structured data that AI can easily interpret
- Create content that answers common traveler questions

**Enhance Recommendations**
- Partner with AI platform providers
- Share detailed experience data including best times, accessibility, and pairing suggestions
- Keep information current and accurate

**Generate Insights**
- Analyze what AI is recommending to understand traveler preferences
- Identify gaps in your experience portfolio
- Understand competitive positioning

### Challenges to Address

AI planning isn't without challenges:

**Data Quality**
AI systems are only as good as their data. Inaccurate or outdated information leads to poor recommendations. Destinations must maintain comprehensive, current databases.

**Bias and Coverage**
Current AI systems may favor well-documented destinations. Lesser-known African experiences need proactive data management to gain visibility.

**Human Touch**
Some travelers still prefer human expertise, especially for complex or luxury trips. The best approach combines AI efficiency with human insight.

### Implementing AI for Your Destination

Steps to get started:

1. **Audit your digital presence** - Ensure all experiences are documented online
2. **Structure your data** - Use schemas and formats AI systems can read
3. **Partner with platforms** - Work with AI planning tools to improve your representation
4. **Train your team** - Help staff understand how AI is changing traveler expectations
5. **Monitor and adapt** - Track how AI recommendations affect your business

### The Future of AI in African Tourism

By 2030, we expect:

- **Voice-first planning** - Travelers will plan trips through conversation
- **Real-time adaptation** - Itineraries will adjust based on weather, crowds, and events
- **Predictive suggestions** - AI will anticipate needs before travelers express them
- **Seamless booking** - End-to-end trip booking through single AI interactions

---

*Zuru's platform includes AI-powered features designed for African destinations. [Learn more about our technology](/features).*
    `
  },
  "gorilla-trekking-rwanda-conservation-success": {
    title: "Rwanda's Gorilla Trekking: A Conservation Success Story",
    excerpt: "How Rwanda transformed mountain gorilla conservation into a world-class tourism experience, and what other destinations can learn from their approach.",
    image: "https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=800",
    author: "Zuru Team",
    date: "March 28, 2026",
    readTime: "7 min read",
    category: "Case Study",
    content: `
## From Endangered to Thriving: Rwanda's Conservation Miracle

In the 1980s, mountain gorillas were on the brink of extinction, with fewer than 250 individuals remaining. Today, thanks largely to Rwanda's innovative approach to conservation tourism, the population has grown to over 1,000. This is how they did it.

### The Challenge

Rwanda faced seemingly impossible odds:

- A devastating civil war had damaged infrastructure and international reputation
- Poaching and habitat loss threatened the remaining gorilla population
- Local communities saw little benefit from conservation efforts
- The country needed economic development but lacked traditional industries

### The Strategy

Rwanda's approach combined conservation with economic development:

**Premium Positioning**
Rather than competing on volume, Rwanda positioned gorilla trekking as an exclusive, premium experience:
- Permit prices set at $1,500 per person (now the highest in Africa)
- Limited daily visitors (80 permits per day)
- High-quality guiding and experiences
- Focus on discerning travelers rather than budget tourism

**Revenue Sharing**
A percentage of permit fees goes directly to local communities:
- 10% of tourism revenue funds community projects
- Schools, health clinics, and water systems built with tourism funds
- Local employment prioritized for guide and hospitality positions
- Communities become stakeholders in conservation

**Habitat Protection**
Strict enforcement protects gorilla habitat:
- Buffer zones created around national parks
- Anti-poaching patrols funded by tourism revenue
- Veterinary teams monitor gorilla health
- Research partnerships advance understanding

**Experience Design**
Every aspect of the experience is carefully managed:
- Maximum one hour with gorillas to minimize stress
- Small groups of eight visitors per gorilla family
- Mandatory health screenings to prevent disease transmission
- Professional guides trained in both conservation and hospitality

### The Results

The outcomes have been remarkable:

**Conservation Success**
- Mountain gorilla population increased 47% since 2010
- All habituated gorilla families thriving
- Habitat expansion through community partnerships

**Economic Impact**
- Tourism generates over $400 million annually for Rwanda
- Thousands of direct and indirect jobs created
- International recognition as a conservation leader

**Community Benefits**
- Over $4 million distributed to local communities since 2005
- Reduced human-wildlife conflict
- Communities actively engaged in conservation

### Lessons for Other Destinations

Rwanda's success offers a blueprint for conservation tourism:

1. **Quality over quantity** - Premium pricing can generate more revenue than mass tourism
2. **Share benefits** - When communities benefit, they become conservation partners
3. **Invest in experience** - Attention to detail creates memorable, shareable experiences
4. **Build international partnerships** - Collaboration with conservation organizations adds credibility
5. **Maintain discipline** - Strict rules protect both wildlife and experience quality

### Adapting the Model

Other African destinations are learning from Rwanda:

- **Uganda** has increased gorilla permit prices and community revenue sharing
- **Botswana** applies premium positioning to safari tourism
- **Tanzania** is developing community-based conservation programs

The principles apply beyond wildlife:

- Cultural tourism can use similar community benefit models
- Adventure tourism benefits from experience quality focus
- Beach destinations can learn from sustainable management approaches

---

*Inspired by Rwanda's approach? [Discover how Zuru helps destinations](/demo) implement world-class tourism experiences.*
    `
  },
  "multi-language-tourism-websites": {
    title: "Why Your Tourism Website Needs to Speak Multiple Languages",
    excerpt: "Breaking down language barriers is essential for African destinations targeting European, Asian, and Middle Eastern travelers. Here's how to do it right.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800",
    author: "Zuru Team",
    date: "March 20, 2026",
    readTime: "5 min read",
    category: "Digital Strategy",
    content: `
## The Language Barrier in African Tourism

English dominates African tourism websites, yet most international visitors aren't native English speakers. This language gap costs destinations millions in lost bookings.

### The Multilingual Opportunity

Consider your key source markets:

**German-speaking markets** (Germany, Austria, Switzerland)
- 100 million potential travelers
- Germans are among the world's most frequent international travelers
- Strong interest in safari, adventure, and eco-tourism
- Prefer booking in their native language

**French-speaking markets** (France, Belgium, Quebec, Switzerland)
- Historic ties to many African destinations
- 80 million potential travelers
- Growing interest in cultural and heritage tourism

**Chinese market**
- 150 million outbound travelers annually
- Fastest-growing source market for many destinations
- Strong digital presence required
- WeChat and other Chinese platforms essential

**Arabic-speaking markets**
- Growing luxury tourism segment from Gulf states
- Religious and cultural tourism opportunities
- High spending per visitor

### The Business Case

Research consistently shows the value of multilingual websites:

- **72%** of consumers spend most of their time on websites in their own language
- **56%** say the ability to obtain information in their language is more important than price
- **Conversion rates** increase 70% or more with localized content

### Beyond Translation

Effective multilingual websites require more than just translation:

**Localization**
- Adapt content for cultural context
- Use appropriate imagery and examples
- Adjust date, time, and currency formats
- Consider local holidays and travel seasons

**SEO in Each Language**
- Research keywords in each target language
- Create native content, not just translations
- Build backlinks from local sources
- Optimize for local search engines (Baidu, Yandex, etc.)

**Payment Localization**
- Support local payment methods
- Display prices in local currencies
- Consider local payment preferences (cards, bank transfers, mobile)

**Customer Support**
- Offer support in key languages
- Consider time zones for live support
- Use AI chatbots for 24/7 multilingual coverage

### Implementation Approaches

Several strategies exist for going multilingual:

**Machine Translation**
- Fast and affordable
- Quality has improved dramatically with AI
- Best for large volumes of content
- Requires human review for accuracy

**Professional Translation**
- Highest quality
- Essential for marketing and legal content
- More expensive and time-consuming
- Best combined with ongoing maintenance

**Native Content Creation**
- Most effective but most resource-intensive
- Creates truly localized experience
- Ideal for key markets
- Requires in-market expertise

### Prioritizing Languages

Start strategically:

1. **Analyze your current visitors** - What languages do they speak?
2. **Identify target markets** - Where do you want to grow?
3. **Assess competition** - What languages do competitors offer?
4. **Consider resources** - What can you maintain long-term?

A typical prioritization for African destinations might be:
1. English (if not already)
2. German (strong safari market)
3. French (especially for Francophone destinations)
4. Chinese (growing market)
5. Spanish or Arabic (market-dependent)

### Getting Started

Practical first steps:

- Audit your current content for translation readiness
- Identify your top 20% of pages by traffic and conversion
- Start with those high-impact pages
- Build processes for keeping translations current
- Measure results and expand based on performance

---

*Zuru's platform supports unlimited languages with AI-assisted translation. [See how it works](/features).*
    `
  },
  "sustainable-tourism-africa-guide": {
    title: "Building Sustainable Tourism in Africa: A Practical Guide",
    excerpt: "Sustainable tourism isn't just good ethics — it's good business. Learn how to balance growth with conservation and community benefit.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    author: "Zuru Team",
    date: "March 15, 2026",
    readTime: "10 min read",
    category: "Sustainability",
    content: `
## The Imperative for Sustainable Tourism

Africa's tourism industry stands at a crossroads. The continent's incredible natural and cultural assets could drive massive economic growth — or be degraded beyond recovery. The choice is ours.

### Why Sustainability Matters Now

Several factors make sustainable tourism urgent:

**Climate Change**
- Changing rainfall patterns affect wildlife migrations
- Rising temperatures impact visitor comfort
- Sea level rise threatens coastal destinations
- Extreme weather disrupts operations

**Overtourism**
- Popular destinations show signs of degradation
- Local communities face displacement and cultural dilution
- Wildlife habitats are stressed by human pressure
- Quality of experience declines with crowds

**Traveler Expectations**
- 73% of global travelers intend to stay in sustainable accommodation
- 70% would be more likely to book knowing a property is eco-friendly
- Younger travelers prioritize sustainability even more strongly

### The Three Pillars of Sustainable Tourism

Effective sustainability addresses three areas:

**Environmental Sustainability**
- Minimize carbon footprint and resource use
- Protect biodiversity and natural habitats
- Reduce waste and pollution
- Support conservation efforts

**Social Sustainability**
- Benefit local communities economically
- Respect and preserve local cultures
- Ensure fair labor practices
- Promote inclusive participation

**Economic Sustainability**
- Create viable long-term business models
- Distribute benefits fairly among stakeholders
- Build resilience to external shocks
- Invest in future capacity

### Practical Implementation

**For Destinations:**

*Conservation Integration*
- Dedicate tourism revenue to conservation
- Create wildlife corridors and protected areas
- Implement visitor carrying capacities
- Monitor environmental impacts

*Community Partnership*
- Involve communities in tourism planning
- Create local employment and enterprise opportunities
- Share revenue with affected communities
- Protect cultural heritage and practices

*Infrastructure*
- Invest in renewable energy
- Develop sustainable water management
- Create efficient waste systems
- Use sustainable building practices

**For Tourism Operators:**

*Operations*
- Audit and reduce energy consumption
- Minimize single-use plastics
- Source food locally and sustainably
- Train staff in sustainable practices

*Supply Chain*
- Partner with sustainable suppliers
- Verify certifications and claims
- Support local producers
- Consider transport impacts

*Guest Engagement*
- Educate visitors about sustainability
- Offer meaningful conservation experiences
- Encourage responsible behavior
- Collect feedback and improve

### Measuring and Communicating Impact

Sustainability claims require verification:

**Certification Programs**
- Global Sustainable Tourism Council (GSTC) criteria
- Eco-tourism certifications
- Carbon neutral certifications
- Fair trade tourism labels

**Impact Measurement**
- Carbon footprint calculation
- Water and energy use tracking
- Waste diversion rates
- Community benefit metrics

**Transparent Reporting**
- Publish sustainability reports
- Share progress and challenges honestly
- Set and track specific goals
- Invite third-party verification

### The Business Benefits

Sustainability drives business success:

- **Premium pricing** - Sustainable experiences command higher rates
- **Customer loyalty** - Responsible travelers return and refer
- **Risk reduction** - Sustainable practices reduce regulatory and reputational risks
- **Operational savings** - Efficiency reduces costs
- **Market access** - Many tour operators require sustainability credentials

### Getting Started

A practical roadmap:

1. **Assess current state** - Audit environmental and social impacts
2. **Set priorities** - Focus on biggest impacts and quickest wins
3. **Create a plan** - Set specific, measurable goals
4. **Engage stakeholders** - Involve staff, community, and partners
5. **Implement progressively** - Start small and scale what works
6. **Measure and report** - Track progress and communicate openly
7. **Continuously improve** - Sustainability is a journey, not a destination

---

*Zuru helps destinations build and communicate sustainable tourism offerings. [Learn more about our platform](/features).*
    `
  },
}

export default function BlogArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const article = articles[slug]

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-zuru-sand">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zuru-plum-dark to-zuru-plum">
        <div className="absolute inset-0">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="container relative mx-auto px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <Link href="/blog">
              <Button variant="ghost" className="mb-6 text-zuru-sand/80 hover:bg-white/10 hover:text-zuru-sand">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
            <Badge className="mb-4 border-zuru-amber/30 bg-zuru-amber/10 text-zuru-amber">
              {article.category}
            </Badge>
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-zuru-sand md:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-zuru-sand/70">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {article.author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {article.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {/* Share buttons */}
            <div className="mb-8 flex items-center gap-4 border-b border-zuru-ink/10 pb-6">
              <span className="text-sm text-zuru-ink/50">Share this article:</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zuru-ink/50 hover:text-zuru-sunset">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zuru-ink/50 hover:text-zuru-sunset">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zuru-ink/50 hover:text-zuru-sunset">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Article content */}
            <article className="prose prose-lg max-w-none prose-headings:text-zuru-ink prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-p:text-zuru-ink/80 prose-p:leading-relaxed prose-a:text-zuru-sunset prose-a:no-underline hover:prose-a:underline prose-strong:text-zuru-ink prose-ul:text-zuru-ink/80 prose-li:marker:text-zuru-sunset">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: article.content
                    .split('\n')
                    .map(line => {
                      if (line.startsWith('## ')) {
                        return `<h2>${line.slice(3)}</h2>`
                      }
                      if (line.startsWith('### ')) {
                        return `<h3>${line.slice(4)}</h3>`
                      }
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return `<p><strong>${line.slice(2, -2)}</strong></p>`
                      }
                      if (line.startsWith('- **')) {
                        const match = line.match(/- \*\*(.+?)\*\* - (.+)/)
                        if (match) {
                          return `<li><strong>${match[1]}</strong> - ${match[2]}</li>`
                        }
                        const match2 = line.match(/- \*\*(.+?)\*\*(.*)/)
                        if (match2) {
                          return `<li><strong>${match2[1]}</strong>${match2[2]}</li>`
                        }
                      }
                      if (line.startsWith('- ')) {
                        return `<li>${line.slice(2)}</li>`
                      }
                      if (line.match(/^\d+\. \*\*/)) {
                        const match = line.match(/^\d+\. \*\*(.+?)\*\* - (.+)/)
                        if (match) {
                          return `<li><strong>${match[1]}</strong> - ${match[2]}</li>`
                        }
                      }
                      if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
                        return `<p><em>${line.slice(1, -1)}</em></p>`
                      }
                      if (line.startsWith('---')) {
                        return '<hr class="my-8 border-zuru-ink/10" />'
                      }
                      if (line.trim() === '') {
                        return ''
                      }
                      // Handle links in the format [text](/url)
                      const withLinks = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
                      return `<p>${withLinks}</p>`
                    })
                    .join('\n')
                }} 
              />
            </article>

            {/* CTA */}
            <div className="mt-12 rounded-xl bg-gradient-to-br from-zuru-plum-dark to-zuru-plum p-8 text-center">
              <h3 className="mb-3 text-xl font-bold text-zuru-sand">
                Ready to Transform Your Destination?
              </h3>
              <p className="mb-6 text-zuru-sand/80">
                See how Zuru can help you implement the strategies discussed in this article.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/demo">
                  <Button className="bg-zuru-sunset text-white hover:bg-zuru-sunset/90">
                    View Demo
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-zuru-sand/30 text-zuru-sand hover:bg-white/10">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  KPICard,
  DashboardFilters,
  TopList,
  TrendChart,
  EngagementHeatmap,
  DashboardSection,
  type FilterConfig,
} from "@/components/admin/dashboards/dashboard-components"
import {
  Globe,
  MousePointerClick,
  TrendingUp,
  Search,
  Share2,
  ShoppingCart,
  Users,
  Eye,
  Target,
  ArrowRight,
  ExternalLink,
  Megaphone,
  BarChart3,
  Languages,
} from "lucide-react"

// Mock data
const channels = [
  { id: "organic", name: "Organic Search" },
  { id: "paid", name: "Paid Ads" },
  { id: "social", name: "Social Media" },
  { id: "referral", name: "Referrals" },
  { id: "direct", name: "Direct" },
]

export default function MarketingDashboard() {
  const [filters, setFilters] = useState<FilterConfig>({
    dateRange: {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(),
    },
  })

  // Mock KPI data
  const kpiData = {
    totalSessions: 124500,
    sessionsChange: 15.2,
    uniqueVisitors: 89400,
    visitorsChange: 12.8,
    conversionRate: 3.2,
    conversionChange: 0.4,
    bounceRate: 42,
    bounceChange: -3.1,
    avgSessionDuration: 4.2,
    pagesPerSession: 3.8,
    revenuePerVisitor: 54,
  }

  // Traffic sources
  const trafficSources = [
    { name: "Organic Search", value: 45200, change: 18 },
    { name: "Direct", value: 28400, change: 8 },
    { name: "Paid Ads", value: 22100, change: 25 },
    { name: "Social Media", value: 18500, change: 32 },
    { name: "Referrals", value: 10300, change: 12 },
  ]

  // Campaign performance
  const campaigns = [
    {
      name: "Summer Safari Special",
      channel: "Google Ads",
      spend: 45000,
      revenue: 180000,
      roas: 4.0,
      conversions: 124,
      status: "active",
    },
    {
      name: "Family Holiday Promo",
      channel: "Meta Ads",
      spend: 28000,
      revenue: 95000,
      roas: 3.4,
      conversions: 87,
      status: "active",
    },
    {
      name: "Weekend Getaway",
      channel: "Google Ads",
      spend: 15000,
      revenue: 52000,
      roas: 3.5,
      conversions: 48,
      status: "paused",
    },
    {
      name: "International Travelers",
      channel: "Meta Ads",
      spend: 32000,
      revenue: 148000,
      roas: 4.6,
      conversions: 62,
      status: "active",
    },
  ]

  // Top landing pages
  const landingPages = [
    { name: "/", value: 32400, change: 12 },
    { name: "/accommodation", value: 18200, change: 22 },
    { name: "/experiences/safari", value: 14500, change: 35 },
    { name: "/reserves/blyde-river", value: 9800, change: 8 },
    { name: "/itinerary", value: 7200, change: 45 },
  ]

  // Top search terms
  const searchTerms = [
    { term: "safari south africa", volume: 4200, position: 3 },
    { term: "mpumalanga accommodation", volume: 2800, position: 1 },
    { term: "blyde river canyon lodge", volume: 2100, position: 1 },
    { term: "kruger park tours", volume: 1800, position: 5 },
    { term: "treehouse accommodation", volume: 1200, position: 2 },
  ]

  // Abandoned bookings
  const abandonedBookings = [
    { stage: "Property selected", count: 1240, percentage: 45 },
    { stage: "Dates chosen", count: 820, percentage: 30 },
    { stage: "Guest details", count: 450, percentage: 16 },
    { stage: "Payment page", count: 248, percentage: 9 },
  ]

  // Market conversion
  const marketConversion = [
    { market: "Gauteng", sessions: 42000, conversions: 1680, rate: 4.0 },
    { market: "Western Cape", sessions: 18000, conversions: 648, rate: 3.6 },
    { market: "Germany", sessions: 8500, conversions: 340, rate: 4.0 },
    { market: "UK", sessions: 6200, conversions: 217, rate: 3.5 },
    { market: "Netherlands", sessions: 4100, conversions: 172, rate: 4.2 },
  ]

  // Regional engagement heatmap
  const regionalEngagement = [
    { region: "Gauteng", value: 42000 },
    { region: "Western Cape", value: 18000 },
    { region: "KZN", value: 12000 },
    { region: "Eastern Cape", value: 6000 },
    { region: "Free State", value: 4500 },
    { region: "Mpumalanga", value: 8200 },
  ]

  // Weekly trend
  const weeklyTrend = [
    { label: "Week 1", value: 28000 },
    { label: "Week 2", value: 32000 },
    { label: "Week 3", value: 29500 },
    { label: "Week 4", value: 35000 },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold">
            Marketing & Conversion Performance
          </h1>
          <p className="text-muted-foreground">
            Demand generation, campaign ROI, and conversion optimization
          </p>
        </div>
        <Button className="gap-2 w-fit">
          <Megaphone className="h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* Filters */}
      <DashboardFilters
        filters={filters}
        onFiltersChange={setFilters}
        channels={channels}
        showParkFilter={false}
      />

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Sessions"
          value={kpiData.totalSessions}
          change={kpiData.sessionsChange}
          changeLabel="vs last period"
          trend="up"
          icon={<Globe className="h-5 w-5" />}
          description="Website visits across all channels"
        />
        <KPICard
          title="Unique Visitors"
          value={kpiData.uniqueVisitors}
          change={kpiData.visitorsChange}
          changeLabel="vs last period"
          trend="up"
          icon={<Users className="h-5 w-5" />}
          description="Individual users visiting the site"
        />
        <KPICard
          title="Conversion Rate"
          value={kpiData.conversionRate}
          change={kpiData.conversionChange}
          changeLabel="vs last period"
          trend="up"
          icon={<Target className="h-5 w-5" />}
          format="percentage"
          description="Visitors who complete a booking"
        />
        <KPICard
          title="Bounce Rate"
          value={kpiData.bounceRate}
          change={kpiData.bounceChange}
          trend="up"
          icon={<MousePointerClick className="h-5 w-5" />}
          format="percentage"
          description="Single-page sessions"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Session Duration</p>
                <p className="font-serif text-2xl font-bold">{kpiData.avgSessionDuration} min</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pages per Session</p>
                <p className="font-serif text-2xl font-bold">{kpiData.pagesPerSession}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue per Visitor</p>
                <p className="font-serif text-2xl font-bold">R{kpiData.revenuePerVisitor}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic and Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrendChart
            title="Weekly Traffic Trend"
            description="Sessions over the last 4 weeks"
            data={weeklyTrend}
          />
        </div>
        <TopList title="Traffic Sources" items={trafficSources} valueLabel="Sessions" />
      </div>

      {/* Tabs for detailed views */}
      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns" className="gap-2">
            <Megaphone className="h-4 w-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="content" className="gap-2">
            <Eye className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="search" className="gap-2">
            <Search className="h-4 w-4" />
            Search
          </TabsTrigger>
          <TabsTrigger value="funnel" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Funnel
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Campaign Performance</CardTitle>
              <CardDescription>Active and recent marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium py-3 px-2">Campaign</th>
                      <th className="text-left font-medium py-3 px-2">Channel</th>
                      <th className="text-right font-medium py-3 px-2">Spend</th>
                      <th className="text-right font-medium py-3 px-2">Revenue</th>
                      <th className="text-right font-medium py-3 px-2">ROAS</th>
                      <th className="text-right font-medium py-3 px-2">Conversions</th>
                      <th className="text-left font-medium py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr key={campaign.name} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-2 font-medium">{campaign.name}</td>
                        <td className="py-3 px-2 text-muted-foreground">{campaign.channel}</td>
                        <td className="py-3 px-2 text-right">R{campaign.spend.toLocaleString()}</td>
                        <td className="py-3 px-2 text-right font-medium text-green-600">
                          R{campaign.revenue.toLocaleString()}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <Badge variant={campaign.roas >= 4 ? "default" : "secondary"}>
                            {campaign.roas}x
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-right">{campaign.conversions}</td>
                        <td className="py-3 px-2">
                          <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                            {campaign.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopList title="Top Landing Pages" items={landingPages} valueLabel="Sessions" />

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Content Journeys</CardTitle>
                <CardDescription>Most common visitor paths</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { path: "Home → Accommodation → Checkout", sessions: 2840, conversion: 8.2 },
                  { path: "Home → Experiences → Safari → Checkout", sessions: 1920, conversion: 12.4 },
                  { path: "Search → Reserve → Accommodation", sessions: 1540, conversion: 6.8 },
                  { path: "Blog → Itinerary → Checkout", sessions: 980, conversion: 15.2 },
                ].map((journey, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 text-sm mb-2">
                      {journey.path.split(" → ").map((step, i, arr) => (
                        <span key={i} className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {step}
                          </Badge>
                          {i < arr.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{journey.sessions.toLocaleString()} sessions</span>
                      <span className="text-green-600 font-medium">{journey.conversion}% conversion</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="search">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Top Search Terms</CardTitle>
                <CardDescription>Organic search performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchTerms.map((term) => (
                    <div key={term.term} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{term.term}</p>
                        <p className="text-xs text-muted-foreground">
                          {term.volume.toLocaleString()} monthly searches
                        </p>
                      </div>
                      <Badge variant={term.position <= 3 ? "default" : "secondary"}>
                        Position {term.position}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Site Search Analytics</CardTitle>
                <CardDescription>What visitors search for on-site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { query: "safari", count: 1240, results: true },
                    { query: "treehouse", count: 890, results: true },
                    { query: "family accommodation", count: 720, results: true },
                    { query: "hot air balloon", count: 450, results: true },
                    { query: "pet friendly", count: 380, results: false },
                    { query: "camping", count: 320, results: true },
                  ].map((search) => (
                    <div key={search.query} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{search.query}</span>
                        {!search.results && (
                          <Badge variant="destructive" className="text-xs">
                            No results
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{search.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funnel">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Abandoned Bookings</CardTitle>
                <CardDescription>Where visitors drop off in the booking flow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {abandonedBookings.map((stage, index) => (
                    <div key={stage.stage}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                            {index + 1}
                          </span>
                          <span className="text-sm font-medium">{stage.stage}</span>
                        </div>
                        <span className="text-sm">
                          {stage.count.toLocaleString()} ({stage.percentage}%)
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden ml-8">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${stage.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    Recommendation
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    45% of abandonments occur at property selection. Consider adding comparison tools
                    or live chat support at this stage.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Conversion by Market</CardTitle>
                <CardDescription>Performance across source markets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium py-2">Market</th>
                        <th className="text-right font-medium py-2">Sessions</th>
                        <th className="text-right font-medium py-2">Conversions</th>
                        <th className="text-right font-medium py-2">Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketConversion.map((market) => (
                        <tr key={market.market} className="border-b last:border-0">
                          <td className="py-2 font-medium">{market.market}</td>
                          <td className="py-2 text-right text-muted-foreground">
                            {market.sessions.toLocaleString()}
                          </td>
                          <td className="py-2 text-right">{market.conversions.toLocaleString()}</td>
                          <td className="py-2 text-right">
                            <Badge variant={market.rate >= 4 ? "default" : "secondary"}>
                              {market.rate}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Regional Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementHeatmap title="Regional Engagement (South Africa)" data={regionalEngagement} />

        <Card>
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Conversion by Language
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { language: "English", sessions: 98000, rate: 3.4 },
              { language: "German", sessions: 12400, rate: 3.8 },
              { language: "Dutch", sessions: 8200, rate: 4.1 },
              { language: "Afrikaans", sessions: 5900, rate: 3.2 },
            ].map((lang) => (
              <div key={lang.language} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{lang.language}</p>
                  <p className="text-xs text-muted-foreground">
                    {lang.sessions.toLocaleString()} sessions
                  </p>
                </div>
                <Badge variant={lang.rate >= 4 ? "default" : "secondary"}>{lang.rate}% CVR</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Referral Performance */}
      <DashboardSection title="Referral Partner Performance">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "TripAdvisor", bookings: 142, revenue: 485000, commission: 24250 },
            { name: "GetYourGuide", bookings: 98, revenue: 245000, commission: 12250 },
            { name: "Viator", bookings: 67, revenue: 178000, commission: 8900 },
          ].map((partner) => (
            <Card key={partner.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">{partner.name}</h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bookings</span>
                    <span className="font-medium">{partner.bookings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-medium">R{partner.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Commission</span>
                    <span className="font-medium text-amber-600">
                      R{partner.commission.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardSection>
    </div>
  )
}

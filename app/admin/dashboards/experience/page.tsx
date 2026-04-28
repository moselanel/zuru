"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  KPICard,
  DashboardFilters,
  AlertCard,
  TopList,
  DashboardSection,
  type FilterConfig,
} from "@/components/admin/dashboards/dashboard-components"
import {
  Search,
  Map,
  Calendar,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  HelpCircle,
  Frown,
  Smile,
  Meh,
  MousePointerClick,
  Navigation,
  Route,
} from "lucide-react"

export default function ExperienceDashboard() {
  const [filters, setFilters] = useState<FilterConfig>({
    dateRange: {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(),
    },
  })

  // Mock KPI data
  const kpiData = {
    searchSuccessRate: 87,
    mapInteractions: 24500,
    itineraryUsage: 3420,
    avgTimeToBook: 8.4,
    supportTickets: 142,
    ticketsResolved: 128,
    resolutionTime: 4.2,
    npsScore: 72,
  }

  // Mock alerts
  const alerts = [
    {
      severity: "warning" as const,
      message: "Search success rate dropped 5% - 'pet friendly' showing no results",
      timestamp: "1 hour ago",
    },
    {
      severity: "info" as const,
      message: "New feedback theme: Visitors requesting more payment options",
      timestamp: "3 hours ago",
    },
  ]

  // Search analytics
  const searchAnalytics = {
    totalSearches: 18500,
    successfulSearches: 16095,
    failedSearches: 2405,
    topSuccessful: [
      { term: "safari", count: 4200, success: true },
      { term: "accommodation", count: 3100, success: true },
      { term: "blyde river", count: 2800, success: true },
      { term: "treehouse", count: 1900, success: true },
    ],
    topFailed: [
      { term: "pet friendly", count: 380, success: false },
      { term: "wheelchair accessible", count: 245, success: false },
      { term: "camping site", count: 180, success: false },
      { term: "helicopter tours", count: 120, success: false },
    ],
  }

  // Support ticket categories
  const ticketCategories = [
    { category: "Booking Changes", count: 42, trend: "down" },
    { category: "Payment Issues", count: 38, trend: "up" },
    { category: "Refund Requests", count: 24, trend: "stable" },
    { category: "General Enquiries", count: 22, trend: "down" },
    { category: "Accessibility", count: 16, trend: "up" },
  ]

  // Friction points in booking funnel
  const frictionPoints = [
    {
      stage: "Property Selection",
      issue: "Comparison difficulty",
      dropoff: 15,
      recommendation: "Add side-by-side comparison feature",
    },
    {
      stage: "Date Selection",
      issue: "Calendar load time",
      dropoff: 8,
      recommendation: "Optimize calendar API calls",
    },
    {
      stage: "Guest Details",
      issue: "Form validation errors",
      dropoff: 12,
      recommendation: "Add inline validation and clearer error messages",
    },
    {
      stage: "Payment",
      issue: "Limited payment options",
      dropoff: 18,
      recommendation: "Add EFT and SnapScan payment methods",
    },
  ]

  // Feedback sentiment
  const feedbackSentiment = {
    positive: 68,
    neutral: 22,
    negative: 10,
    themes: [
      { theme: "Staff friendliness", sentiment: "positive", count: 245 },
      { theme: "Booking process", sentiment: "positive", count: 189 },
      { theme: "Value for money", sentiment: "neutral", count: 156 },
      { theme: "Payment options", sentiment: "negative", count: 78 },
      { theme: "Mobile experience", sentiment: "negative", count: 45 },
    ],
  }

  // Map interaction data
  const mapInteractions = [
    { action: "Pan/Zoom", count: 12400 },
    { action: "Marker Click", count: 8200 },
    { action: "Filter Applied", count: 2800 },
    { action: "Directions Request", count: 1100 },
  ]

  // Itinerary planner stats
  const itineraryStats = {
    created: 3420,
    shared: 892,
    converted: 445,
    avgDays: 4.2,
    topActivities: [
      { name: "Safari Drive", added: 2840 },
      { name: "Canyon Lodge Stay", added: 2120 },
      { name: "Boat Cruise", added: 1580 },
      { name: "Guided Walk", added: 980 },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold">
            Visitor Experience & Service Quality
          </h1>
          <p className="text-muted-foreground">
            Usability insights, support operations, and visitor satisfaction
          </p>
        </div>
        <Badge
          variant="outline"
          className={`w-fit ${kpiData.npsScore >= 70 ? "border-green-500 text-green-600" : kpiData.npsScore >= 50 ? "border-amber-500 text-amber-600" : "border-red-500 text-red-600"}`}
        >
          NPS Score: {kpiData.npsScore}
        </Badge>
      </div>

      {/* Filters */}
      <DashboardFilters
        filters={filters}
        onFiltersChange={setFilters}
        showParkFilter={false}
        showChannelFilter={false}
      />

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Search Success Rate"
          value={kpiData.searchSuccessRate}
          icon={<Search className="h-5 w-5" />}
          format="percentage"
          description="Searches that returned relevant results"
        />
        <KPICard
          title="Map Interactions"
          value={kpiData.mapInteractions}
          icon={<Map className="h-5 w-5" />}
          description="User interactions with interactive map"
        />
        <KPICard
          title="Itineraries Created"
          value={kpiData.itineraryUsage}
          icon={<Route className="h-5 w-5" />}
          description="Trip plans created using the planner"
        />
        <KPICard
          title="Avg. Time to Book"
          value={`${kpiData.avgTimeToBook} min`}
          icon={<Clock className="h-5 w-5" />}
          description="Average booking completion time"
        />
      </div>

      {/* Support KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Support Tickets"
          value={kpiData.supportTickets}
          icon={<MessageSquare className="h-5 w-5" />}
          description="Total tickets this period"
        />
        <KPICard
          title="Tickets Resolved"
          value={kpiData.ticketsResolved}
          icon={<CheckCircle2 className="h-5 w-5" />}
          description="Successfully closed tickets"
        />
        <KPICard
          title="Resolution Time"
          value={`${kpiData.resolutionTime}h`}
          icon={<Clock className="h-5 w-5" />}
          description="Average time to resolve"
        />
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 border-green-200 dark:border-green-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">NPS Score</p>
                <p className="font-serif text-3xl font-bold text-green-700 dark:text-green-300">
                  {kpiData.npsScore}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">Good (target: 70+)</p>
              </div>
              <Smile className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <AlertCard alerts={alerts} />

      {/* Tabs for detailed views */}
      <Tabs defaultValue="search" className="space-y-4">
        <TabsList>
          <TabsTrigger value="search" className="gap-2">
            <Search className="h-4 w-4" />
            Search
          </TabsTrigger>
          <TabsTrigger value="map" className="gap-2">
            <Map className="h-4 w-4" />
            Map & Navigation
          </TabsTrigger>
          <TabsTrigger value="support" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Support
          </TabsTrigger>
          <TabsTrigger value="feedback" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Search Performance</CardTitle>
                <CardDescription>
                  {searchAnalytics.totalSearches.toLocaleString()} total searches this period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {searchAnalytics.successfulSearches.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600">Successful</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                      {searchAnalytics.failedSearches.toLocaleString()}
                    </p>
                    <p className="text-sm text-red-600">No Results</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Top Successful Searches</h4>
                  {searchAnalytics.topSuccessful.map((term) => (
                    <div key={term.term} className="flex items-center justify-between">
                      <span className="text-sm">{term.term}</span>
                      <Badge variant="outline">{term.count.toLocaleString()}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-red-600">Failed Searches</CardTitle>
                <CardDescription>
                  Content gaps - searches with no results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {searchAnalytics.topFailed.map((term) => (
                  <div
                    key={term.term}
                    className="p-3 border border-red-200 dark:border-red-900 rounded-lg bg-red-50 dark:bg-red-950/20"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{term.term}</span>
                      <Badge variant="destructive">{term.count} searches</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Consider adding content or redirecting to relevant pages
                    </p>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  View All Failed Searches
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="map">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Map Interactions</CardTitle>
                <CardDescription>How visitors use the interactive map</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mapInteractions.map((interaction) => (
                  <div key={interaction.action}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{interaction.action}</span>
                      <span className="font-medium">{interaction.count.toLocaleString()}</span>
                    </div>
                    <Progress
                      value={(interaction.count / mapInteractions[0].count) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Itinerary Planner</CardTitle>
                <CardDescription>Trip planning feature usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">{itineraryStats.created.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Created</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">{itineraryStats.shared}</p>
                    <p className="text-xs text-muted-foreground">Shared</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">{itineraryStats.converted}</p>
                    <p className="text-xs text-muted-foreground">Converted</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">{itineraryStats.avgDays}</p>
                    <p className="text-xs text-muted-foreground">Avg. Days</p>
                  </div>
                </div>
                <h4 className="font-medium text-sm mb-3">Most Added Activities</h4>
                {itineraryStats.topActivities.map((activity) => (
                  <div key={activity.name} className="flex items-center justify-between py-2">
                    <span className="text-sm">{activity.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {activity.added.toLocaleString()}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="support">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Ticket Categories</CardTitle>
                <CardDescription>Support requests by type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ticketCategories.map((cat) => (
                  <div key={cat.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{cat.category}</span>
                      {cat.trend === "up" && (
                        <TrendingUp className="h-3 w-3 text-red-500" />
                      )}
                      {cat.trend === "down" && (
                        <TrendingUp className="h-3 w-3 text-green-500 rotate-180" />
                      )}
                    </div>
                    <Badge variant="outline">{cat.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Resolution Performance</CardTitle>
                <CardDescription>Ticket resolution metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Resolution Rate</span>
                      <span className="font-medium">
                        {Math.round((kpiData.ticketsResolved / kpiData.supportTickets) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(kpiData.ticketsResolved / kpiData.supportTickets) * 100}
                      className="h-3"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-green-600">68</p>
                      <p className="text-xs text-muted-foreground">{"<1h"}</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-amber-600">42</p>
                      <p className="text-xs text-muted-foreground">1-4h</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-red-600">18</p>
                      <p className="text-xs text-muted-foreground">{">4h"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Sentiment Analysis</CardTitle>
                <CardDescription>Overall feedback sentiment distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex h-8 rounded-full overflow-hidden">
                      <div
                        className="bg-green-500"
                        style={{ width: `${feedbackSentiment.positive}%` }}
                      />
                      <div
                        className="bg-amber-500"
                        style={{ width: `${feedbackSentiment.neutral}%` }}
                      />
                      <div
                        className="bg-red-500"
                        style={{ width: `${feedbackSentiment.negative}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Smile className="h-4 w-4 text-green-500" />
                    <span>Positive: {feedbackSentiment.positive}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Meh className="h-4 w-4 text-amber-500" />
                    <span>Neutral: {feedbackSentiment.neutral}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Frown className="h-4 w-4 text-red-500" />
                    <span>Negative: {feedbackSentiment.negative}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Feedback Themes</CardTitle>
                <CardDescription>Common topics in visitor feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {feedbackSentiment.themes.map((theme) => (
                  <div
                    key={theme.theme}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-2">
                      {theme.sentiment === "positive" ? (
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                      ) : theme.sentiment === "negative" ? (
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                      ) : (
                        <Meh className="h-4 w-4 text-amber-500" />
                      )}
                      <span className="text-sm">{theme.theme}</span>
                    </div>
                    <Badge
                      variant={
                        theme.sentiment === "positive"
                          ? "default"
                          : theme.sentiment === "negative"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {theme.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Friction Points */}
      <DashboardSection
        title="Booking Funnel Friction Points"
        description="Issues identified in the booking journey"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {frictionPoints.map((point) => (
            <Card key={point.stage} className="border-amber-200 dark:border-amber-900">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{point.stage}</h4>
                    <p className="text-sm text-muted-foreground">{point.issue}</p>
                  </div>
                  <Badge variant="destructive">{point.dropoff}% drop</Badge>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <p className="text-xs font-medium text-green-800 dark:text-green-200 mb-1">
                    Recommendation
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {point.recommendation}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardSection>
    </div>
  )
}

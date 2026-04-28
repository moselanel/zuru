"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  KPICard,
  DashboardFilters,
  TopList,
  EngagementHeatmap,
  DashboardSection,
  type FilterConfig,
} from "@/components/admin/dashboards/dashboard-components"
import {
  Users,
  Eye,
  MessageSquare,
  CreditCard,
  MapPin,
  GraduationCap,
  TrendingUp,
  Star,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  Briefcase,
  Building2,
  Heart,
} from "lucide-react"

export default function CommunityDashboard() {
  const [filters, setFilters] = useState<FilterConfig>({
    dateRange: {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(),
    },
  })

  // Mock KPI data
  const kpiData = {
    registeredGuides: 187,
    guidesChange: 12,
    activeOperators: 42,
    profileViews: 24800,
    enquiries: 1240,
    bookingsLinked: 892,
    communityRevenue: 2450000,
    revenueChange: 18,
    trainingCompleted: 145,
  }

  // Top performing guides
  const topGuides = [
    {
      id: "1",
      name: "Themba Nkosi",
      photo: "/guide-themba.jpg",
      speciality: "Wildlife Safari",
      bookings: 124,
      rating: 4.9,
      revenue: 185000,
      region: "Kruger Area",
    },
    {
      id: "2",
      name: "Lindiwe Dlamini",
      photo: "/guide-lindiwe.jpg",
      speciality: "Cultural Tours",
      bookings: 98,
      rating: 4.8,
      revenue: 142000,
      region: "Lowveld",
    },
    {
      id: "3",
      name: "Johan van der Berg",
      photo: "/guide-johan.jpg",
      speciality: "Birding Expert",
      bookings: 87,
      rating: 4.9,
      revenue: 128000,
      region: "Blyde River",
    },
    {
      id: "4",
      name: "Nomsa Mahlangu",
      photo: "/guide-nomsa.jpg",
      speciality: "Photography Tours",
      bookings: 76,
      rating: 4.7,
      revenue: 98000,
      region: "Panorama Route",
    },
  ]

  // Community operators
  const communityOperators = [
    {
      name: "Shangaan Cultural Village",
      type: "Cultural Experience",
      bookings: 245,
      revenue: 320000,
      status: "verified",
    },
    {
      name: "Hazyview Community Craft Market",
      type: "Local Market",
      bookings: 180,
      revenue: 145000,
      status: "verified",
    },
    {
      name: "Barberton Heritage Tours",
      type: "Heritage Tours",
      bookings: 156,
      revenue: 198000,
      status: "verified",
    },
    {
      name: "Sabie Valley Hiking",
      type: "Adventure",
      bookings: 134,
      revenue: 178000,
      status: "pending",
    },
  ]

  // Geographic distribution
  const geographicSpread = [
    { region: "Kruger Area", value: 68 },
    { region: "Blyde River", value: 42 },
    { region: "Lowveld", value: 38 },
    { region: "Panorama", value: 24 },
    { region: "Barberton", value: 15 },
  ]

  // Training/onboarding stats
  const trainingStats = {
    total: 187,
    completed: 145,
    inProgress: 28,
    notStarted: 14,
    modules: [
      { name: "Customer Service Excellence", completed: 156, total: 187 },
      { name: "Safety & First Aid", completed: 148, total: 187 },
      { name: "Cultural Sensitivity", completed: 142, total: 187 },
      { name: "Digital Booking Platform", completed: 138, total: 187 },
      { name: "Wildlife Conservation", completed: 125, total: 187 },
    ],
  }

  // Revenue by offering type
  const revenueByType = [
    { name: "Safari Guides", value: 980000, change: 22 },
    { name: "Cultural Experiences", value: 520000, change: 15 },
    { name: "Adventure Activities", value: 380000, change: 28 },
    { name: "Heritage Tours", value: 320000, change: 12 },
    { name: "Craft & Markets", value: 250000, change: 8 },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold">
            Community & Inclusive Tourism Impact
          </h1>
          <p className="text-muted-foreground">
            Guide participation, community offerings, and economic impact
          </p>
        </div>
        <Button className="gap-2 w-fit">
          <Users className="h-4 w-4" />
          Register New Guide
        </Button>
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
          title="Registered Guides"
          value={kpiData.registeredGuides}
          change={kpiData.guidesChange}
          changeLabel="new this month"
          trend="up"
          icon={<Users className="h-5 w-5" />}
          description="Verified tour guides on platform"
        />
        <KPICard
          title="Community Operators"
          value={kpiData.activeOperators}
          icon={<Building2 className="h-5 w-5" />}
          description="Active community-based tourism operators"
        />
        <KPICard
          title="Profile Views"
          value={kpiData.profileViews}
          icon={<Eye className="h-5 w-5" />}
          description="Guide and operator profile visits"
        />
        <KPICard
          title="Enquiries Generated"
          value={kpiData.enquiries}
          icon={<MessageSquare className="h-5 w-5" />}
          description="Booking enquiries via profiles"
        />
      </div>

      {/* Revenue Impact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Community Revenue</p>
                <p className="font-serif text-3xl font-bold">
                  R{(kpiData.communityRevenue / 1000000).toFixed(2)}M
                </p>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>+{kpiData.revenueChange}% vs last period</span>
                </div>
              </div>
              <Heart className="h-10 w-10 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        <KPICard
          title="Bookings via Guides"
          value={kpiData.bookingsLinked}
          icon={<Calendar className="h-5 w-5" />}
          description="Bookings attributed to registered guides"
        />
        <KPICard
          title="Training Completed"
          value={kpiData.trainingCompleted}
          icon={<GraduationCap className="h-5 w-5" />}
          description="Guides who completed onboarding"
        />
      </div>

      {/* Tabs for detailed views */}
      <Tabs defaultValue="guides" className="space-y-4">
        <TabsList>
          <TabsTrigger value="guides" className="gap-2">
            <Users className="h-4 w-4" />
            Guides
          </TabsTrigger>
          <TabsTrigger value="operators" className="gap-2">
            <Building2 className="h-4 w-4" />
            Operators
          </TabsTrigger>
          <TabsTrigger value="training" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            Training
          </TabsTrigger>
          <TabsTrigger value="impact" className="gap-2">
            <Heart className="h-4 w-4" />
            Impact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guides">
          <div className="space-y-6">
            {/* Top Performing Guides */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Top Performing Guides</CardTitle>
                <CardDescription>Guides with highest bookings and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topGuides.map((guide, index) => (
                    <div
                      key={guide.id}
                      className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="relative">
                        <Avatar className="h-14 w-14">
                          <AvatarImage src={guide.photo || "/placeholder.svg"} alt={guide.name} />
                          <AvatarFallback>
                            {guide.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium truncate">{guide.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {guide.speciality}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          {guide.region}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {guide.rating}
                          </span>
                          <span>{guide.bookings} bookings</span>
                          <span className="font-medium text-green-600">
                            R{guide.revenue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Guide Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Guide Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Verified & Active</span>
                      </div>
                      <span className="font-medium">152</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span className="text-sm">Pending Verification</span>
                      </div>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Premium Guides</span>
                      </div>
                      <span className="font-medium">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Guide Specialities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { speciality: "Wildlife Safari", count: 68 },
                    { speciality: "Cultural Tours", count: 42 },
                    { speciality: "Birding", count: 35 },
                    { speciality: "Photography", count: 28 },
                    { speciality: "Adventure", count: 14 },
                  ].map((spec) => (
                    <div key={spec.speciality} className="flex items-center justify-between">
                      <span className="text-sm">{spec.speciality}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(spec.count / 68) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-8">{spec.count}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="operators">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Community Tourism Operators</CardTitle>
              <CardDescription>
                Community-based tourism businesses and cultural experiences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium py-3 px-2">Operator</th>
                      <th className="text-left font-medium py-3 px-2">Type</th>
                      <th className="text-right font-medium py-3 px-2">Bookings</th>
                      <th className="text-right font-medium py-3 px-2">Revenue</th>
                      <th className="text-left font-medium py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {communityOperators.map((operator) => (
                      <tr key={operator.name} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-primary" />
                            </div>
                            <span className="font-medium">{operator.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant="outline">{operator.type}</Badge>
                        </td>
                        <td className="py-3 px-2 text-right">{operator.bookings}</td>
                        <td className="py-3 px-2 text-right font-medium text-green-600">
                          R{operator.revenue.toLocaleString()}
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant={operator.status === "verified" ? "default" : "secondary"}>
                            {operator.status === "verified" ? (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {operator.status}
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

        <TabsContent value="training">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Training Completion</CardTitle>
                <CardDescription>Onboarding program progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {trainingStats.completed}
                    </p>
                    <p className="text-xs text-green-600">Completed</p>
                  </div>
                  <div className="text-center p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                    <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                      {trainingStats.inProgress}
                    </p>
                    <p className="text-xs text-amber-600">In Progress</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">{trainingStats.notStarted}</p>
                    <p className="text-xs text-muted-foreground">Not Started</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {trainingStats.modules.map((module) => (
                    <div key={module.name}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>{module.name}</span>
                        <span className="text-muted-foreground">
                          {module.completed}/{module.total}
                        </span>
                      </div>
                      <Progress
                        value={(module.completed / module.total) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Certification Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { cert: "FGASA Level 1", holders: 89, icon: "🦁" },
                  { cert: "First Aid Certified", holders: 148, icon: "🏥" },
                  { cert: "Cultural Heritage", holders: 56, icon: "🏛" },
                  { cert: "Photography Guide", holders: 34, icon: "📷" },
                  { cert: "Adventure Guide", holders: 28, icon: "🧗" },
                ].map((cert) => (
                  <div key={cert.cert} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cert.icon}</span>
                      <span className="font-medium text-sm">{cert.cert}</span>
                    </div>
                    <Badge variant="outline">{cert.holders} guides</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopList title="Revenue by Offering Type" items={revenueByType} valueLabel="Revenue" />

            <EngagementHeatmap
              title="Geographic Distribution of Guides"
              data={geographicSpread}
            />
          </div>

          <DashboardSection
            title="Economic Impact Summary"
            description="Community tourism contribution to local economy"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">R2.45M</p>
                  <p className="text-sm text-muted-foreground mt-1">Total Community Revenue</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">187</p>
                  <p className="text-sm text-muted-foreground mt-1">Jobs Supported</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">42</p>
                  <p className="text-sm text-muted-foreground mt-1">Communities Reached</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">R13.1K</p>
                  <p className="text-sm text-muted-foreground mt-1">Avg. Monthly per Guide</p>
                </CardContent>
              </Card>
            </div>
          </DashboardSection>
        </TabsContent>
      </Tabs>
    </div>
  )
}

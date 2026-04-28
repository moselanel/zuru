import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { InviteTeamMember } from "./invite-member"
import { TeamMemberActions } from "./member-actions"

export const metadata = {
  title: "Team | Zuru Admin",
}

const roleLabels: Record<string, string> = {
  owner: "Owner",
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
}

const roleColors: Record<string, string> = {
  owner: "bg-purple-500 text-white",
  admin: "bg-blue-500 text-white",
  editor: "bg-green-500 text-white",
  viewer: "bg-gray-500 text-white",
}

export default async function TeamPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: tenantUser } = await supabase
    .from("tenant_users")
    .select(`
      role,
      tenant:tenants(id, name)
    `)
    .eq("user_id", user.id)
    .single()

  if (!tenantUser?.tenant) redirect("/signup")
  
  const tenant = tenantUser.tenant as { id: string; name: string }
  const currentUserRole = tenantUser.role
  const isOwnerOrAdmin = currentUserRole === "owner" || currentUserRole === "admin"

  if (!isOwnerOrAdmin) redirect("/admin")

  // Get all team members
  const { data: teamMembers } = await supabase
    .from("tenant_users")
    .select(`
      id,
      role,
      created_at,
      user:users(
        id,
        email,
        first_name,
        last_name
      )
    `)
    .eq("tenant_id", tenant.id)
    .order("created_at", { ascending: true })

  // Get pending invitations
  const { data: invitations } = await supabase
    .from("invitations")
    .select("*")
    .eq("tenant_id", tenant.id)
    .eq("status", "pending")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Team</h1>
          <p className="text-muted-foreground">
            Manage who has access to {tenant.name}.
          </p>
        </div>
        <InviteTeamMember tenantId={tenant.id} />
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            {teamMembers?.length || 0} member{(teamMembers?.length || 0) !== 1 ? "s" : ""} on your team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {teamMembers?.map((member) => {
              const memberUser = member.user as {
                id: string
                email: string
                first_name: string | null
                last_name: string | null
              } | null

              const firstName = memberUser?.first_name || ""
              const lastName = memberUser?.last_name || ""
              const email = memberUser?.email || "Unknown"
              const initials = firstName && lastName
                ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
                : email.charAt(0).toUpperCase()

              const isCurrentUser = memberUser?.id === user.id
              const canModify = currentUserRole === "owner" && !isCurrentUser

              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-zuru-sunset text-white">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          {firstName && lastName
                            ? `${firstName} ${lastName}`
                            : email}
                        </p>
                        {isCurrentUser && (
                          <Badge variant="outline" className="text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={roleColors[member.role] || "bg-gray-500"}>
                      {roleLabels[member.role] || member.role}
                    </Badge>
                    {canModify && (
                      <TeamMemberActions
                        memberId={member.id}
                        memberName={firstName || email}
                        currentRole={member.role}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      {invitations && invitations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Invitations</CardTitle>
            <CardDescription>
              Invitations that have not yet been accepted.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {invitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        {invitation.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{invitation.email}</p>
                      <p className="text-sm text-muted-foreground">
                        Invited {new Date(invitation.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Pending</Badge>
                    <Badge className={roleColors[invitation.role] || "bg-gray-500"}>
                      {roleLabels[invitation.role] || invitation.role}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Role Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Badge className={roleColors.owner}>Owner</Badge>
              <p className="text-sm text-muted-foreground">
                Full access to all features including billing, team management, and settings.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Badge className={roleColors.admin}>Admin</Badge>
              <p className="text-sm text-muted-foreground">
                Can manage content, enquiries, team members, and settings (except billing).
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Badge className={roleColors.editor}>Editor</Badge>
              <p className="text-sm text-muted-foreground">
                Can create and edit content, respond to enquiries.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Badge className={roleColors.viewer}>Viewer</Badge>
              <p className="text-sm text-muted-foreground">
                Read-only access to content and enquiries.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

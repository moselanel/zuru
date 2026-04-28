"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface EnquiryNotesProps {
  enquiryId: string
  initialNotes: string
}

export function EnquiryNotes({ enquiryId, initialNotes }: EnquiryNotesProps) {
  const router = useRouter()
  const [notes, setNotes] = useState(initialNotes)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  function handleChange(value: string) {
    setNotes(value)
    setHasChanges(value !== initialNotes)
  }

  async function handleSave() {
    setIsSaving(true)
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("enquiries")
        .update({ notes })
        .eq("id", enquiryId)

      if (error) throw error

      toast.success("Notes saved")
      setHasChanges(false)
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Failed to save notes")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Internal Notes</CardTitle>
        {hasChanges && (
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="bg-zuru-sunset hover:bg-zuru-sunset-dark"
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Add internal notes about this enquiry..."
          value={notes}
          onChange={(e) => handleChange(e.target.value)}
          className="min-h-[150px] resize-none"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          These notes are only visible to your team.
        </p>
      </CardContent>
    </Card>
  )
}

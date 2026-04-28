"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

const statuses = [
  { value: "new", label: "New", color: "bg-orange-500" },
  { value: "contacted", label: "Contacted", color: "bg-blue-500" },
  { value: "qualified", label: "Qualified", color: "bg-green-500" },
  { value: "converted", label: "Converted", color: "bg-purple-500" },
  { value: "closed", label: "Closed", color: "bg-gray-500" },
]

interface EnquiryStatusSelectProps {
  enquiryId: string
  currentStatus: string
}

export function EnquiryStatusSelect({ enquiryId, currentStatus }: EnquiryStatusSelectProps) {
  const router = useRouter()
  const [status, setStatus] = useState(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  async function handleStatusChange(newStatus: string) {
    setIsUpdating(true)
    setStatus(newStatus)
    
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("enquiries")
        .update({ status: newStatus })
        .eq("id", enquiryId)

      if (error) throw error

      toast.success("Status updated")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Failed to update status")
      setStatus(currentStatus)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Select value={status} onValueChange={handleStatusChange} disabled={isUpdating}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${s.color}`} />
              {s.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

"use client"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { useOrganization } from "@clerk/nextjs"
import Image from "next/image"
import { toast } from "sonner"

export const EmptyBoards = () => {
  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutation(api.boards.create)

  const onClick = () => {
    if (!organization) return

    mutate({
      orgId: organization.id,
      title: "Untitled"
    }).then(() => {
      toast.success("Board created successfully")
    }).catch(() => {
      toast.error("Failed to create board")
    })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image 
        src="/note.svg"
        height={140}
        width={140}
        alt="Empty"
      />
      <h2 className="text-2xl font-semibold mt-6">
        Create your first board!
      </h2>
      <p className="text-muted-foreground">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button disabled={pending} size="lg" onClick={onClick}>
          Create a board
        </Button>
      </div>
    </div>
  )
}

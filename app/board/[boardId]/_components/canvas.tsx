"use client"

import { useSelf } from "@liveblocks/react/suspense"
import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"

interface CanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf((me) => me.info)

  return (
    <main className='h-screen w-full relative bg-neutral-100 touch-none'>
      <Info />
      <Participants/>
      <Toolbar />
    </main>
  )
}

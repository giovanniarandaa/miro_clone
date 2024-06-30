"use client"
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";
import { ReactNode } from "react";

interface RoomProps {
  roomId: string;
  children: React.ReactNode;
  fallback: NonNullable<ReactNode> | null;
}

const liveblock_api = process.env.NEXT_PUBLIC_LIVEBLOCK_API_KEY!

export const Room = ({
  children,
  roomId,
  fallback
}: RoomProps) => {
  return (
    <LiveblocksProvider publicApiKey={liveblock_api}>
      <RoomProvider id={roomId} initialPresence={{}}>
        <ClientSideSuspense fallback={fallback}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

"use client"
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";
import { ReactNode } from "react";

interface RoomProps {
  roomId: string;
  children: React.ReactNode;
  fallback: NonNullable<ReactNode> | null;
}

export const Room = ({
  children,
  roomId,
  fallback
}: RoomProps) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
      <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
        <ClientSideSuspense fallback={fallback}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

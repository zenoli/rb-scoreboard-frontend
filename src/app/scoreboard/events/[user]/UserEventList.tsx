"use client"

import * as Rb from "@/lib/rb-types"
import { useQuery } from "@tanstack/react-query"
import { get } from "@/lib/api/scores"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TeamIcons } from "@/components/TeamIcons"
import { PlayerIcon } from "@/components/PlayerIcon"

interface UserEventListProps {
  user: string
}

export default function UserEventList({ user }: UserEventListProps) {
  const { data } = useQuery({
    queryKey: ["events", user],
    queryFn: ({ queryKey }) => get(queryKey.join("/")) as Promise<Rb.Event[]>,
    refetchInterval: 30 * 1000,
  })

  function getEventKey(event: Rb.Event) {
    return `${event.name}_${event.minute}_${event.player.id}_${event.team.shortCode}_${event.oponentTeam.shortCode}`
  }

  return (
    <div>
      {data &&
        data.map((event) => {
          const player = event.player
          return (
            <Card
              key={getEventKey(event)}
              className="flex h-20 items-center justify-between gap-2"
            >
              <PlayerIcon player={player} />
              <div>{player.displayName}</div>
              <div>{event.name}</div>
              <div>{event.minute}</div>
              <TeamIcons team={event.team} opponent={event.oponentTeam} />
            </Card>
          )
        })}
    </div>
  )
}

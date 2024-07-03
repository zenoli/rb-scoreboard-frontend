import { PlayerIcon } from "@/components/PlayerIcon"
import { TeamIcons } from "@/components/TeamIcons"
import * as Rb from "@/lib/rb-types"
import { createColumnHelper } from "@tanstack/react-table"
import { Clock, Handshake, Layers2, Target } from "lucide-react"

function ScoreType({ type, opponent }: { type: string; opponent: string }) {
  const Icon = ["Goal", "Penalty"].includes(type)
    ? Target
    : ["Yellowcard", "Redcard", "Yellow/Red card"].includes(type)
      ? Layers2
      : Handshake

  const shortTypeNames: Record<string, string> = {
    Yellowcard: "Yellow",
    Redcard: "Red",
    "Yellow/Red card": "Yellow/Red",
  }
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} />
      <div>
        {shortTypeNames[type] ? shortTypeNames[type] : type} against {opponent}
      </div>
    </div>
  )
}

const columnHelper = createColumnHelper<Rb.Event>()

export const columnDefs = [
  columnHelper.accessor("name", {
    header: () => "Player",
    cell: ({ row }) => {
      const event = row.original
      return (
        <div className="flex items-center justify-between">
          <div className="flex w-full gap-2">
            <PlayerIcon player={event.player} />
            <div className="flex grow flex-col gap-1">
              <div className="text-lg font-semibold leading-none tracking-tight">
                {row.original.player.displayName}
              </div>
              <div className="flex justify-between text-[0.55rem] text-muted-foreground">
                <ScoreType
                  type={event.name}
                  opponent={event.oponentTeam.name}
                />
                <div className="flex w-1/3 items-center gap-2">
                  <Clock size={16} />
                  {event.minute.toString() +
                    (event.extraMinute ? `+${event.extraMinute}` : "")}
                </div>
              </div>
            </div>
          </div>
          <div>
            <TeamIcons team={event.team} opponent={event.oponentTeam} />
          </div>
        </div>
      )
    },
  }),
]

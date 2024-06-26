import { PlayerIcon } from "@/components/PlayerIcon"
import { TeamIcons } from "@/components/TeamIcons"
import * as Rb from "@/lib/rb-types"
import { ColumnDef } from "@tanstack/react-table"
import { Clock, Handshake, Layers2, Target } from "lucide-react"

function ScoreType({ type }: { type: string }) {
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
    <div className="flex items-center gap-2 text-[0.55rem] uppercase">
      <Icon size={16} />
      <div>{shortTypeNames[type] ? shortTypeNames[type] : type}</div>
    </div>
  )
}

export const columnDefs: ColumnDef<Rb.Event>[] = [
  {
    accessorKey: "player",
    header: () => "Player",
    cell: (info) => <PlayerIcon player={info.getValue<Rb.Player>()} />,
  },
  {
    accessorKey: "player.displayName",
    header: () => <div>Name</div>,
    cell: ({ row }) => (
      <div className="text-xs">
        <div>{row.original.player.displayName}</div>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => "Type",
    cell: ({ getValue }) => <ScoreType type={getValue<string>()} />,
  },
  {
    accessorKey: "minute",
    header: () => "Time",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2 text-xs">
        <Clock size={16} />
        {getValue<number>()}
      </div>
    ),
  },
  {
    accessorKey: "team",
    header: () => "Match",
    cell: ({ row }) => (
      <TeamIcons team={row.original.team} opponent={row.original.oponentTeam} />
    ),
  },

  // columnHelper.accessor("player", {
  //   id: "player-icon",
  //   header: () => "Name",
  //   cell: ({ getValue }) => <PlayerIcon player={player} />,
  // }),
]

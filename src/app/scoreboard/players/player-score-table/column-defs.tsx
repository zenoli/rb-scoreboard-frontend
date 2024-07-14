import { PlayerIcon } from "@/components/PlayerIcon"
import { Badge } from "@/components/ui/badge"
import * as Rb from "@/lib/rb-types"
import { Column, ColumnDef } from "@tanstack/react-table"
import clsx from "clsx"
import {
  Handshake,
  Target,
  Shield,
  Sigma,
  Layers2,
  LucideProps,
} from "lucide-react"

interface HeaderProps {
  name: String
  column: Column<Rb.PlayerScore, unknown>
  icon: (props: LucideProps) => React.ReactNode
  handleClick?: (column: Column<Rb.PlayerScore>) => void
}

function Header({ name, column, icon: Icon, handleClick }: HeaderProps) {
  return (
    <div
      className="text-[0.6rem]"
      onClick={handleClick && (() => handleClick(column))}
    >
      <div className="flex flex-col items-center">
        <div className="text-wrap">{<Icon size={16} />}</div>
        {name}
      </div>
    </div>
  )
}

function ScoreCell({
  column,
  value,
}: {
  column: Column<Rb.PlayerScore>
  value: number
}) {
  const isSorted = column.getIsSorted() === "desc"
  return (
    <div className="text-center font-medium">
      <Badge
        variant="secondary"
        className={clsx({ "bg-transparent": !isSorted })}
      >
        {value}
      </Badge>
    </div>
  )
}

function SortableHeader(props: Omit<HeaderProps, "handleClick">) {
  return (
    <Header handleClick={(column) => column.toggleSorting(true)} {...props} />
  )
}

export const columnDefs: ColumnDef<Rb.PlayerScore>[] = [
  {
    accessorKey: "player",
    header: ({ column }) => (
      <div className="flex translate-y-2 items-end text-[0.6rem] font-bold uppercase">
        Name
      </div>
    ),
    cell: ({ getValue }) => {
      const player = getValue<Rb.Player>()
      return (
        <div className="flex flex-col items-center">
          <PlayerIcon player={player} />
          {/* <Badge className="text-[0.4rem] -translate-y-1">{player.displayName}</Badge> */}
          <div className="-translate-y-1 text-center text-[0.5rem]">
            {player.displayName}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "goal",
    header: ({ column }) => (
      <SortableHeader name="Goal" column={column} icon={Target} />
    ),
    cell: ({ column, getValue }) => (
      <ScoreCell column={column} value={getValue<number>()} />
    ),
  },
  {
    accessorKey: "assist",
    header: ({ column }) => (
      <SortableHeader name="Assist" column={column} icon={Handshake} />
    ),
    cell: ({ column, getValue }) => (
      <ScoreCell column={column} value={getValue<number>()} />
    ),
  },
  {
    accessorKey: "booking",
    header: ({ column }) => (
      <SortableHeader name="Booking" column={column} icon={Layers2} />
    ),
    cell: ({ column, getValue }) => (
      <ScoreCell column={column} value={getValue<number>()} />
    ),
  },
  {
    accessorKey: "cleanSheet",
    accessorFn: (row) => row.cleanSheet || 0,
    header: ({ column }) => (
      <SortableHeader name="Cl. Sht" column={column} icon={Shield} />
    ),
    cell: ({ column, getValue }) => (
      <ScoreCell column={column} value={getValue<number>()} />
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <SortableHeader name="Total" column={column} icon={Sigma} />
    ),
    cell: ({ column, getValue }) => (
      <ScoreCell column={column} value={getValue<number>()} />
    ),
  },
]

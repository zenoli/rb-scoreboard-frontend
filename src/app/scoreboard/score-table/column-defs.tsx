import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import * as Rb from "@/lib/rb-types"
import { Column, ColumnDef } from "@tanstack/react-table"
import {
  UsersRound,
  Handshake,
  Target,
  Shield,
  Sigma,
  Layers2,
  LucideProps,
} from "lucide-react"

interface HeaderProps {
  name: String
  column: Column<Rb.UserScore, unknown>
  icon: (props: LucideProps) => React.ReactNode
  handleClick?: (column: Column<Rb.UserScore>) => void
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

function SortableHeader(props: Omit<HeaderProps, "handleClick">) {
  return (
    <Header handleClick={(column) => column.toggleSorting(true)} {...props} />
  )
}

export const columnDefs: ColumnDef<Rb.UserScore>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => (
      <Header name="Name" column={column} icon={UsersRound} />
    ),
    cell: ({ getValue }) => (
      <div className="text-left font-medium">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "goal",
    header: ({ column }) => (
      <SortableHeader name="Goal" column={column} icon={Target} />
    ),
    cell: ({ getValue }) => {
      return <div className="text-center font-medium">{getValue<number>()}</div>
    },
  },
  {
    accessorKey: "assist",
    header: ({ column }) => (
      <SortableHeader name="Assist" column={column} icon={Handshake} />
    ),
    cell: ({ cell }) => {
      return (
        <div className="text-center font-medium">
          {cell.getValue() as number}
        </div>
      )
    },
  },
  {
    accessorKey: "booking",
    header: ({ column }) => (
      <SortableHeader name="Booking" column={column} icon={Layers2} />
    ),
    cell: ({ cell }) => {
      return (
        <div className="text-center font-medium">
          {cell.getValue() as number}
        </div>
      )
    },
  },
  {
    accessorKey: "booking",
    header: ({ column }) => (
      <SortableHeader name="Cl. Sht" column={column} icon={Shield} />
    ),
    cell: ({ cell }) => {
      return (
        <div className="text-center font-medium">
          {cell.getValue() as number}
        </div>
      )
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <SortableHeader name="Total" column={column} icon={Sigma} />
    ),
    cell: ({ cell }) => {
      return (
        <div className="text-center font-medium">
          <Badge variant="secondary">{cell.getValue() as number}</Badge>
        </div>
      )
    },
  },
]

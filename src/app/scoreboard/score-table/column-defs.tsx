import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import * as Rb from "@/lib/rb-types"
import { Column, ColumnDef } from "@tanstack/react-table"
import {
  ChevronDown,
  Handshake,
  Target,
  Shield,
  Sigma,
  Layers2,
} from "lucide-react"
function Header({ name }: { name: String }) {
  return <div className="text-[0.6rem]">{name}</div>
}

function SortableHeader({
  name,
  column,
  icon,
}: {
  name: String
  column: Column<Rb.UserScore, unknown>
  icon: React.ReactNode
}) {
  const showSortingIndicator = column.getIsSorted() === "desc"
  return (
    <div className="text-[0.6rem]" onClick={() => column.toggleSorting(true)}>
      <div className="flex flex-col items-center">
        <div className="text-wrap">{icon}</div>
        {name}
      </div>
    </div>
    // <div className="flex items-center justify-center relative hover:z-50">
    //   <Button
    //     variant="ghost"
    //     className="text-[0.6rem]"
    //     onClick={() => column.toggleSorting(true)}
    //   >
    //     <div className="flex flex-col items-center">
    //       <div className="text-wrap">{icon}</div>
    //       {name}
    //     </div>
    //   </Button>
    // </div>
  )
}

export const columnDefs: ColumnDef<Rb.UserScore>[] = [
  {
    accessorKey: "user",
    header: () => <Header name="Name" />,
    cell: ({ getValue }) => (
      <div className="text-left font-medium">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "goal",
    header: ({ column }) => (
      <SortableHeader name="Goal" column={column} icon={<Target size={16} />} />
    ),
    cell: ({ getValue }) => {
      return <div className="text-center font-medium">{getValue<number>()}</div>
    },
  },
  {
    accessorKey: "assist",
    header: ({ column }) => (
      <SortableHeader
        name="Assist"
        column={column}
        icon={<Handshake size={16} />}
      />
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
      <SortableHeader
        name="Booking"
        column={column}
        icon={<Layers2 size={16} />}
      />
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
      <SortableHeader
        name="Cl. Sht"
        column={column}
        icon={<Shield size={16} />}
      />
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
      <SortableHeader name="Total" column={column} icon={<Sigma size={16} />} />
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

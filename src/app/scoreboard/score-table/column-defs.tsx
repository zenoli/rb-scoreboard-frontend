import { Button } from "@/components/ui/button"
import * as Rb from "@/lib/rb-types"
import { Column, ColumnDef } from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

function Header({ name }: { name: String }) {
  return <div className="text-xs">{name}</div>
}

function SortableHeader({
  name,
  column,
}: {
  name: String
  column: Column<Rb.UserScore, unknown>
}) {
  const showSortingIndicator = column.getIsSorted() === "desc"
  return (
    <div className="flex items-center justify-center">
      <Button
        variant="ghost"
        className="text-xs h-8 p-[10px]"
        onClick={() => column.toggleSorting(true)}
      >
        {name}
        {
          <ChevronDown
            className={`ml-1 h-4 w-4 ${showSortingIndicator ? "visible" : "invisible"}`}
          />
        }
      </Button>
    </div>
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
    header: ({ column }) => <SortableHeader name="Goal" column={column} />,
    cell: ({ getValue }) => {
      return <div className="text-center font-medium">{getValue<number>()}</div>
    },
  },
  {
    accessorKey: "assist",
    header: ({ column }) => <SortableHeader name="Assist" column={column} />,
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
    header: ({ column }) => <SortableHeader name="Booking" column={column} />,
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
    header: ({ column }) => <SortableHeader name="Total" column={column} />,
    cell: ({ cell }) => {
      return (
        <div className="text-center font-medium">
          {cell.getValue() as number}
        </div>
      )
    },
  },
]

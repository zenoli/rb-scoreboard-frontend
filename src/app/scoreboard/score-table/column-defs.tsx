import * as Rb from "@/lib/rb-types"
import { Cell, ColumnDef } from "@tanstack/react-table"

function Header({ name }: { name: String }) {
  return <div className="text-xs">{name}</div>
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
    header: () => <Header name="Goals" />,
    cell: ({ getValue }) => {
      return <div className="text-center font-medium">{getValue<number>()}</div>
    },
  },
  {
    accessorKey: "assist",
    header: () => <Header name="Assist" />,
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
    header: () => <Header name="Booking" />,
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
    header: () => <Header name="Total" />,
    cell: ({ cell }) => {
      return (
        <div className="text-center font-medium">
          {cell.getValue() as number}
        </div>
      )
    },
  },
]

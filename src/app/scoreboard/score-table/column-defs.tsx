import * as Rb from "@/lib/rb-types"
import { ColumnDef } from "@tanstack/react-table"

export const columnDefs: ColumnDef<Rb.UserScore>[] = [
  {
    accessorKey: "user",
    header: "Name",
  },
  {
    accessorKey: "goal",
    header: "Goals",
  },
  {
    accessorKey: "assist",
    header: "Assists",
  },
  {
    accessorKey: "booking",
    header: "Bookings",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
]

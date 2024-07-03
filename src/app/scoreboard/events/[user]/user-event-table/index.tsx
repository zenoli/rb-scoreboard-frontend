"use client"

import * as Rb from "@/lib/rb-types"
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import EventTypeList from "./event-type-list"

interface UserEventTableProps {
  columns: ColumnDef<Rb.Event>[]
  data: Rb.Event[]
}

export default function UserEventTable({ columns, data }: UserEventTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="absolute inset-0 m-2 overflow-hidden rounded-md border">
      <ScrollArea className="h-full">
        <Table className="relative">
          <EventTypeList
            eventType="Goals"
            rows={table
              .getRowModel()
              .rows.filter((row) => row.original.name === "Goal")}
          />
          <EventTypeList
            eventType="Assists"
            rows={table
              .getRowModel()
              .rows.filter((row) => row.original.name === "Assist")}
          />
          <EventTypeList
            eventType="Bookings"
            rows={table
              .getRowModel()
              .rows.filter((row) =>
                ["Yellowcard", "Redcard", "Yellow/Red card"].includes(
                  row.original.name
                )
              )}
          />
        </Table>
      </ScrollArea>
    </div>
  )
}

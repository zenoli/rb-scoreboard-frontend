"use client"

import * as Rb from "@/lib/rb-types"
import { capitalize } from "lodash"
import {
  AccessorKeyColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import EventTypeList from "./event-type-list"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { CardTitle } from "@/components/ui/card"

interface UserEventTableProps {
  user: string
  columns: AccessorKeyColumnDef<Rb.Event, string>[]
  data: Rb.Event[]
}

function getTitle(user: string) {
  // Omit "s" after possesive apostrophe if name already ends with "s"
  return `${capitalize(user)}'${user.endsWith("s") ? "" : "s"} points`
}

export default function UserEventTable({
  user,
  columns,
  data,
}: UserEventTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnFilters },
  })

  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-3">
      <CardTitle className="p-3">{getTitle(user)}</CardTitle>
      <div className="flex items-center">
        <Input
          placeholder="Filter players..."
          value={
            (table.getColumn("score-event")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("score-event")?.setFilterValue(event.target.value)
          }
          className="h-12"
        />
      </div>
      <div className="flex-grow overflow-hidden rounded-md border">
        <ScrollArea className="h-full">
          <Table className="relative">
            <EventTypeList
              eventType="Goals"
              rows={table
                .getRowModel()
                .rows.filter((row) =>
                  ["Goal", "Penalty"].includes(row.original.name)
                )}
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
    </div>
  )
}

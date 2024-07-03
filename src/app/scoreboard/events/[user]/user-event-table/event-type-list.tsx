"use client"

import * as Rb from "@/lib/rb-types"
import { flexRender, Row } from "@tanstack/react-table"

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Handshake, Layers2, Target } from "lucide-react"

function ScoreIcon({ eventType }: { eventType: string }) {
  const Icon =
    eventType === "Goals"
      ? Target
      : eventType === "Bookings"
        ? Layers2
        : Handshake

  return (
    <div className="flex items-center gap-2">
      <Icon size={16} />
      <div>{eventType}</div>
    </div>
  )
}

interface EventTypeListProps {
  eventType: string
  rows: Row<Rb.Event>[]
}

export default function EventTypeList({ eventType, rows }: EventTypeListProps) {
  return (
    <>
      <TableHeader>
        <TableRow key={eventType} className="top-0">
          <TableHead className="sticky top-0 z-10 bg-black/40 font-bold uppercase backdrop-blur-md">
            <ScoreIcon eventType={eventType} />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows?.length ? (
          rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={1} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  )
}

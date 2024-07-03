"use client"

import * as Rb from "@/lib/rb-types"
import { useQuery } from "@tanstack/react-query"
import { get } from "@/lib/api/scores"
import UserEventTable from "./user-event-table"
import { columnDefs } from "./user-event-table/column-defs"
import * as config from "../../../../lib/config"

interface UserEventListProps {
  user: string
}

export default function UserEventList({ user }: UserEventListProps) {
  const { data } = useQuery({
    queryKey: ["events", user],
    queryFn: ({ queryKey }) => get(queryKey.join("/")) as Promise<Rb.Event[]>,
    refetchInterval: config.REFETCH_INTERVAL * 1000,
  })

  return (
    <div>{data && <UserEventTable data={data} columns={columnDefs} />}</div>
  )
}

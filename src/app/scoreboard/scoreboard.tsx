"use client"

import { useQuery } from "@tanstack/react-query"
import ScoreTable from "./score-table"
import { columnDefs } from "./score-table/column-defs"
import { getScores } from "@/lib/api/scores"

export default function Scoreboard() {
  const { data } = useQuery({
    queryKey: ["scores"],
    queryFn: () => getScores(),
    refetchInterval: 30 * 1000,
  })
  const scoreData =
    data &&
    Object.entries(data).map(([user, score]) => ({
      user,
      ...score,
    }))

  return (
    <div>
      {scoreData && <ScoreTable data={scoreData} columns={columnDefs} />}
    </div>
  )
}

"use client"

import { useQuery } from "@tanstack/react-query"
import { getScores } from "./page"
import ScoreTable from "./score-table"
import { columnDefs } from "./score-table/column-defs"

export default function Scoreboard() {
  const { data } = useQuery({
    queryKey: ["scores"],
    queryFn: () => getScores(),
    refetchInterval: 30 * 1000,
  })
  console.log(data)
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

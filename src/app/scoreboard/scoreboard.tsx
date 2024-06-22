"use client"

import { useQuery } from "@tanstack/react-query"
import { getScores } from "./page"
import ScoreTable from "./score-table"

export default function Scoreboard() {
  const { data } = useQuery({
    queryKey: ["scores"],
    queryFn: () => getScores(),
  })
  console.log(data)

  return <div>{data && <ScoreTable data={data} />}</div>
}

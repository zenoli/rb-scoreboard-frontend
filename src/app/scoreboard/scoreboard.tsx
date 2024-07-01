"use client"

import { useQuery } from "@tanstack/react-query"
import ScoreTable from "./score-table"
import { columnDefs } from "./score-table/column-defs"
import { getScores } from "@/lib/api/scores"
import { PuffLoader } from "react-spinners"
import clsx from "clsx"
import * as config from "../../lib/config"

export default function Scoreboard() {
  const { data, isFetching } = useQuery({
    queryKey: ["scores"],
    queryFn: () => getScores(),
    refetchInterval: config.REFETCH_INTERVAL * 1000,
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
      <div
        className={clsx(
          "flex justify-center gap-2 pt-4 text-white transition-opacity duration-1000 hover:opacity-0",
          { "opacity-0": !isFetching }
        )}
      >
        <PuffLoader loading={true} color="#ffffff" size={15} />
      </div>
    </div>
  )
}

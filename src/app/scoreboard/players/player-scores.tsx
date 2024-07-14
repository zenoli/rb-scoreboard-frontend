"use client"

import { useQuery } from "@tanstack/react-query"
import PlayerScoreTable from "./player-score-table"
import { columnDefs } from "./player-score-table/column-defs"
import { get } from "@/lib/api/scores"
import { PuffLoader } from "react-spinners"
import clsx from "clsx"
import * as config from "../../../lib/config"
import * as Rb from "@/lib/rb-types"

export default function PlayerScores() {
  const { data, isFetching } = useQuery({
    queryKey: ["scores", "players"],
    queryFn: ({ queryKey }) => get(queryKey.join("/")) as Promise<Rb.PlayerScore[]>,
    refetchInterval: config.REFETCH_INTERVAL * 1000,
  })

  // // console.log(Object.entries(data))
  // const scoreData =
  //   data &&
  //   Object.entries(data).map(([user, score]) => ({
  //     user,
  //     ...score,
  //   }))

  return (
    <div>
      {data && <PlayerScoreTable data={data} columns={columnDefs} />}
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

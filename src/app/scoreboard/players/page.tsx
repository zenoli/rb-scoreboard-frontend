import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import PlayerScores from "./player-scores"
import { get } from "@/lib/api/scores"
import * as Rb from "@/lib/rb-types"
import Image from "next/image"

export const dynamic = "force-dynamic"

export default async function ScoreboardPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["scores", "players"],
    queryFn: ({ queryKey }) =>
      get(queryKey.join("/")) as Promise<Rb.PlayerScore>,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-center gap-8">
        <PlayerScores />
      </div>
    </HydrationBoundary>
  )
}

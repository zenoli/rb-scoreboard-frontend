import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import Scoreboard from "./scoreboard"
import { getScores } from "@/lib/api/scores"

export const dynamic = "force-dynamic"

export default async function ScoreboardPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["scores"],
    queryFn: () => getScores(true),
  })

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Scoreboard />
    </HydrationBoundary>
  )
}

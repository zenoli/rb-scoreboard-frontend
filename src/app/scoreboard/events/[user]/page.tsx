import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { get, getScores } from "@/lib/api/scores"
import UserEventList from "./UserEventList"

export const dynamic = "force-dynamic"

export default async function UserEventsPage({
  params,
}: {
  params: { user: string }
}) {
  const user = params.user
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["events", user],
    queryFn: ({ queryKey }) => get(queryKey.join("/"), true),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserEventList user={user} />
    </HydrationBoundary>
  )
}

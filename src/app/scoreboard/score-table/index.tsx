import * as Rb from "@/lib/rb-types"

interface ScoreTableProps {
  data: Rb.ScoreMap
}
export default function ScoreTable({ data }: ScoreTableProps) {
  return (
    <div>
      <div>Hello From ScoreTable</div>
    </div>
  )
}

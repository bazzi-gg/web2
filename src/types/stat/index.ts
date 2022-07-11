import { RankingPreview } from '../ranking-preview'
interface StatisticsResponse<T> {
  id: string
  lastUpdated: string
  data: T[]
}
interface Ranking extends RankingPreview {
  pickRate: number
  count: number
}

export { StatisticsResponse, Ranking }

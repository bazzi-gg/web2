import { RecentMatchSummary } from './recent-match-summary'
import { Match } from './match'
import { RecentTrackRecord } from './recent-track-record'
export interface PlayerDetail {
  accessId: string
  racingMasterEmblem: boolean
  channel: string
  character: string
  license: string
  lastRenewal: string
  lastRenewalRaw?: string
  nickname: string
  recentTrackRecords?: RecentTrackRecord[]
  recentMatchSummary: RecentMatchSummary
  matches: Match[]
}

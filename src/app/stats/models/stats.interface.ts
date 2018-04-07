export interface IssueStats {
  issueKey: string;
  workEffort: number;
  tdStats: TDStats;
  totalCommits: number;
  author: string;
}

export interface TDStats {
  added: number;
  removed: number;
  totalPain: number;
  high: number;
  medium: number;
  low: number;
}

export interface CommitStats {
  totalCommits: number;
  commitsWithIssues: number;
  commitsWithoutIssues: number;
  numberOfAuthors: number;
  meanTicketsPerCommit: number;
  meanTDItemsPerCommit: number;
}

export interface SimpleStats {
  mean: number;
  std: number;
}

export interface IssueStats {
  issueKey: string;
  workEffort: WorkEffort;
  tdStats: TDStats;
  totalCommits: number;
  changeSetStats: ChangeSetStats;
  author: string;
}

export interface CommitStats {
  totalCommits: number;
  commitsWithIssues: number;
  commitsWithoutIssues: number;
  numberOfAuthors: number;
  meanTicketsPerCommit: number;
  meanTDItemsPerCommit: number;
}

export interface ChangeSetStats {
  totalChanges: number;
  additions: number;
  deletions: number;
  modifications: number;
}

export interface TDStats {
  added: number;
  removed: number;
  totalPain: number;
  high: number;
  medium: number;
  low: number;
}

export interface SimpleStats {
  mean: number;
  std: number;
}

export interface ChangeTD {
  changeSet: ChangeSetStats;
  technicalDebt: TDStats;
}

export interface WorkTD {
  workEffort: WorkEffort;
  technicalDebt: TDStats;
}

export interface WorkEffort {
  hours: number;
}

export interface TechnicalDebt {
  totalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
}

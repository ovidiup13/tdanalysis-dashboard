import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

// models
import { Repository } from "../models/repository.interface";
import { Issue } from "../models/issue.interface";
import { Commit, CommitMap } from "../models/commit.interface";
import {
  IssueStats,
  CommitStats,
  TechnicalDebt,
  ChangeTD,
  WorkTD
} from "../models/stats.interface";

// env
import { environment } from "../../../environments/environment.dev";

@Injectable()
export class DataService {
  private static API: string = environment.api;

  constructor(private http: HttpClient) {}

  /**
   * Returns metadata about the repository.
   * @param id of the repository
   */
  getRepositories(): Observable<Repository[]> {
    return this.http.get<Repository[]>(`${DataService.API}/repos`);
  }

  /**
   * Returns metadata about the repository.
   * @param id of the repository
   */
  getRepository(id: string): Observable<Repository> {
    return this.http.get<Repository>(`${DataService.API}/repos/${id}`);
  }

  /**
   * Returns a list of stats for all tickets. Stats include total commits only.
   * Results are NOT filtered by number of commits.
   * @param repoId
   */
  getTicketStatsRaw(repoId: string): Observable<IssueStats[]> {
    return this.http.get<IssueStats[]>(
      `${DataService.API}/repos/${repoId}/stats/tickets`
    );
  }

  /**
   * Returns stats related to commits from the repository.
   * @param repoId repository ID
   */
  getCommitStats(repoId: string): Observable<CommitStats> {
    return this.http.get<CommitStats>(
      `${DataService.API}/repos/${repoId}/stats/commits`
    );
  }

  /**
   * Retrieves a timeline of technical debt throughout the project evolution.
   * @param repoId the repository ID
   */
  getTechnicalDebtTimeline(repoId: string): Observable<TechnicalDebt[]> {
    return this.http.get<TechnicalDebt[]>(
      `${DataService.API}/repos/${repoId}/td/timeline`
    );
  }

  getChangeSetTechnicalDebt(repoId: string): Observable<ChangeTD[]> {
    return this.http.get<ChangeTD[]>(
      `${DataService.API}/repos/${repoId}/td/changeset`
    );
  }

  getWorkEffortTDByTicket(repoId: string): Observable<WorkTD[]> {
    return this.http.get<WorkTD[]>(
      `${DataService.API}/repos/${repoId}/td/work/ticket`
    );
  }

  getWorkEffortTDByCommit(repoId: string): Observable<WorkTD[]> {
    return this.http.get<WorkTD[]>(
      `${DataService.API}/repos/${repoId}/td/work/commit`
    );
  }
}

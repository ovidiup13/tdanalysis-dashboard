import { Component, OnInit } from "@angular/core";
import { Observable, Subscribable } from "rxjs/Observable";
import { mergeMap, zip, map, mergeAll } from "rxjs/operators";
import { forkJoin } from "rxjs/observable/forkJoin";

// services
import { DataService } from "./services/data-service.service";

// models
import { Repository } from "./models/repository.interface";
import { Commit } from "./models/commit.interface";
import { Issue } from "./models/issue.interface";

// env
import { environment } from "../environments/environment.dev";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  private static repoId: string = "2";
  private static issueKey: string = "104";
  private static commitSha: string = "c7a175fbfa5b171ac02423ab2c92f279a6f9de0c";

  repository$: Observable<Repository>;
  issues$: Observable<Issue[]>;
  issue$: Observable<Issue>;

  commits$: Observable<Commit[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.repository$ = this.dataService.getRepository(AppComponent.repoId);
    this.issues$ = this.dataService.getIssues(AppComponent.repoId);
    this.commits$ = this.dataService.getCommitsByIssue(
      AppComponent.repoId,
      AppComponent.issueKey
    );
    // this.dataService
    //   .getCommit(AppComponent.repoId, AppComponent.commitSha)
    //   .subscribe((commit: Commit) => {
    //     console.log(commit);
    //   });

    const subscriptions = [];
    this.dataService
      .getIssues(AppComponent.repoId)
      // .pipe(map((issues: Issue[]) => issues.map(this.getCommitsOfIssue)))
      .subscribe((issues: Issue[]) => {
        issues.forEach(issue => {
          subscriptions.push(this.getCommitsOfIssue(issue));
        });
        forkJoin(...subscriptions).subscribe(data => console.log(data));
      });
  }

  /**
   *
   * @param issue
   */
  getCommitsOfIssue(issue: Issue): Observable<Commit[]> {
    return this.dataService.getCommitsByIssue(
      AppComponent.repoId,
      issue.issueKey
    );
  }
}

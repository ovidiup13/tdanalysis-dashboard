import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DataService } from "../../services/data-service.service";
import { Observable } from "rxjs/Observable";
import { IssueStats, CommitStats } from "../../models/stats.interface";
import { switchMap } from "rxjs/operators";
import { Repository } from "../../models/repository.interface";

@Component({
  selector: "app-repository-viewer",
  template: `
  <div class="page">
    <h1 class="title">Repository Stats</h1>
    <div>
      <h3 class="title">Commit Stats</h3>
      <app-commit-stats class="chart" [data]="commitStats$ | async"></app-commit-stats>
    </div>

    <div>
      <h3 class="title">Issue Stats</h3>
      <app-issue-stats class="chart" [issueStats]="workEffortData$ | async"></app-issue-stats>
    </div>    

    <div>
      <h3 class="title">Work Effort - Technical Debt</h3>
      <app-effort-td-stats class="chart" [data]="workEffortData$ | async"></app-effort-td-stats>
    </div>
  </div>
  `,
  styleUrls: ["./repository-viewer.component.css"]
})
export class RepositoryViewerComponent implements OnInit {
  workEffortData$: Observable<IssueStats[]>;
  commitStats$: Observable<CommitStats>;
  repository$: Observable<Repository>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.repository$ = this.dataService.getRepository(params.id);
      this.workEffortData$ = this.dataService.getTicketStats(params.id);
      this.commitStats$ = this.dataService.getCommitStats(params.id);
    });
  }
}

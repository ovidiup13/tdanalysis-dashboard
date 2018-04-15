import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DataService } from "../../services/data-service.service";
import { Observable } from "rxjs/Observable";
import {
  IssueStats,
  CommitStats,
  TechnicalDebt,
  ChangeTD,
  WorkTD
} from "../../models/stats.interface";
import { switchMap } from "rxjs/operators";
import { Repository } from "../../models/repository.interface";

@Component({
  selector: "app-repository-viewer",
  template: `
  <div class="page">

    <ng-container *ngIf="repository$ | async as repository">
      <h1 class="title">{{repository.author + "/" + repository.name}}</h1>

      <div>
        <h3 class="title">Repository Stats</h3>
        <app-repo-stats [repository]="repository"></app-repo-stats>
      </div>
    </ng-container>

    <ng-container *ngIf="commitStats$ | async as commitStats">
      <h3 class="title">Commit Stats</h3>
      <app-commit-stats class="chart" [data]="commitStats"></app-commit-stats>
    </ng-container>

    <ng-container *ngIf="technicalDebt$ | async as technicalDebt">
      <div>
        <h3 class="title">Technical Debt Timeline</h3>
        <app-td-stats class="chart" [data]="technicalDebt"></app-td-stats>
      </div>
    </ng-container>

    <ng-container *ngIf="issueStats$ | async as issueStats">
      <div>
        <h3 class="title">Issue Stats</h3>
        <app-issue-stats class="chart" [issueStats]="issueStats"></app-issue-stats>
      </div>
    </ng-container>

    <ng-container *ngIf="changeTDs$ | async as changeTDs">
      <div>
        <h3 class="title">Change Sets - Technical Debt</h3>
        <app-changeset-stats class="chart" [data]="changeTDs"></app-changeset-stats>
      </div>
    </ng-container>

    <ng-container *ngIf="commitWorkTD$ | async as commitWorkTD">
      <h3 class="title">Work Effort - Technical Debt By Commit Timestamps</h3>
      <p>
        Work effort is calculated by the difference between the last commit timestamp of his/hers previous work item and the last commit of the current work item.
        <b>Only results that are within one standard deviation from the mean are shown in the graph.</b>
        </p>
      <app-effort-td-stats class="chart" [data]="commitWorkTD"></app-effort-td-stats>
    </ng-container>

    <ng-container *ngIf="ticketWorkTD$ | async as ticketWorkTD">
      <h3 class="title">Work Effort - Technical Debt By Ticket &amp; Commit Timestamps</h3>
      <p>
        Work effort is calculated by the difference between the ticket creation date and the last commit of the current work item.
        <b>Only results that are within one standard deviation from the mean are shown in the graph.</b>
      </p>
      <app-effort-td-stats class="chart" [data]="ticketWorkTD"></app-effort-td-stats>
    </ng-container>
  </div>
  `,
  styleUrls: ["./repository-viewer.component.css"]
})
export class RepositoryViewerComponent implements OnInit {
  repository$: Observable<Repository>;

  changeTDs$: Observable<ChangeTD[]>;
  ticketWorkTD$: Observable<WorkTD[]>;
  commitWorkTD$: Observable<WorkTD[]>;

  issueStats$: Observable<IssueStats[]>;
  commitStats$: Observable<CommitStats>;
  technicalDebt$: Observable<TechnicalDebt[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.repository$ = this.dataService.getRepository(params.id);

      this.changeTDs$ = this.dataService.getChangeSetTechnicalDebt(params.id);
      this.ticketWorkTD$ = this.dataService.getWorkEffortTDByTicket(params.id);
      this.commitWorkTD$ = this.dataService.getWorkEffortTDByCommit(params.id);

      this.issueStats$ = this.dataService.getTicketStatsRaw(params.id);
      this.commitStats$ = this.dataService.getCommitStats(params.id);
      this.technicalDebt$ = this.dataService.getTechnicalDebtTimeline(
        params.id
      );
    });
  }
}

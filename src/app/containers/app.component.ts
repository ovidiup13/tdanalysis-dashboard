import { Component, OnInit } from "@angular/core";
import { Observable, Subscribable } from "rxjs/Observable";
import { mergeMap, zip, map, mergeAll } from "rxjs/operators";
import { forkJoin } from "rxjs/observable/forkJoin";

// services
import { DataService } from "../services/data-service.service";

// models
import { Repository } from "../models/repository.interface";
import { Commit, CommitMap } from "../models/commit.interface";
import { Issue } from "../models/issue.interface";

// env
import { environment } from "../../environments/environment.dev";
import { Stats } from "../models/stats.interface";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  private static repoId: string = "2";
  private static issueKey: string = "104";
  private static commitSha: string = "c7a175fbfa5b171ac02423ab2c92f279a6f9de0c";

  data$: Observable<Stats[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.data$ = this.dataService.getSimpleStats(AppComponent.repoId);
  }
}

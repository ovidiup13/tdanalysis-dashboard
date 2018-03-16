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
  styleUrls: ["./app.component.css"],
  template: `
    <div>
      <app-repository-dashboard></app-repository-dashboard>
    </div>
  `
})
export class AppComponent {
  constructor() {}
}

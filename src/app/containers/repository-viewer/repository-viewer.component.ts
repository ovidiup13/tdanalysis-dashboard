import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DataService } from "../../services/data-service.service";
import { Observable } from "rxjs/Observable";
import { Stats } from "../../models/stats.interface";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-repository-viewer",
  templateUrl: "./repository-viewer.component.html",
  styleUrls: ["./repository-viewer.component.css"]
})
export class RepositoryViewerComponent implements OnInit {
  workEffortData: Stats[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((data: Params) => {
          return this.dataService.getTicketStats(data.id);
        })
      )
      .subscribe((data: Stats[]) => {
        this.workEffortData = data;
      });
  }
}

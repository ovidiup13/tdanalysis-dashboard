import { Component, OnInit } from "@angular/core";
import { Repository } from "../../models/repository.interface";
import { Observable } from "rxjs/Observable";
import { DataService } from "../../services/data-service.service";

@Component({
  selector: "app-repository-dashboard",
  templateUrl: "./repository-dashboard.component.html",
  styleUrls: ["./repository-dashboard.component.css"]
})
export class RepositoryDashboardComponent implements OnInit {
  repositories$: Observable<Repository[]>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.repositories$ = this.dataService.getRepositories();
  }
}

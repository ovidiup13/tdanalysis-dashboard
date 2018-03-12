import { Component, OnInit } from "@angular/core";
import { environment } from "../environments/environment.dev";
import { DataService } from "./services/data-service.service";
import { Repository } from "./models/repository.interface";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = " app";
  repository$: Observable<Repository>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.repository$ = this.dataService.getRepository("1");
  }
}

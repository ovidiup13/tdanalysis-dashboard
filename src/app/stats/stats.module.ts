import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// components
import { SimpleChartComponent } from "./components/simple-chart/simple-chart.component";
import { RepositoryDetailComponent } from "./components/repository-detail/repository-detail.component";

// services
import { DataService } from "./services/data-service.service";

// containers
import { RepositoryDashboardComponent } from "./containers/repository-dashboard/repository-dashboard.component";
import { RepositoryViewerComponent } from "./containers/repository-viewer/repository-viewer.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "repositories",
    children: [
      {
        path: "",
        component: RepositoryDashboardComponent
      },
      {
        path: ":id",
        component: RepositoryViewerComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [
    RepositoryDashboardComponent,
    RepositoryViewerComponent,
    RepositoryDetailComponent,
    SimpleChartComponent
  ],
  providers: [DataService]
})
export class StatsModule {}

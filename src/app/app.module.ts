import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

// components
import { AppComponent } from "./containers/app.component";
import { NotFoundComponent } from "./not-found.component";
import { SimpleChartComponent } from "./components/simple-chart/simple-chart.component";
import { RepositoryDetailComponent } from "./components/repository-detail/repository-detail.component";

// services
import { DataService } from "./services/data-service.service";

// containers
import { RepositoryDashboardComponent } from "./containers/repository-dashboard/repository-dashboard.component";
import { RepositoryViewerComponent } from "./containers/repository-viewer/repository-viewer.component";

const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    pathMatch: "full" // match empty string
  },
  {
    path: "repositories/:id",
    component: RepositoryViewerComponent
  },
  {
    path: "**", // any routes that do not exist in the application
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SimpleChartComponent,
    RepositoryDashboardComponent,
    RepositoryDetailComponent,
    RepositoryViewerComponent
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

// components
import { AppComponent } from "./containers/app.component";

// services
import { DataService } from "./services/data-service.service";
import { SimpleChartComponent } from './components/simple-chart/simple-chart.component';
import { RepositoryDashboardComponent } from './containers/repository-dashboard/repository-dashboard.component';

@NgModule({
  declarations: [AppComponent, SimpleChartComponent, RepositoryDashboardComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}

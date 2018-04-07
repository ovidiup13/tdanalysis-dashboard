import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { LineChartComponent } from "./line-chart/line-chart.component";
import { ScatterChartComponent } from "./scatter-chart/scatter-chart.component";

@NgModule({
  imports: [CommonModule],
  declarations: [BarChartComponent, LineChartComponent, ScatterChartComponent],
  exports: [BarChartComponent, LineChartComponent, ScatterChartComponent]
})
export class ChartsModule {}

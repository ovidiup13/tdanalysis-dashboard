import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  Input,
  ViewChild,
  ElementRef
} from "@angular/core";

import * as Chart from "chart.js";

@Component({
  selector: "app-chart",
  template: `
  <div>
    <canvas class="chart" width="800" height="400" #chart></canvas>  
  </div>
  `
})
export class ChartComponent implements OnChanges, AfterViewInit {
  @Input() data: any;
  @Input() options: any;
  @Input() chartType: string;

  @ViewChild("chart") chart: ElementRef;

  scatterChart: Chart;

  constructor() {}

  initChart() {
    const canvas: HTMLCanvasElement = this.chart.nativeElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    this.scatterChart = new Chart(ctx, {
      type: this.chartType,
      data: this.data || [],
      options: this.options || {}
    });
  }

  ngAfterViewInit(): void {
    console.log("viewinit");
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes");
    if (this.scatterChart == null) {
      return;
    } else {
      if (changes.data != null && changes.data.currentValue != null) {
        this.scatterChart.data = changes.data.currentValue;
        this.scatterChart.update();
      }

      if (changes.options != null && changes.options.currentValue != null) {
        this.scatterChart.options = changes.options.currentValue;
        this.scatterChart.update();
      }
    }
  }
}

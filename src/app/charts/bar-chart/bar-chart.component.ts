import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild,
  AfterViewInit
} from "@angular/core";

import * as Chart from "chart.js";

@Component({
  selector: "app-bar-chart",
  template: `
    <div>
        <canvas class="chart" width="800" height="400" #barChart></canvas>
    </div>
  `
})
export class BarChartComponent implements OnChanges, AfterViewInit {
  // TODO: add better types
  @Input() data: any;
  @Input() options: any;

  @ViewChild("barChart") chart: ElementRef;

  barChart: Chart;

  constructor() {}

  ngAfterViewInit(): void {
    const canvas: HTMLCanvasElement = this.chart.nativeElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    this.barChart = new Chart(ctx, {
      type: "bar",
      data: [],
      options: {}
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const newData = changes.data.currentValue;
    const newOptions = changes.options.currentValue;

    if (newOptions != null) {
      console.log(newOptions);
      this.barChart.options = newOptions;
      this.barChart.update();
    }

    if (newData != null) {
      console.log(newData);
      this.barChart.data.datasets = newData;
      this.barChart.update();
    }
  }
}

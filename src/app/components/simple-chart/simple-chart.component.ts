import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";

import * as Chart from "chart.js";
import { Stats } from "../../models/stats.interface";

@Component({
  selector: "app-simple-chart",
  templateUrl: "./simple-chart.component.html",
  styleUrls: ["./simple-chart.component.css"]
})
export class SimpleChartComponent implements OnInit, OnChanges {
  @ViewChild("chart") chart: ElementRef;

  @Input() data: Stats[];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const dataChange = changes.data.currentValue;
    if (dataChange != null) {
      console.log("Create a new chart from data", dataChange);
      this.createChart(this.processData(dataChange));
    }
  }

  processData(data: Stats[]) {
    return data
      .filter((stat: Stats) => stat.workEffort < 400)
      .map((stat: Stats) => {
        return {
          x: stat.workEffort,
          y: stat.technicalDebt
        };
      });
  }

  createChart(data: any) {
    const canvas: HTMLCanvasElement = this.chart.nativeElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    const scatterChart = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Work Effort - Technical Debt Scatter",
            data: data
          }
        ]
      },
      options: {
        responsive: false,
        display: true,
        scales: {
          xAxes: [
            {
              type: "linear",
              position: "bottom"
            }
          ]
        }
      }
    });
  }
}

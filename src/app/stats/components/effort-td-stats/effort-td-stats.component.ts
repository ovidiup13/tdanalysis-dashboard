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
  selector: "app-effort-td-stats",
  templateUrl: "./effort-td-stats.component.html",
  styleUrls: ["./effort-td-stats.component.css"]
})
export class EffortTdStatsComponent implements OnInit, OnChanges {
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
    const result = data.map((stat: Stats) => {
      return {
        x: stat.workEffort,
        y: stat.technicalDebt
      };
    });

    const we = result.map(i => i.x);
    const we_mean = this.getMean(we);
    const we_std = this.getStandardDeviation(we_mean, we);
    console.log("Mean of work effort: ", we_mean);
    console.log("Std of work effort: ", we_std);

    const td = result.map(i => i.y);
    const td_mean = this.getMean(td);
    const td_std = this.getStandardDeviation(td_mean, td);
    console.log("Mean of technical debt: ", td_mean);
    console.log("Std of technical debt: ", td_std);

    //68–95–99.7 rule
    return result;
    // .filter(item => item.x < we_mean + we_std)
    // .filter(item => item.y < td_mean + td_std);
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
              scaleLabel: {
                display: true,
                labelString: "Work Effort (hours)"
              },
              type: "linear",
              position: "bottom"
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Technical Debt (count)"
              }
            }
          ]
        }
      }
    });
  }

  private getMean(data: number[]) {
    return data.reduce((n1, n2) => n1 + n2, 0) / data.length;
  }

  private getStandardDeviation(mean: number, data: number[]) {
    const variance = data.reduce(
      (previous, current) => Math.pow(mean - current, 2) + previous,
      0
    );
    return Math.sqrt(variance / data.length);
  }
}

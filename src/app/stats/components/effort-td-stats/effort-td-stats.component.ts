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
import { IssueStats, SimpleStats } from "../../models/stats.interface";

@Component({
  selector: "app-effort-td-stats",
  template: `
  <div>
    <div>
      <h4>Work Effort Stats</h4>
      <h6>Mean: <b>{{weStats?.mean | number:'1.1-3'}} hours</b></h6>
      <h6>Standard deviation: <b>{{weStats?.std | number:'1.1-3'}} hours</b></h6>
    </div>  
    <div>
      <h4>Technical Debt Stats</h4>
      <h6>Mean: <b>{{tdStats?.mean | number:'1.1-3'}} TD items</b></h6>
      <h6>Standard deviation: <b>{{tdStats?.std | number:'1.1-3'}} TD items</b></h6>
    </div>  
    <canvas class="chart" width="800" height="400" #chart></canvas>
  </div>
  `
})
export class EffortTdStatsComponent implements OnInit, OnChanges {
  @ViewChild("chart") chart: ElementRef;

  @Input() data: IssueStats[];

  constructor() {}

  tdStats: SimpleStats;
  weStats: SimpleStats;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const dataChange = changes.data.currentValue;
    if (dataChange != null) {
      console.log("Create a new chart from data", dataChange);
      this.createChart(this.processData(dataChange));
    }
  }

  processData(data: IssueStats[]) {
    const result = data.map((stat: IssueStats) => {
      return {
        x: stat.workEffort,
        y: stat.technicalDebt
      };
    });

    const we = result.map(i => i.x);
    const we_mean = this.getMean(we);
    this.weStats = {
      mean: we_mean,
      std: this.getStandardDeviation(we_mean, we)
    };

    const td = result.map(i => i.y);
    const td_mean = this.getMean(td);
    this.tdStats = {
      mean: td_mean,
      std: this.getStandardDeviation(td_mean, td)
    };

    //68–95–99.7 rule
    return result
      .filter(item => item.x < this.weStats.mean + this.weStats.std)
      .filter(item => item.y < this.tdStats.mean + this.tdStats.std);
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
            data: data,
            backgroundColor: "#f48942"
          }
        ]
      },
      options: {
        responsive: true,
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

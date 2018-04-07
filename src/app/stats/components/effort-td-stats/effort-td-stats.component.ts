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
import { StatsCalculator } from "../../helpers/stats-calculator";
import { constants } from "../../helpers/constants";

@Component({
  selector: "app-effort-td-stats",
  template: `
  <div>
    <div>
      <h4>Work Effort Stats</h4>
      <h6>Mean: <b>{{weStats?.mean | number:'1.1-3'}} hours</b></h6>
      <h6>Standard deviation: <b>{{weStats?.std | number:'1.1-3'}} hours</b></h6>
    </div>
    <app-scatter-chart [data]="dataset" [options]="options"></app-scatter-chart>
  </div>
  `
})
export class EffortTdStatsComponent implements OnChanges {
  @ViewChild("chart") chart: ElementRef;

  @Input() data: IssueStats[];

  tdStats: SimpleStats;
  weStats: SimpleStats;

  dataset: any;
  options: any = {
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
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const dataChange = changes.data.currentValue;
    if (dataChange != null) {
      this.dataset = this.processData(dataChange);
    }
  }

  processData(data: IssueStats[]) {
    // filter such that td is not null
    data = data.filter(item => item.tdStats != null);

    // get total work effort
    const workEffort = data.map(item => item.workEffort.hours);

    // get technical debt by severity
    const td = data.map(stat => stat.tdStats);
    const added = StatsCalculator.joinData(td.map(t => t.added), workEffort);
    const removed = StatsCalculator.joinData(
      td.map(t => t.removed),
      workEffort
    );
    const total = StatsCalculator.joinData(
      td.map(t => t.totalPain),
      workEffort
    );

    console.log(added, removed, total);

    return {
      datasets: [
        { label: "Added", data: added, backgroundColor: constants.colors.red },
        {
          label: "Removed",
          data: removed,
          backgroundColor: constants.colors.green
        },
        {
          label: "Total Pain",
          data: total,
          backgroundColor: constants.colors.blue
        }
      ]
    };
  }
}

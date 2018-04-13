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
import { IssueStats, SimpleStats, TDStats } from "../../models/stats.interface";
import { StatsCalculator } from "../../helpers/stats-calculator";
import { constants } from "../../helpers/constants";

interface Stats {
  title: string;
  stats: SimpleStats;
  metric: string;
}

@Component({
  selector: "app-effort-td-stats",
  template: `
  <div *ngIf="stats != null">
    <div *ngFor="let stat of stats">
      <h4>{{stat.title}}</h4>
      <h6>Mean: <b>{{stat.stats?.mean | number:'1.1-3'}} {{stat.metric}}</b></h6>
      <h6>Standard deviation: <b>{{stat.stats?.std | number:'1.1-3'}} {{stat.metric}}</b></h6>
    </div>
    <app-scatter-chart [data]="dataset" [options]="options"></app-scatter-chart>
  </div>
  `
})
export class EffortTdStatsComponent implements OnChanges {
  @Input() data: IssueStats[];

  stats: Stats[] = [];

  // chart datasets
  added: any;
  removed: any;
  total: any;

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
            labelString: "Technical Debt (items)"
          }
        }
      ]
    }
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    let data = changes.data.currentValue;
    if (data != null) {
      this.dataset = this.processData(data);
    }
  }

  processData(data: IssueStats[]) {
    // get total work effort
    let workEffort = data.map(item => item.workEffort.hours);
    const wes = StatsCalculator.computeStats(workEffort);
    this.stats.push({
      title: "Work Effort Stats",
      stats: wes,
      metric: "hours"
    });

    // make sure work effort is within one standard deviation from the mean
    data = data
      .filter(item => item.workEffort.hours <= wes.mean + wes.std)
      .filter(item => item.tdStats != null);

    const added = this.processDebt(data, {
      field: "added",
      title: "Technical Debt Added",
      metric: "items"
    });

    const removed = this.processDebt(data, {
      field: "removed",
      title: "Technical Debt Removed",
      metric: "items"
    });

    const total = this.processDebt(data, {
      field: "totalPain",
      title: "Technical Debt Total",
      metric: "items"
    });

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

  calculateWorkEffort() {}

  processDebt(data: IssueStats[], options: any) {
    // filter by greater than zero
    const filtered = data.filter(d => d.tdStats[options.field] > 0);
    const workEffort = filtered.map(d => d.workEffort.hours);
    const td = filtered.map(d => d.tdStats[options.field]);

    const tdStats = StatsCalculator.computeStats(
      data.map(d => d.tdStats[options.field])
    );

    this.stats.push({
      title: options.title,
      stats: tdStats,
      metric: options.metric
    });

    return StatsCalculator.joinData(td, workEffort);
  }
}

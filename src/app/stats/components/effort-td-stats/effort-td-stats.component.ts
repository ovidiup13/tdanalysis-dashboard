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

interface Stats {
  title: string;
  stats: SimpleStats;
}

@Component({
  selector: "app-effort-td-stats",
  template: `
  <div *ngIf="stats != null">
    <div *ngFor="let stat of stats">
      <h4>{{stat.title}}</h4>
      <h6>Mean: <b>{{stat.stats?.mean | number:'1.1-3'}} hours</b></h6>
      <h6>Standard deviation: <b>{{stat.stats?.std | number:'1.1-3'}} hours</b></h6>
    </div>
    <app-scatter-chart [data]="dataset" [options]="options"></app-scatter-chart>
  </div>
  `
})
export class EffortTdStatsComponent implements OnChanges {
  @ViewChild("chart") chart: ElementRef;

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
            labelString: "Technical Debt (count)"
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
    // filter such that td is not null
    data = data.filter(item => item.tdStats != null);

    // get total work effort
    let workEffort = data.map(item => item.workEffort.hours);
    const wes = StatsCalculator.computeStats(workEffort);
    this.stats.push({
      title: "Work Effort Stats",
      stats: wes
    });

    // make sure work effort is within one standard deviation from the mean
    data = data.filter(item => {
      return (
        // item.workEffort.hours >= this.wes.mean - this.wes.std &&
        item.workEffort.hours <= wes.mean + wes.std / 2
      );
    });

    // get technical debt by severity
    const td = data.map(stat => stat.tdStats);

    // split by added, removed, total
    const addedTD = td.map(t => t.added);
    this.stats.push({
      title: "Added Technical Debt Stats",
      stats: StatsCalculator.computeStats(addedTD)
    });
    const removedTD = td.map(t => t.removed);
    this.stats.push({
      title: "Removed Technical Debt Stats",
      stats: StatsCalculator.computeStats(removedTD)
    });
    const totalTD = td.map(t => t.totalPain);
    this.stats.push({
      title: "Total Technical Debt Stats",
      stats: StatsCalculator.computeStats(totalTD)
    });

    // // compute stats
    // this.addedStats = StatsCalculator.computeStats(addedTD);
    // this.removedStats = StatsCalculator.computeStats(removedTD);
    // this.totalStats = StatsCalculator.computeStats(totalTD);

    // update work effort
    workEffort = data.map(item => item.workEffort.hours);

    // join work effort and TD data in a format to display by chart
    const added = StatsCalculator.joinData(addedTD, workEffort);
    const removed = StatsCalculator.joinData(removedTD, workEffort);
    const total = StatsCalculator.joinData(totalTD, workEffort);

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

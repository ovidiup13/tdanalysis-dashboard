import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { IssueStats, SimpleStats } from "../../models/stats.interface";
import { StatsCalculator } from "../../helpers/stats-calculator";
import { constants } from "../../helpers/constants";

@Component({
  selector: "app-td-stats",
  template: `
    <div>
      <div>
        <h4>Technical Debt Stats</h4>
        <h6>Mean: <b>{{tdStats?.mean | number:'1.1-3'}} TD items</b></h6>
        <h6>Standard deviation: <b>{{tdStats?.std | number:'1.1-3'}} TD items</b></h6>
      </div>      
      <app-chart [data]="dataset" [options]="options" [chartType]="'line'"></app-chart>
    </div>
  `
})
export class TdStatsComponent implements OnChanges {
  @Input() data: IssueStats[];

  dataset: any;
  options: any;

  tdStats: SimpleStats;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const newData = changes.data.currentValue;
    if (newData != null) {
      this.dataset = this.processData(newData);
    }
  }

  private processData(stats: IssueStats[]) {
    stats = stats.filter(stat => stat.tdStats != null);

    const labels = stats.map(issue => issue.issueKey);
    const td = stats.map(issue => issue.tdStats);
    const all = td.map(t => t.totalPain);

    const td_mean = StatsCalculator.getMean(all);
    this.tdStats = {
      mean: td_mean,
      std: StatsCalculator.getStandardDeviation(td_mean, all)
    };

    const high = td.map(t => (t == null ? 0 : t.high));
    const medium = td.map(t => (t == null ? 0 : t.medium));
    const low = td.map(t => (t == null ? 0 : t.low));

    return {
      labels: labels,
      datasets: [
        {
          label: "High Priority",
          data: high,
          borderColor: constants.colors.red,
          fill: false
        },
        {
          label: "Medium Priority",
          data: medium,
          borderColor: constants.colors.orange,
          fill: false
        },
        {
          label: "Low Priority",
          data: low,
          borderColor: constants.colors.yellow,
          fill: false
        }
      ]
    };
  }
}

import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { IssueStats, SimpleStats } from "../../models/stats.interface";
import { StatsCalculator } from "../../helpers/stats-calculator";

@Component({
  selector: "app-td-stats",
  template: `
    <div>
      <div>
        <h4>Technical Debt Stats</h4>
        <h6>Mean: <b>{{tdStats?.mean | number:'1.1-3'}} TD items</b></h6>
        <h6>Standard deviation: <b>{{tdStats?.std | number:'1.1-3'}} TD items</b></h6>
      </div>      
      <app-line-chart [data]="dataset" [options]="options"></app-line-chart>
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

    // const td_mean = StatsCalculator.getMean(data);
    // this.tdStats = {
    //   mean: td_mean,
    //   std: StatsCalculator.getStandardDeviation(td_mean, data)
    // };

    const high = td.map(t => (t == null ? 0 : t.high));
    const medium = td.map(t => (t == null ? 0 : t.medium));
    const low = td.map(t => (t == null ? 0 : t.low));

    return {
      labels: labels,
      datasets: [
        {
          label: "High Priority",
          data: high,
          borderColor: "#FF4136",
          fill: false
        },
        {
          label: "Medium Priority",
          data: medium,
          borderColor: "#FF851B",
          fill: false
        },
        {
          label: "Low Priority",
          data: low,
          borderColor: "#FFDC00",
          fill: false
        }
      ]
    };
  }
}

import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import {
  IssueStats,
  SimpleStats,
  TechnicalDebt
} from "../../models/stats.interface";
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
  @Input() data: TechnicalDebt[];

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

  private processData(stats: TechnicalDebt[]) {
    const all = stats.map(t => t.totalCount);

    const labels = stats.map((v, index) => index);
    const td_mean = StatsCalculator.getMean(all);
    this.tdStats = {
      mean: td_mean,
      std: StatsCalculator.getStandardDeviation(td_mean, all)
    };

    const high = stats.map(s => s.highCount);
    const medium = stats.map(s => s.mediumCount);
    const low = stats.map(s => s.lowCount);

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

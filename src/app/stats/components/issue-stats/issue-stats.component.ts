import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { IssueStats } from "../../models/stats.interface";

@Component({
  selector: "app-issue-stats",
  template: `
    <div>
      <app-chart [data]="issueData" [options]="options" [chartType]="'bar'"></app-chart>
    </div>
  `
})
export class IssueStatsComponent implements OnChanges {
  @Input() issueStats: IssueStats[];

  issueData: any;
  options: any = {
    responsive: true,
    title: {
      display: true,
      name: "Number of commits per issue"
    },
    scales: {
      xAxes: [
        {
          display: true
        }
      ],
      yAxes: [
        {
          display: true,
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: "Number of commits"
          }
        }
      ]
    }
  };

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const dataChanges = changes.issueStats.currentValue;
    if (dataChanges != null) {
      this.issueData = this.processData(dataChanges);
    }
  }

  private processData(stats: IssueStats[]) {
    const labels = ["1 commit", "2-5 commits", "5-10 commits", "10+ commits"];

    const single = stats.filter(stat => stat.totalCommits === 1).length;

    const double = stats.filter(
      stat => stat.totalCommits >= 2 && stat.totalCommits < 5
    ).length;

    const triple = stats.filter(
      stat => stat.totalCommits >= 5 && stat.totalCommits < 10
    ).length;

    const quadruple = stats.filter(stat => stat.totalCommits >= 10).length;

    return {
      labels: labels,
      datasets: [
        {
          label: "Commits",
          data: [single, double, triple, quadruple],
          backgroundColor: "#f48942"
        }
      ]
    };
  }
}

import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { Repository } from "../../models/repository.interface";
import { CommitStats } from "../../models/stats.interface";

@Component({
  selector: "app-commit-stats",
  template: `
    <div>
      <app-bar-chart [data]="dataset" [options]="chartOptions"></app-bar-chart>
    </div>
  `,
  styleUrls: ["./commit-stats.component.css"]
})
export class CommitStatsComponent implements OnChanges {
  @Input() data: CommitStatsComponent;

  dataset: any;
  chartOptions: any = {
    responsive: true,
    title: {
      display: true,
      name: "Commits with and without issues"
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
          }
        }
      ]
    }
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const newData = changes.data.currentValue;
    if (newData != null) {
      this.dataset = this.processData(newData);
    }
  }

  processData(stats: CommitStats) {
    const labels = ["with tickets", "without tickets"];
    const data = [stats.commitsWithIssues, stats.commitsWithoutIssues];
    return {
      labels: labels,
      datasets: [{ label: "Commits", data: data, backgroundColor: "#f48942" }]
    };
  }
}

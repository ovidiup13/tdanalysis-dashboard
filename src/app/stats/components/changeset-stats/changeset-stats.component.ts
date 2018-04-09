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
  selector: "app-changeset-stats",
  template: `
    <div>
      <app-scatter-chart [data]="dataset" [options]="options"></app-scatter-chart>
    </div>
  `
})
export class ChangesetStatsComponent implements OnChanges {
  @Input() data: IssueStats[];

  constructor() {}

  dataset: any;
  options: any = {
    responsive: true,
    display: true,
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Changes (LOC)"
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

  ngOnChanges(changes: SimpleChanges): void {
    let data = changes.data.currentValue;
    if (data != null) {
      this.dataset = this.processData(data);
    }
  }

  processData(data: IssueStats[]) {
    // filter such that td is not null
    data = data.filter(item => item.tdStats != null);

    // get technical debt by severity
    const td = data.map(stat => stat.tdStats);
    const totalTD = td.map(t => t.totalPain);

    // get change set by added, deleted, modified and total
    const changeSets = data.map(stat => stat.changeSetStats);

    const additions = StatsCalculator.joinData(
      changeSets.map(change => change.additions),
      totalTD
    );
    const deletions = StatsCalculator.joinData(
      changeSets.map(change => change.deletions),
      totalTD
    );
    const modifications = StatsCalculator.joinData(
      changeSets.map(change => change.modifications),
      totalTD
    );
    const total = StatsCalculator.joinData(
      changeSets.map(change => change.totalChanges),
      totalTD
    );

    return {
      datasets: [
        {
          label: "Additions",
          data: additions,
          backgroundColor: constants.colors.green
        },
        {
          label: "Deletions",
          data: deletions,
          backgroundColor: constants.colors.red
        },
        {
          label: "Modifications",
          data: modifications,
          backgroundColor: constants.colors.yellow
        },
        {
          label: "Total Changes",
          data: total,
          backgroundColor: constants.colors.blue
        }
      ]
    };
  }
}

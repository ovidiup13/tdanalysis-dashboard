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
import {
  IssueStats,
  SimpleStats,
  ChangeTD
} from "../../models/stats.interface";
import { StatsCalculator } from "../../helpers/stats-calculator";
import { constants } from "../../helpers/constants";
import { StaticSymbol } from "@angular/compiler";

@Component({
  selector: "app-changeset-stats",
  template: `
    <div>
      <app-chart [data]="dataset" [options]="options" [chartType]="'scatter'"></app-chart>
    </div>
  `
})
export class ChangesetStatsComponent implements OnChanges {
  @Input() data: ChangeTD[];

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

  processData(data: ChangeTD[]) {
    // filter such that td is not null
    data = data.filter(item => item.technicalDebt != null);

    console.log(data.length);

    // get technical debt by severity
    let td = data.map(stat => stat.technicalDebt);
    let totalTD = td.map(t => t.totalPain);

    // get change set by added, deleted, modified and total
    const changeSets = data.map(stat => stat.changeSet);

    const additions = this.processChanges(data, "additions");
    const deletions = this.processChanges(data, "deletions");
    const modifications = this.processChanges(data, "modifications");
    const total = this.processChanges(data, "totalChanges");

    // const additions = StatsCalculator.joinData(
    //   totalTD,
    //   changeSets.map(change => change.additions)
    // );
    // const deletions = StatsCalculator.joinData(
    //   totalTD,
    //   changeSets.map(change => change.deletions)
    // );
    // const modifications = StatsCalculator.joinData(
    //   totalTD,
    //   changeSets.map(change => change.modifications)
    // );
    // const total = StatsCalculator.joinData(
    //   totalTD,
    //   changeSets.map(change => change.totalChanges)
    // );

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

  processChanges(data: ChangeTD[], field: string) {
    let fieldData = data.map(change => change.changeSet[field]);
    const stats = StatsCalculator.computeStats(fieldData);
    const filtered = data.filter(
      change => change.changeSet[field] <= stats.mean + stats.std
    );

    fieldData = filtered.map(stat => stat.changeSet[field]);
    const totalTD = filtered.map(change => change.technicalDebt.totalPain);

    return StatsCalculator.joinData(fieldData, totalTD);
  }
}

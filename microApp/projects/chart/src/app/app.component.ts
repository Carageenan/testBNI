import { Component, OnInit } from "@angular/core";
import { Chart, registerables } from "chart.js";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    Chart.register(...registerables);
    this.renderChart();
  }

  renderChart() {
    const myChart = new Chart("barChart", {
      type: "bar",
      data: {
        labels: ["2006", "2007", "2008", "2009", "2010", "2011", "2012"],
        datasets: [
          { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
          { data: [28, 48, 40, 19, 86, 27, 90], label: "Series B" },
        ],
      },
    });
  }
}

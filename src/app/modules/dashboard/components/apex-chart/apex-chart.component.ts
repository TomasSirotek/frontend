import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexTooltip, NgApexchartsModule } from "ng-apexcharts";

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";
import { DashboardServiceService } from '../../service/dashboard-service.service';
import { State } from 'src/app/shared/state';
import { DashboardData } from '../../models/DashboardData';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-apex-chart',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './apex-chart.component.html',
  styleUrls: ['./apex-chart.component.scss']
})

export class ApexChartComponent implements OnInit{

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  data: DashboardData[] = [];
  

  temp = [];
  isLoading: boolean = false;

  ngOnInit() {
   
   
  }
  
  async fetchData(boxService: DashboardServiceService, state: State) {
    this.isLoading = true;
  
    try {
      // Await the result of the API call and assign it to this.data
      this.data = await boxService.getChartData();
  
      // Assign the fetched data to the state
      state.chartData = this.data;
      
      
      setTimeout(() => {
        this.processData()
        this.isLoading = false;
      }, 500);
    } catch (error) {
      // Handle the error
  
    }
  }

  constructor(private state: State,private dashboardService: DashboardServiceService) {
    this.fetchData(dashboardService,state);
  }

  ngOnDestroy() {
  }

  processData() {
    // Initialize an array to hold the total sales for each month (initially all zeros)
    const monthlySales = Array(12).fill(0);
    
    // Initialize an array to hold the box names for each month
    const monthlyBoxNames = Array(12).fill([]);
  
    // Loop through the data to accumulate total sales and box names for each month
    this.data.forEach((item) => {
      const date = new Date(item.orderDate);
      const month = date.getMonth();
      const totalSales = item.totalSales;
      const boxTitle = item.boxTitle;
  
      // Accumulate total sales
      monthlySales[month] += totalSales;
  
      // Add box name to the corresponding month's array
      monthlyBoxNames[month].push(boxTitle);
    });
  
    // Create the chartOptions using the accumulated monthly sales data
    this.chartOptions = {
      series: [
        {
          name: "Total Sales",
          data: monthlySales
        }
      ],
      chart: {
        height: 350,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: 'top'
          }
        }
      },
      yaxis: {
        title: {
          text: "EUR (hunders)"
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + ' EUR';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758']
        }
      },
      xaxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        labels: {
          formatter: function (val) {
            return val;
          }
        }
      },
      tooltip: {
        custom: function({ series, seriesIndex, dataPointIndex }) {
          const monthBoxNames = monthlyBoxNames[dataPointIndex].slice(0, 10).join(', '); // Limit to 10 box names
    
          return `
            <div style="background: #fff; border: 1px solid #ccc; padding: 10px; border-radius: 5px;">

              <div><strong>Box this month sold:</strong></div>
              <ul style="list-style-type: disc; margin-left: 20px; padding-left: 0;">
                ${monthBoxNames.split(', ').map(name => `<li>${name}</li>`).join('')}
              </ul>
            </div>
          `;
        }
      }
    };
  }
  


}





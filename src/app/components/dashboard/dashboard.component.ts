import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  email: string | undefined;

  constructor() { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createWebsiteVisitsChart();
    this.createUsersChart();
    this.email = localStorage.getItem("user") ?? "";

  }

  public websiteVisitsChart: any;
  public UsersChart: any;

  createWebsiteVisitsChart() {
    this.websiteVisitsChart = new Chart("websiteVisitsChart", {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: "Website Visits",
            data: [1000, 1200, 1500, 2000, 1800, 2200, 2500, 2300, 1900, 2400, 1700, 1100],
            borderColor: 'rgb(0, 128, 128)', // Teal color
            backgroundColor: 'rgba(0, 128, 128, 0.2)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(0, 128, 128)',
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            }
          },
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            }
          }
        },
        plugins: {
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            bodyFont: {
              size: 14,
            },
            titleFont: {
              size: 16,
              weight: 'bold',
            }
          },
          legend: {
            labels: {
              font: {
                size: 14,
              }
            }
          }
        }
      }
    });
  }
  

  createUsersChart(){
  
    this.UsersChart = new Chart("UsersChart", {
      type: 'bar', 
      data: {
        labels: [
          '2034-02-01', '2034-02-02', '2034-02-03', '2034-02-04',
          '2034-02-05', '2034-02-06', '2034-02-07', '2034-02-08'
        ], 
        datasets: [
          {
            label: "New Users",
            data: ['467','576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: 'purple' 
          },
          {
            label: "Time Spent (minutes)",
            data: ['542', '542', '536', '327', '17', '30', '538', '541'],
            backgroundColor: 'orange' 
          }  
        ]
      },
      options: {
        aspectRatio: 2.5
      }   
    });
    
  }
}

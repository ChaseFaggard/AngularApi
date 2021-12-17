import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Range } from '../range';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit { 

  range:Range = Range.MONTH

  tickerName: string = 'Nabors Industries Ltd.'

  apiData: any

  labels:string[] = []

  dataSet: any[] = []

  chartData: any

  options: any

  colors = {
    purple: {
      default: "rgba(99, 102, 241, 1)",
      half: "rgba(99, 102, 241, .75)",
      quarter: "rgba(99, 102, 241, .40)",
      zero: "rgba(99, 102, 241, .1)"
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)"
    }
  }

  gradient: any

  constructor(private api:ApiService) { }

  public get Range(): typeof Range { return Range }

  ngOnInit(): void {

    const ctx = (<HTMLCanvasElement> document.getElementById("canvas"))!.getContext("2d");
    ctx!.canvas.height = 100;
    
    this.gradient = ctx!.createLinearGradient(0, 25, 0, 300);
    this.gradient.addColorStop(0, this.colors.purple.half);
    this.gradient.addColorStop(0.35, this.colors.purple.quarter);
    this.gradient.addColorStop(1, this.colors.purple.zero);

    this.api.getStockData('NBR').then((response:any) => {
      this.setChartData(response)
    }).catch(console.log)

  }

  delete():void {
    this.chartData = null
  }

  setChartData(data: any):void {
    this.apiData = data
    this.labels = []
    this.dataSet = []
    const oneMonthDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate())
    const sixMonthDate = new Date(new Date().getFullYear(), new Date().getMonth() - 5, new Date().getDate())
    const oneYearDate = new Date(new Date().getFullYear()-1, new Date().getMonth()-1, new Date().getDate())
    for(let [i,item] of data.results.entries()) {
      const date = new Date(item.t)
      let addItem:boolean = false, addLabel:boolean = false
      let label = ''
      switch(this.range) {
        case Range.MONTH: 
          if(date > oneMonthDate) {
            addItem = true
            addLabel = true
            label = `${date.toLocaleString('en-us', { month: 'short' })} ${date.getDate()}`
          }
          break;
        case Range.MONTH_6:
          if(date > sixMonthDate) {
            addItem = true
            if(i%4 == 0) {
              addLabel = true
              label = `${date.toLocaleString('en-us', { month: 'short' })} '${date.getFullYear().toString().substr(-2)}`
            }
          }
          break;
        case Range.YEAR:
          if(date > oneYearDate) {
            addItem = true
            if(i%8 == 0) {
              addLabel = true
              label = `${date.toLocaleString('en-us', { month: 'short' })} '${date.getFullYear().toString().substr(-2)}`
            }
          }
          break;
        default:
      }
      if(addItem) this.dataSet.push(item.c)
      if(addLabel) this.labels.push(label)
      
    }
    this.chartData = {
      labels: this.labels,
      datasets: [
          {
            fill: true,
            backgroundColor: this.gradient,
            pointBackgroundColor: this.colors.purple.default,
            borderColor: this.colors.purple.default,
            data: this.dataSet,
            lineTension: .3,
            borderWidth: 2,
            pointRadius: 3
          }
      ]
    }
    this.options = {
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: this.tickerName,
          color: this.colors.purple.half,
          font: {
            size: 32,
            weight: 'normal'
          },
          padding: {
            bottom: 20
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: this.colors.indigo.default,
            padding: 10,
            font: {
              size: 17,
            }
          }
        },
        y: {
          title: {
            text: 'USD',
            display: false,
            color: this.colors.purple.half,
            font: {
              size: 15
            }
          },
          grid: {
            display: true,
            circular: true,
            drawBorder: false,
            lineWidth: 0.75,
            color: this.colors.indigo.quarter,
          },
          ticks: {
            color: this.colors.indigo.default,
            padding: 10,
            font: {
              size: 15
            },
            callback: function(val:number, index:number):string {
              // Hide the label of every 2nd dataset
              return index%2==0 ? '$'+val : ''
            },
          }
        }
      }
     
    }
  
  }

  setRange(range:Range):void {
    this.range = range
    this.setChartData(this.apiData)
  }

}

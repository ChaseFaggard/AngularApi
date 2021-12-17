import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { FilterService } from "primeng/api";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() updateChart = new EventEmitter()
  @Output() tickerName = new EventEmitter()
  @Input() checked: boolean = false

  selectedTicker: any /* Stores string search object or if selected the ticker object */

  previousSearch: string = '' /* Don't recall the api if the last search was the same... */

  filteredTickers: any[] = [] /* Stores array of tickers based on search */

  tickers: any[] = [] /* Stores all tickers retrieved from databased given the selectedTicker search */

  constructor(
    private api:ApiService, 
    private filter:FilterService) { }

  ngOnInit(): void { 
    
  }

  filterTickers(event:any):void {
    let filtered: any[] = []
    let query = event.query
    for(let ticker of this.tickers) {
      if(ticker.name.toLowerCase().indexOf(query.toLowerCase()) == 0
      || ticker.ticker.toLowerCase().indexOf(query.toLowerCase()) == 0) filtered.push(ticker)
    }
    this.filteredTickers = filtered
  }

  getTickers() {
    if(this.selectedTicker.length == 1 && this.selectedTicker !== this.previousSearch) {
      this.getTickersData(this.selectedTicker)
      this.previousSearch = this.selectedTicker
    }
  }

  getTickersData(search:string) {
    this.api.getTickers(search).then((response:any) => {
      this.tickers = response
    }).catch(console.log)
  }

  submit() {
    if(this.selectedTicker) {
      let search:string = '', tickName:string = ''
      if(typeof this.selectedTicker == 'string') {
        search = this.selectedTicker.toUpperCase()
        tickName = this.selectedTicker.toUpperCase()
      }
      else {
        search = this.selectedTicker.ticker
        tickName = this.selectedTicker.name
      }
      this.api.getStockData(search).then((response:any) => {
        if(response) {
          this.tickerName.emit(tickName)
          this.updateChart.emit(response)
        }
        else console.log('API Response was null')
      }).catch(console.log)
    }
  }

}

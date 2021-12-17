import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private key:string = 'SsP3Ogx6Z5jR4hfQ_eyw7OhQqjSdMtOP'

  constructor(private http:HttpClient, private storage:LocalStorageService) { }

  public getStockData(ticker:string) {
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    const lastWeek = new Date(today.getTime() - (60*60*24*7*52*1000))
    const lastWeekStr = lastWeek.toISOString().split('T')[0]
    if(!this.storage.checkTimeCreated('stocks', 1) && !this.storage.checkModifiedAmount('stocks', 5)) {
      console.log('Too many API calls, using local data only')
      return new Promise((resolve) => { resolve(this.storage.getData('stocks')) })
    }
    return new Promise((resolve,reject)=> {
      this.http.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/week/${lastWeekStr}/${todayStr}?adjusted=true&sort=asc&limit=5000&apiKey=${this.key}`).subscribe(
        (res:any)=> { 
          console.log('Retrieving Stock Data from API')

          if(this.storage.checkTimeCreated('stocks', 1)) this.storage.setData('stocks', res)
          else this.storage.updateData('stocks', res)

          resolve(res) 
          
        }, (err)=> { reject(err) }
      )
    })
  }

  public getTickers(search:string) {
    if(!this.storage.checkTimeCreated('tickers', 1) && !this.storage.checkModifiedAmount('tickers', 5)) {
      console.log('Too many API calls, using local data only')
      return new Promise((resolve) => { resolve(this.storage.getData('tickers')) })
    }
    return new Promise((resolve,reject)=> {
      this.http.get(`https://api.polygon.io/v3/reference/tickers?search=${search}&active=true&sort=ticker&order=asc&limit=1000&apiKey=${this.key}`).subscribe(
        (res:any)=> { 
          console.log('Retrieving Ticker Data from API')
          const results = res.results
          if(this.storage.checkTimeCreated('tickers', 1)) {
            this.storage.setData('tickers', results)
            resolve(results) 
          }
          else {
            this.storage.updateData('tickers', this.storage.getData('tickers').concat(results))
            resolve(this.storage.getData('tickers'))
          }
          
        }, (err)=> { reject(err) }
      )
    })
  }

}
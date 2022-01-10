import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private key:string = 'SsP3Ogx6Z5jR4hfQ_eyw7OhQqjSdMtOP'

  constructor(private http:HttpClient, private storage:LocalStorageService) { }

  public getStockData(ticker:string): Observable<any> {
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    const lastWeek = new Date(today.getTime() - (60*60*24*7*52*1000))
    const lastWeekStr = lastWeek.toISOString().split('T')[0]
    return new Observable((observer: any)=> {
      this.http.get<Object>(this.getStockDataURL(ticker))
      .subscribe((response: any) => observer.next(response.results))
    })
  }

  public getTickers(search:string): Observable<any[]> {
    return new Observable<any[]>((observer: any) => {
      this.http.get<Object>(this.getTickersURL(search))
      .subscribe((response: any) => observer.next(response.results))
    })
  }

  public getTickersURL(search: string): string {
    return `https://api.polygon.io/v3/reference/tickers?search=${search}&active=true&sort=ticker&order=asc&limit=1000&apiKey=${this.key}`
  }

  public getStockDataURL(ticker: string): string {
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    const lastWeek = new Date(today.getTime() - (60*60*24*7*52*1000))
    const lastWeekStr = lastWeek.toISOString().split('T')[0]
    return `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/week/${lastWeekStr}/${todayStr}?adjusted=true&sort=asc&limit=5000&apiKey=${this.key}`
  }

}
/* !! AS OF NOW, THIS SERVICE IS NOT IN USE */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setData(key:string, data: any) {
    localStorage.setItem(key, JSON.stringify({
      data: data,
      timeCreated: new Date().getTime(),
      modifiedAmount: 0
    }))
  }

  updateData(key:string, data: any) {
    if(this.hasStorageItem(key)) {
      localStorage.setItem(key, JSON.stringify({
        data: data,
        timeCreated: this.getTimeCreated(key),
        modifiedAmount: this.getModifiedAmount(key)+1
      }))
    }
  }

  hasStorageItem(key:string): boolean {
    return localStorage.getItem(key) != undefined
  }

  getStorageItem(key:string): StorageData {
    return JSON.parse(<string>localStorage.getItem(key))
  }

  getData(key:string): any {
    if(!this.hasStorageItem(key)) return null
    return this.getStorageItem(key).data
  }

  getTimeCreated(key:string): number {
    return this.getStorageItem(key).timeCreated
  }

  getModifiedAmount(key:string): number {
    return this.getStorageItem(key).modifiedAmount
  }

  /* Returns true if local storage of key was saved after @param minutes have passed */
  checkTimeCreated(key:string, minutes:number) {
    if(!this.hasStorageItem(key)) return true
    return (new Date().getTime() - this.getTimeCreated(key)) > (60 * 1000 * minutes)
  }

  /* Returns true if we can modify again given @param amount of modifications allowed */
  checkModifiedAmount(key:string, amount:number) {
    if(!this.hasStorageItem(key)) return true
    return amount - this.getModifiedAmount(key)+1 > 0
  }

}


type StorageData = {
  data: any,
  timeCreated: number,
  modifiedAmount: number /* Amount of times the data as been updated */
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ChartModule } from 'primeng/chart'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { InputSwitchModule } from 'primeng/inputswitch'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ChartComponent } from './chart/chart.component'
import { SearchComponent } from './search/search.component'

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AutoCompleteModule,
    FormsModule,
    HttpClientModule,
    ChartModule,
    InputSwitchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

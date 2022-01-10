import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from '../api.service';

import { ChartComponent } from './chart.component';

import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    //httpTestingController.verify();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    /*const req = httpTestingController.expectOne('')
    expect(req.request.method).toEqual("GET")
    req.flush([]) */
    expect(component).toBeTruthy();
  });
});

import { TestBed, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Store, select } from '@ngrx/store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { IAppState } from './store/state';
import { appReducers } from './store/reducers';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { OrdersHistoryCommunicationService } from './services/orders-history.communication.service';
import { OrdersActiveCommunicationService } from './services/orders-active.communication.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterTestingModule,
        StoreModule.forRoot(appReducers),
        HttpClientModule,
        //OrdersHistoryCommunicationService,
        //OrdersActiveCommunicationService
      ],
      declarations: [
        AppComponent
      ],
      providers: [HttpClientModule, HttpClient]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'projectwork'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('projectwork');
  });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to projectwork!');
  // });
  it(`should response on History request`, (done) => {
    const service: OrdersHistoryCommunicationService = TestBed.get(OrdersHistoryCommunicationService);
    service.historyRequest.subscribe(criteria => {
      expect(criteria).toEqual("criteria");
      done();
    })
    service.request("criteria");
  });
  it(`should response on History response`, (done) => {
    const service: OrdersHistoryCommunicationService = TestBed.get(OrdersHistoryCommunicationService);
    service.historyResponse.subscribe(() => {
      expect(true).toEqual(true);
      done();
    })
    service.response("test");
  });
  it(`should response on Active Orders request`, (done) => {
    const service: OrdersActiveCommunicationService = TestBed.get(OrdersActiveCommunicationService);
    service.ordersRequest.subscribe(() => {
      expect(true).toBe(true);
      done();
    })
    service.request();
  });
  it(`should response on Active Orders response`, (done) => {
    const service: OrdersActiveCommunicationService = TestBed.get(OrdersActiveCommunicationService);
    service.ordersResponse.subscribe((data) => {
      expect(data).toEqual("test");
      done();
    })
    service.response("test");
  });
});

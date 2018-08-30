// tslint:disable no-unbound-method

import { fakeAsync, TestBed, ComponentFixture, tick } from '@angular/core/testing';
import { DtTabNavigationAdapter, DtTabsModule, DtTabRouterFragmentAdapter } from '@dynatrace/angular-components';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationStrategy, Location } from '@angular/common';
import { Component } from '@angular/core';

describe('DtTabNavigationAdapter', () => {

  let fixture: ComponentFixture<TabComponent>;
  let adapter: DtTabNavigationAdapter;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DtTabsModule,
        RouterTestingModule.withRoutes([{ path: '', component: TabComponent }]),
      ],
      declarations: [ TabComponent, AppComponent ],
      providers: [
        { provide: DtTabNavigationAdapter,
          useClass: DtTabRouterFragmentAdapter,
          deps: [Router, ActivatedRoute, Location, LocationStrategy],
        },
      ],
    });
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(AppComponent);
  });

  describe('adapter functions', () => {
    beforeEach(fakeAsync(() => {
      adapter = TestBed.get(DtTabNavigationAdapter);
    }));

    it('should register a tabgroup with the adapter after creation', fakeAsync(() => {
      spyOn(adapter, 'registerTabControl');
      router.initialNavigation();
      tick();
      fixture.detectChanges();
      expect(adapter.registerTabControl).toHaveBeenCalledTimes(1);
    }));

    it('should unregister a tabgroup with the adapter after destroy', fakeAsync(() => {
      spyOn(adapter, 'unregisterTabControl');
      router.initialNavigation();
      tick();
      fixture.detectChanges();
      fixture.destroy();
      expect(adapter.unregisterTabControl).toHaveBeenCalledTimes(1);
    }));
  });
});

@Component({
  template:
  `<dt-tab-group dtTabGroupNavigation>
    <dt-tab id="traffic">
      <ng-template dtTabLabel>Traffic</ng-template>
      <ng-template dtTabContent>
        <h1>Traffic</h1>
      </ng-template>
    </dt-tab>
    <dt-tab id="quality">
      <ng-template dtTabLabel>Quality</ng-template>
      <ng-template dtTabContent>
        <h1>Quality</h1>
      </ng-template>
    </dt-tab>
  </dt-tab-group>`,
})
export class TabComponent {}

@Component({
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
}
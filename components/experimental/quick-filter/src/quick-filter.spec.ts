/**
 * @license
 * Copyright 2020 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// tslint:disable no-lifecycle-call no-use-before-declare no-magic-numbers
// tslint:disable no-any max-file-line-count no-unbound-method use-component-selector

import { Component, DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  DtQuickFilter,
  DtQuickFilterModule,
} from '@dynatrace/barista-components/experimental/quick-filter';

import { createComponent } from '@dynatrace/barista-components/testing';
import { mockIconTestingModule } from '@dynatrace/barista-components/testing/mock';
import {
  DtFilterFieldDefaultDataSource,
  DtFilterField,
} from '@dynatrace/barista-components/filter-field';

describe('dt-quick-filter', () => {
  let instanceDebugElement: DebugElement;
  let quickFilterInstance: DtQuickFilter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DtQuickFilterModule,
        NoopAnimationsModule,
        mockIconTestingModule(),
      ],
      declarations: [QuickFilterSimpleComponent, QuickFilterDefaultComponent],
    });
    TestBed.compileComponents();
  });

  describe('Simple QuickFilter without dataSource', () => {
    let fixture: ComponentFixture<QuickFilterSimpleComponent>;
    beforeEach(() => {
      fixture = createComponent(QuickFilterSimpleComponent);
      instanceDebugElement = fixture.debugElement.query(
        By.directive(DtQuickFilter),
      );
      quickFilterInstance = instanceDebugElement.injector.get<DtQuickFilter>(
        DtQuickFilter,
      );
    });

    it('should have an empty filters array if no dataSource is set', () => {
      expect(quickFilterInstance.filters).toHaveLength(0);
    });
  });

  describe('Normal QuickFilter with mixed dataSource', () => {
    let fixture: ComponentFixture<QuickFilterDefaultComponent>;
    let filterFieldDebugElement: DebugElement;
    // let filterFieldInstance: DtFilterField;
    beforeEach(() => {
      fixture = createComponent(QuickFilterDefaultComponent);
      instanceDebugElement = fixture.debugElement.query(
        By.directive(DtQuickFilter),
      );
      quickFilterInstance = instanceDebugElement.injector.get<DtQuickFilter>(
        DtQuickFilter,
      );

      filterFieldDebugElement = fixture.debugElement.query(
        By.directive(DtFilterField),
      );
      // filterFieldInstance = filterFieldDebugElement.injector.get<DtFilterField>(
      //   DtFilterField,
      // );
    });

    it('should have an empty filters array if no dataSource is set', () => {
      expect(quickFilterInstance.filters).toHaveLength(0);
      quickFilterInstance.filters = [
        [DATA.autocomplete[0], DATA.autocomplete[0].autocomplete![0]],
      ];

      fixture.detectChanges();

      // expect(filterFieldDebugElement).toMatchSnapshot();
    });
  });
});

@Component({
  selector: 'dt-quick-filter-simple',
  template: `
    <dt-quick-filter></dt-quick-filter>
  `,
})
class QuickFilterSimpleComponent {}

@Component({
  selector: 'dt-quick-filter-simple',
  template: `
    <dt-quick-filter [dataSource]="_dataSource">
      <dt-quick-filter-title>Quick-filter</dt-quick-filter-title>
      <dt-quick-filter-sub-title>
        All options in the filter field above
      </dt-quick-filter-sub-title>

      my content
    </dt-quick-filter>
  `,
})
class QuickFilterDefaultComponent {
  _dataSource = new DtFilterFieldDefaultDataSource(DATA);
}

const DATA = {
  autocomplete: [
    {
      name: 'AUT',
      distinct: true,
      autocomplete: [{ name: 'Linz' }, { name: 'Vienna' }, { name: 'Graz' }],
    },
    {
      name: 'USA',
      autocomplete: [
        { name: 'San Francisco' },
        { name: 'Los Angeles' },
        { name: 'New York' },
        { name: 'Custom', suggestions: [] },
      ],
    },
    {
      name: 'Requests per minute',
      range: {
        operators: {
          range: true,
          equal: true,
          greaterThanEqual: true,
          lessThanEqual: true,
        },
        unit: 's',
      },
    },
    {
      name: 'Not in Quickfilter',
      autocomplete: [
        { name: 'Option1' },
        { name: 'Option2' },
        { name: 'Option3' },
      ],
    },
  ],
};

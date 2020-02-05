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

import { NgModule, Type } from '@angular/core';
import { TestModuleMetadata } from '@angular/core/testing';
import { DtIconModule } from '@dynatrace/barista-components/icon';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

/**
 * Creates a mock icon testing module without trying to fetch any svg.
 * Returns an empty svg tag for unit testing.
 */
export function mockIconTestingModule(
  config: TestModuleMetadata = {
    imports: [],
    providers: [],
    declarations: [],
  },
): Type<any> {
  @NgModule({
    imports: [
      DtIconModule.forRoot({ svgIconLocation: '{{name}}.svg' }),
      ...config.imports!,
    ],
    providers: [
      {
        provide: HttpClient,
        useValue: {
          get: jest.fn().mockReturnValue(of('<svg></svg>')),
        },
      },
      ...config.providers!,
    ],
    declarations: config.declarations,
    exports: [DtIconModule],
  })
  class IconTestingModule {}

  return IconTestingModule;
}

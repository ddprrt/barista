import {Component} from '@angular/core';
import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DtButtonModule, DtCopyToClipboardModule, DtIconModule, DtInputModule} from '@dynatrace/angular-components';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DtCopyToClipboard', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DtInputModule,
        DtButtonModule,
        DtCopyToClipboardModule,
        HttpClientTestingModule,
        DtIconModule.forRoot({svgIconLocation: `{{name}}.svg`}),
      ],
      declarations: [CallbackBehaviorTestApp, DisabledTestApp],
    });
    TestBed.compileComponents();
    // tslint:disable-next-line:no-any
    document.execCommand = (commandId: string, showUI?: boolean, value?: any): boolean => true;
  }));

  it('should trigger callback', (): void => {

    const fixture = TestBed.createComponent(CallbackBehaviorTestApp);
    fixture.detectChanges();
    const buttonDebugElement = fixture.debugElement.query(By.css('.dt-copy-to-clipboard-btn-button'));
    buttonDebugElement.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(fixture.componentInstance.copyEventCount).toBeGreaterThan(0, 'At least 1 copy must be called');

  });

  it('should set checkmark to visible and invisible afterwards', fakeAsync((): void => {
    const fixture = TestBed.createComponent(CallbackBehaviorTestApp);
    fixture.detectChanges();
    const buttonDebugElement = fixture.debugElement.query(By.css('.dt-copy-to-clipboard-btn-button'));
    buttonDebugElement.nativeElement.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    const checkIfIconExist = fixture.debugElement.query(By.css('.dt-button-icon'));
    expect(checkIfIconExist).not.toBeNull('Icon should be visible');
    tick(1200); // wait at least 800ms until the icon should automatically disappear
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.dt-button-icon'))).toBeNull('Icon should be invisible');
  }));

  it('should not trigger callback', (): void => {
    const fixture = TestBed.createComponent(DisabledTestApp);
    fixture.detectChanges();
    const buttonDebugElement = fixture.debugElement.query(By.css('.dt-copy-to-clipboard-btn-button'));
    buttonDebugElement.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(fixture.componentInstance.copyEventCount).toBe(0, 'disabled copy to clipboards container should not trigger');
  });

});

/** Test component that contains an DtCopyComponent. */
@Component({
  selector: 'dt-test-app',
  template: `
    <dt-copy-to-clipboard (copied)="increaseEventCount();">
      <input dtInput value="https://context.dynatrace.com"/>
      <dt-copy-to-clipboard-label>Copy</dt-copy-to-clipboard-label>
    </dt-copy-to-clipboard>`,
})
class CallbackBehaviorTestApp {
  copyEventCount = 0;

  increaseEventCount(): void {
    this.copyEventCount++;
  }
}

@Component({
  selector: 'dt-disabled-test-app',
  template: `
    <dt-copy-to-clipboard [disabled]="true" (copied)="increaseEventCount();">
      <input dtInput value="https://context.dynatrace.com"/>
      <dt-copy-to-clipboard-label>Copy</dt-copy-to-clipboard-label>
    </dt-copy-to-clipboard>`,
})
class DisabledTestApp {
  copyEventCount = 0;

  increaseEventCount(): void {
    this.copyEventCount++;
  }
}
import { describe, it, expect, beforeEach } from 'vitest';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FeatureFlagDirective } from './feature-flag.directive';
import { FeatureFlagService, FEATURE_FLAG_CONFIG } from './feature-flag.service';

@Component({
  standalone: true,
  imports: [FeatureFlagDirective],
  template: `
    <div id="visible" *featureFlag="'enabledFeature'">Visible</div>
    <div id="hidden" *featureFlag="'disabledFeature'">Hidden</div>
  `
})
class TestComponent {}

describe('FeatureFlagDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        FeatureFlagService,
        {
          provide: FEATURE_FLAG_CONFIG,
          useValue: {
            defaults: { enabledFeature: true, disabledFeature: false }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should show element when feature is enabled', () => {
    const visibleDiv = fixture.debugElement.query(By.css('#visible'));
    const hiddenDiv = fixture.debugElement.query(By.css('#hidden'));

    expect(visibleDiv).toBeTruthy();
    expect(hiddenDiv).toBeFalsy();
  });
});

import { describe, it, expect } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { FeatureFlagService, FEATURE_FLAG_CONFIG } from './feature-flag.service';
import { firstValueFrom } from 'rxjs';

describe('FeatureFlagService', () => {
  let service: FeatureFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FeatureFlagService,
        {
          provide: FEATURE_FLAG_CONFIG,
          useValue: {
            defaults: { featureA: true, featureB: false },
            enableLocalStorage: false
          }
        }
      ]
    });
    service = TestBed.inject(FeatureFlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct flag status', () => {
    expect(service.isEnabled('featureA')).toBe(true);
    expect(service.isEnabled('featureB')).toBe(false);
    expect(service.isEnabled('unknown')).toBe(false);
  });

  it('should provide observable flag status', async () => {
    const enabled = await firstValueFrom(service.flag$('featureA'));
    expect(enabled).toBe(true);
  });
});

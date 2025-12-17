import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagDirective } from './feature-flag.directive';
import { FeatureFlagConfig, FEATURE_FLAG_CONFIG, FeatureFlagService } from './feature-flag.service';

@NgModule({
  imports: [CommonModule, FeatureFlagDirective],
  exports: [FeatureFlagDirective]
})
export class FeatureFlagModule {
  static forRoot(config: FeatureFlagConfig): ModuleWithProviders<FeatureFlagModule> {
    return {
      ngModule: FeatureFlagModule,
      providers: [
        {
          provide: FEATURE_FLAG_CONFIG,
          useValue: config
        },
        FeatureFlagService
      ]
    };
  }
}

export function provideFeatureFlags(config: FeatureFlagConfig) {
  return [
    {
      provide: FEATURE_FLAG_CONFIG,
      useValue: config
    },
    FeatureFlagService
  ];
}

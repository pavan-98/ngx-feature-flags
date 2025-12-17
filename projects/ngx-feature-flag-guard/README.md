# ngx-feature-flag-guard

Angular-first feature flag execution layer. Standardizes flag resolution across environments with a clear priority model.

## Features

- **Priority-based Resolution**: Remote > Local Storage > Static Defaults.
- **Angular Integration**: Structural directives, route guards, and reactive services.
- **Enterprise Safe**: Fail-safe defaults (OFF) and environment-aware overrides.
- **Framework Agnostic Core**: Core logic is decoupled from Angular.

## Compatibility

| Angular Version | Support |
| :--- | :--- |
| **v16+** | ✅ Fully Supported |
| **v14 - v15** | ⚠️ Should work (uses `standalone` & `inject`) but untested |
| **< v14** | ❌ Not Supported |

## Installation

```bash
npm install ngx-feature-flag-guard
```

## Usage

### 1. Define Static Defaults

```ts
export const FEATURE_FLAGS = {
  experimentalFeature: false,
  newDashboard: false,
} as const;
```

### 2. Provide Configuration

#### Standalone Application

```ts
import { provideFeatureFlags } from 'ngx-feature-flag-guard';

bootstrapApplication(AppComponent, {
  providers: [
    provideFeatureFlags({
      defaults: FEATURE_FLAGS,
      enableLocalStorage: !environment.production
    })
  ]
});
```

#### NgModule Application

```ts
import { FeatureFlagModule } from 'ngx-feature-flag-guard';

@NgModule({
  imports: [
    FeatureFlagModule.forRoot({
      defaults: FEATURE_FLAGS,
      enableLocalStorage: !environment.production
    })
  ]
})
export class AppModule { }
```

### 3. Structural Directive

```html
<div *featureFlag="'experimentalFeature'">
  New Experimental UI
</div>
```

### 4. Route Guard

```ts
const routes: Routes = [
  {
    path: 'new-dashboard',
    component: NewDashboardComponent,
    canActivate: [featureFlagGuard],
    data: {
      feature: 'newDashboard',
      redirectTo: '/old-dashboard'
    }
  }
];
```

### 5. Programmatic Check

```ts
constructor(private featureFlagService: FeatureFlagService) {
  if (this.featureFlagService.isEnabled('experimentalFeature')) {
    // ...
  }
}
```

## Local Overrides

Enable local overrides in non-production environments to allow manual testing:

```ts
localStorage.setItem('ff.experimentalFeature', 'true');
```

## License

MIT
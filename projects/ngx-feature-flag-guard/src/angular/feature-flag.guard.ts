import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { FeatureFlagService } from './feature-flag.service';

export const featureFlagGuard: CanActivateFn = (route, state) => {
  const service = inject(FeatureFlagService);
  const router = inject(Router);

  const feature = route.data['feature'] as string;
  const redirectTo = route.data['redirectTo'] as string | undefined;

  if (!feature) {
    return true;
  }

  const isEnabled = service.isEnabled(feature);

  if (isEnabled) {
    return true;
  }

  if (redirectTo) {
    return router.parseUrl(redirectTo);
  }

  return false;
};

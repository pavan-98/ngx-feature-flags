import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { FlagResolver } from '../core/flag-resolver.service';
import { FlagSource } from '../core/flag-source.interface';
import { StaticFlagSource } from '../core/static-flag.source';
import { LocalStorageFlagSource } from '../core/local-storage-flag.source';
import { RemoteFlagSource } from '../core/remote-flag.source';

export const FEATURE_FLAG_CONFIG = new InjectionToken<FeatureFlagConfig>('FEATURE_FLAG_CONFIG');

export interface FeatureFlagConfig {
  defaults: Record<string, boolean>;
  remote?: Record<string, boolean>;
  enableLocalStorage?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {
  private readonly resolver: FlagResolver;
  private readonly flagsSubject = new BehaviorSubject<void>(undefined);

  constructor(@Inject(FEATURE_FLAG_CONFIG) private config: FeatureFlagConfig) {
    const sources: FlagSource[] = [
      new StaticFlagSource(config.defaults),
      new LocalStorageFlagSource(config.enableLocalStorage ?? true)
    ];

    if (config.remote) {
      sources.push(new RemoteFlagSource(config.remote));
    }

    this.resolver = new FlagResolver(sources);
  }

  isEnabled(flagName: string): boolean {
    return this.resolver.isEnabled(flagName);
  }

  flag$(flagName: string): Observable<boolean> {
    return this.flagsSubject.asObservable().pipe(
      map(() => this.isEnabled(flagName))
    );
  }

  /**
   * Manually trigger a refresh of flag status for observables.
   * Useful if you know flags might have changed.
   */
  refresh(): void {
    this.flagsSubject.next();
  }
}

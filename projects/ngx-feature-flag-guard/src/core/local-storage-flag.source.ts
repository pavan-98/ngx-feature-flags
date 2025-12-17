import { FlagSource } from './flag-source.interface';

export class LocalStorageFlagSource implements FlagSource {
  readonly priority = 20;
  private readonly prefix = 'ff.';

  constructor(private readonly enabled: boolean = true) {}

  isEnabled(flagName: string): boolean | undefined {
    if (!this.enabled) {
      return undefined;
    }

    try {
      const value = localStorage.getItem(`${this.prefix}${flagName}`);
      if (value === 'true') return true;
      if (value === 'false') return false;
      return undefined;
    } catch {
      return undefined;
    }
  }
}

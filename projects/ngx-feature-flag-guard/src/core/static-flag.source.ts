import { FlagSource } from './flag-source.interface';

export class StaticFlagSource implements FlagSource {
  readonly priority = 10;

  constructor(private readonly defaults: Record<string, boolean>) {}

  isEnabled(flagName: string): boolean | undefined {
    return this.defaults[flagName];
  }
}

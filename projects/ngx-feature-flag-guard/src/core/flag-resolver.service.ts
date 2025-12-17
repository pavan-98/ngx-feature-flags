import { FlagSource } from './flag-source.interface';

export class FlagResolver {
  private sources: FlagSource[] = [];

  constructor(initialSources: FlagSource[] = []) {
    this.sources = [...initialSources].sort((a, b) => b.priority - a.priority);
  }

  addSource(source: FlagSource): void {
    this.sources.push(source);
    this.sources.sort((a, b) => b.priority - a.priority);
  }

  isEnabled(flagName: string): boolean {
    for (const source of this.sources) {
      const value = source.isEnabled(flagName);
      if (value !== undefined) {
        return value;
      }
    }
    return false; // Fail safe
  }
}

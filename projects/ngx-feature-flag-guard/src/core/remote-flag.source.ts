import { FlagSource } from './flag-source.interface';

export class RemoteFlagSource implements FlagSource {
  readonly priority = 30;

  constructor(private readonly remoteFlags: Record<string, boolean>) {}

  isEnabled(flagName: string): boolean | undefined {
    return this.remoteFlags[flagName];
  }
}

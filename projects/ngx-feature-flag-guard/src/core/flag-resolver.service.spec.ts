import { describe, it, expect, vi } from 'vitest';
import { FlagResolver } from './flag-resolver.service';
import { StaticFlagSource } from './static-flag.source';
import { LocalStorageFlagSource } from './local-storage-flag.source';
import { RemoteFlagSource } from './remote-flag.source';

describe('FlagResolver', () => {
  it('should resolve flags from static defaults', () => {
    const staticSource = new StaticFlagSource({ featureA: true, featureB: false });
    const resolver = new FlagResolver([staticSource]);

    expect(resolver.isEnabled('featureA')).toBe(true);
    expect(resolver.isEnabled('featureB')).toBe(false);
    expect(resolver.isEnabled('featureC')).toBe(false); // Default OFF
  });

  it('should prioritize Remote > LocalStorage > Static', () => {
    const staticSource = new StaticFlagSource({ feat: false });
    const localStorageSource = new LocalStorageFlagSource(true);
    const remoteSource = new RemoteFlagSource({ feat: true });

    // Mock localStorage
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      if (key === 'ff.feat') return 'false'; // LocalStorage says false
      return null;
    });

    const resolver = new FlagResolver([staticSource, localStorageSource, remoteSource]);

    // Remote (true) should win over LocalStorage (false) and Static (false)
    expect(resolver.isEnabled('feat')).toBe(true);
  });

  it('should prioritize LocalStorage over Static when Remote is not set', () => {
    const staticSource = new StaticFlagSource({ feat: false });
    const localStorageSource = new LocalStorageFlagSource(true);
    const remoteSource = new RemoteFlagSource({}); // Remote doesn't have it

    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      if (key === 'ff.feat') return 'true';
      return null;
    });

    const resolver = new FlagResolver([staticSource, localStorageSource, remoteSource]);

    expect(resolver.isEnabled('feat')).toBe(true);
  });
});

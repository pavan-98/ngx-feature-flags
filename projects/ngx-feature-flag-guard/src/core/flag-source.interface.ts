export interface FlagSource {
  readonly priority: number;
  isEnabled(flagName: string): boolean | undefined;
}

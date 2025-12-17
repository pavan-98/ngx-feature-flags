/*
 * Public API Surface of ngx-feature-flag-guard
 */

// Core
export * from './core/flag-source.interface';
export * from './core/static-flag.source';
export * from './core/local-storage-flag.source';
export * from './core/remote-flag.source';
export * from './core/flag-resolver.service';

// Angular
export * from './angular/feature-flag.service';
export * from './angular/feature-flag.directive';
export * from './angular/feature-flag.guard';
export * from './angular/feature-flag.module';
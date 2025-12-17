import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FeatureFlagService } from './feature-flag.service';

@Directive({
  selector: '[featureFlag]',
  standalone: true
})
export class FeatureFlagDirective implements OnInit, OnDestroy {
  private flagName?: string;
  private readonly destroy$ = new Subject<void>();
  private hasView = false;

  @Input() set featureFlag(name: string) {
    this.flagName = name;
    this.updateView();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private featureFlagService: FeatureFlagService
  ) {}

  ngOnInit(): void {
    if (this.flagName) {
      this.featureFlagService.flag$(this.flagName)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.updateView());
    }
  }

  private updateView(): void {
    if (!this.flagName) return;

    const enabled = this.featureFlagService.isEnabled(this.flagName);

    if (enabled && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!enabled && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

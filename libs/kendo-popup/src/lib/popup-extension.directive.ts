import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { PopupComponent } from '@progress/kendo-angular-popup';
import { Subject, takeUntil } from 'rxjs';

interface ContainsFunctionContainer {
  contains(value: unknown): boolean;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'kendo-popup[popupExtension]',
  standalone: true,
})
export class PopupExtensionDirective implements OnDestroy {
  @Input() public anchor?: ElementRef | HTMLElement;
  @Output() public closeRequested = new EventEmitter<void>();
  @Input() public shouldCloseOnPopupClick = true;

  private destroy$ = new Subject<void>();

  private get anchorContainer(): ContainsFunctionContainer | null {
    if (!this.anchor) return null;

    return this.isElementRef(this.anchor)
      ? this.ensureContainsFunctionContainer(this.anchor.nativeElement)
      : this.ensureContainsFunctionContainer(this.anchor);
  }

  public constructor(private host: PopupComponent, private hostElement: ElementRef, private cdr: ChangeDetectorRef) {
    this.setUpCdr();
  }

  private setUpCdr(): void {
    // Used to fix Kendo problem with changeDetection. Popup opens in wrong place, then moves into correct place after click. Reevaluate periodically if still needed
    this.host.open.pipe(takeUntil(this.destroy$)).subscribe(() => this.cdr.markForCheck());
  }

  @HostListener('document:keydown', ['$event'])
  public keydown(event: KeyboardEvent): void {
    if (event.code === 'Escape') {
      this.closeRequested.emit();
    }
  }

  @HostListener('document:click', ['$event'])
  public documentClick(event: MouseEvent): void {
    const target = event.target;
    if (!target) return; // potentially could also close on null target

    const popupClick = this.isPopupClick(target);
    if (popupClick && this.shouldCloseOnPopupClick) this.closeRequested.emit();
    if (popupClick) return;

    const anchorClick = this.isAnchorClick(target);
    if (!anchorClick) this.closeRequested.emit();
  }

  private isAnchorClick(target: EventTarget): boolean {
    const anchorContainer = this.anchorContainer;
    if (!anchorContainer) return false;
    return anchorContainer.contains(target);
  }

  private isPopupClick(target: EventTarget): boolean {
    const element = this.ensureContainsFunctionContainer(this.hostElement.nativeElement);
    return element.contains(target);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private isElementRef(value: ElementRef | HTMLElement): value is ElementRef {
    return !!(value as ElementRef).nativeElement;
  }

  private ensureContainsFunctionContainer(value: unknown): ContainsFunctionContainer {
    const valueAsType = value as ContainsFunctionContainer;
    if (typeof valueAsType.contains !== 'function') {
      throw new Error('Unexpectedly found no "contains" function on nativeElement');
    }
    return valueAsType;
  }
}

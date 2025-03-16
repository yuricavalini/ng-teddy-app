import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrimWhiteSpace]',
})
export class TrimWhiteSpaceDirective {
  private ngControl = inject(NgControl, { self: true, optional: true });

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (!this.ngControl || !this.ngControl.control) return;

    const trimmedValue = value.replace(/\s+/g, ' ');
    this.ngControl.control.setValue(trimmedValue, { emitEvent: false });
  }

  @HostListener('blur')
  onBlur() {
    if (!this.ngControl || !this.ngControl.control) return;

    const trimmedValue = this.ngControl.control.value?.trim();
    this.ngControl.control.setValue(trimmedValue, { emitEvent: false });
  }
}

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[dateFormat]'
})
export class DateFormatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;
    if (initialValue.length == 10) {
      const parts = initialValue.split('-');
      const day = parts[2];
      const month = parts[1];
      const year = parts[0];
      const formattedDate = `${day}/${month}/${year}`;
      this.el.nativeElement.value = formattedDate;
    }
  }
}

import {Directive, DoCheck, ElementRef, OnInit} from '@angular/core';
import {FormControl, NG_VALIDATORS, Validator, ValidatorFn} from '@angular/forms';

@Directive({
  selector: '[appCustomDirective][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomDirectiveDirective,
      multi: true
    }
  ]
})
export class CustomDirectiveDirective implements Validator {

  validator: ValidatorFn;

  regEx = /^[a-z0-9]+$/i;
  test = 'asdf,';
  constructor(private elementRef: ElementRef) {
    this.validator = this.customValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  // ngOnInit() {
  //   console.log(this.elementRef.nativeElement);
  //   this.elementRef.nativeElement.invalid = true;
  // }
  //
  // ngDoCheck() {
  //   // if (this.elementRef.nativeElement.value && !this.regEx.test(this.elementRef.nativeElement.value)){
  //   //   this.elementRef.nativeElement.value = '';
  //   // }
  //   //console.log(this.regEx.test(this.elementRef.nativeElement.value));
  //   //console.log(this.regEx.test(this.elementRef.nativeElement.value));
  //   //if (this.elementRef.nativeElement.value.test(this.regEx))
  // }
  customValidator(): ValidatorFn {
    return (c: FormControl) => {
      const isValid = this.regEx.test(c.value);
      if (isValid && c.value && c.value.length >= 3) {
        return null;
      } else {
        return {
          appCustomDirective: {
            valid: false
          }
        };
      }
    };
  }






}

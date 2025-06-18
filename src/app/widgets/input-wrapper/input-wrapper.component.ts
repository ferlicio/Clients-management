import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

type FieldType = "text" | "longText" | "number" | "select" | "date" | "radio" | "checkbox" | "password" | "price"; //adicionar date-range

interface Option {
  label?: string;    // Texto a ser exibido (opcional)
  value: any;       // Valor associado à opção
}

export const DATE_FORMAT = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-input-wrapper',
  standalone: false,
  templateUrl: './input-wrapper.component.html',
  styleUrl: './input-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputWrapperComponent),
      multi: true
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT},
  ]
})
export class InputWrapperComponent implements ControlValueAccessor {
  @Input() label: string = "No Label";
  @Input() floatLabel: 'auto' | 'always' | 'never' = 'auto';                     
  @Input() type: FieldType = "text";                                        
  @Input() placeholder: string = '';         
  @Input() maskPattern: string = '';              
  @Input() options?: Option[] = [
    {label:"exemplo 1",value:"exemplo1"},
    {value:"exemplo2"}
  ];         
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  value: any;            
  hidden: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}
  
  private propagateChange: OnChangeFn<any> = () => {};
  private propagateTouch: OnTouchedFn = () => {};
  onChange = (_: any) => {};
  onTouched = () => {};
  
  writeValue(v: any)        { this.value = v; this.cdr.markForCheck(); }
  registerOnChange(fn: any) { this.propagateChange = fn; }
  registerOnTouched(fn:any) { this.propagateTouch = fn; }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleChange(event: any) {
    const v =
      event.checked !== undefined
        ? event.checked
        : event.value !== undefined
          ? event.value
          : (event.target as HTMLInputElement).value;
    this.value = v;
    this.propagateChange(v);
    this.propagateTouch();
  }

  @HostListener('focusout')
  onFocusOut() {
    this.onTouched();
  }

  trackByValue(_idx: number, item: Option) { return item.value; }

}

type OnChangeFn<T> = (value: T) => void;
type OnTouchedFn = () => void; 

---
{
  "title": "Angular 自定義表單元件",
  "categoryId": 1,
  "categoryName": "前端",
  "labels": [],
  "createDate": "2023-05-21T04:31:14.992Z",
  "references": [],
  "flag": "Y"
}
---
首先要使用 Angular 自定義表單元件，有兩個步驟要實作。

## 實作 ControlValueAccessor

```typescript
interface ControlValueAccessor {
  // 外部寫入值
  writeValue(obj: any): void
  // 外部傳入onChange function，透過這個function來跟表單控件通知值的異動
  registerOnChange(fn: any): void
  // 外部傳入onTouched function，透過這個function來跟表單控件通知touched狀態的異動
  registerOnTouched(fn: any): void
  // 外部傳入disabled的狀態
  setDisabledState(isDisabled: boolean)?: void
}
```

## 註冊提供者

```typescript
@Component({
  standalone: true,
  selector: 'app-basic-input',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BasicComponent),
      multi: true,
    }
  ]
})
export class BasicComponent
```

### 簡化提供者匯出

```typescript
export const CONTROL_VALUE_ACCESSOR = (component: Type<any>) => {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => component),
    multi: true,
  };
};
```

然後像以下方式使用：

```typescript
@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [CONTROL_VALUE_ACCESSOR(SelectComponent)],
})
export class SelectComponent
```

## 建立基底元件

寫一個基底元件讓其他自定義元件直接繼承使用：

```typescript
  protected val = '';
  // 用來接收 setDisabledState 的狀態
  protected disabled = false;

  // 用來接收 registerOnChange 和 onTouched 傳入的方法
  protected onChange?: (value: any) => {};
  protected onTouched?: () => {};
  ngControl: NgControl | undefined;
  control: AbstractControl | null | undefined;
  constructor(@Inject(Injector) public injector: Injector, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
  }

  ngAfterViewInit(): void {
    this.control = this.ngControl?.control;
    this.cdr.detectChanges();
  }
  // 以下是 ControlValueAccessor 需實作的方法
  writeValue(val: any): void {
    this.val = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected change() {
    if (this.onChange && this.onTouched) {
      this.onChange(this.val);
      this.onTouched();
    }
  }
```

## 繼承基底元件

其他自定義元件只要繼承基底即可：

```typescript
@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [CONTROL_VALUE_ACCESSOR(SelectComponent)],
})
export class SelectComponent extends BasicComponent {
  @Input() options: Options = [];
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
}
```

當值有異動時，調用基底的 change 來通知表單參數有異動即可：

```html
<select
  class="select select-bordered border-2"
  [disabled]="disabled"
  [(ngModel)]="val"
  (ngModelChange)="change()">
  <option
    *ngFor="let option of options"
    [disabled]="option.disabled ?? false"
    [value]="option.value">
    {{ option.text }}
  </option>
</select>
```

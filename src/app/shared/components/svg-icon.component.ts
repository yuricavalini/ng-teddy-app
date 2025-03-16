import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  template: `<i
    [class]="'icon ' + iconClass"
    [style.width]="width"
    [style.height]="height"
    [style.backgroundColor]="currentColor"
    [style.transition]="transitionStyle"></i>`,
  styles: [
    `
      :host,
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: cover;
      }

      .icon {
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        mask-size: cover;
        -webkit-transition: background-color 0.2s ease-in;
        -moz-transition: background-color 0.2s ease-in;
        -o-transition: background-color 0.2s ease-in;
        transition: background-color 0.2s ease-in;
      }

      .home {
        mask-image: url(/assets/icons/home.svg);
        -webkit-mask-image: url(/assets/icons/home.svg);
      }
      .arrow-left {
        background-image: url('/assets/icons/arrow-left.svg');
      }
      .clients {
        mask-image: url(/assets/icons/clients.svg);
        -webkit-mask-image: url(/assets/icons/clients.svg);
      }
      .close {
        mask-image: url(/assets/icons/close.svg);
        -webkit-mask-image: url(/assets/icons/close.svg);
      }

      .menu {
        mask-image: url(/assets/icons/menu.svg);
        -webkit-mask-image: url(/assets/icons/menu.svg);
      }
      .minus {
        mask-image: url(/assets/icons/minus.svg);
        -webkit-mask-image: url(/assets/icons/minus.svg);
      }
      .pencil {
        mask-image: url(/assets/icons/pencil.svg);
        -webkit-mask-image: url(/assets/icons/pencil.svg);
      }
      .plus {
        mask-image: url(/assets/icons/plus.svg);
        -webkit-mask-image: url(/assets/icons/plus.svg);
      }
      .products {
        mask-image: url(/assets/icons/products.svg);
        -webkit-mask-image: url(/assets/icons/products.svg);
      }
      .trash {
        mask-image: url(/assets/icons/trash.svg);
        -webkit-mask-image: url(/assets/icons/trash.svg);
      }
      .chevron-down {
        mask-image: url(/assets/icons/chevron-down.svg);
        -webkit-mask-image: url(/assets/icons/chevron-down.svg);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent implements OnInit, OnChanges {
  @Input() iconClass:
    | 'arrow-left'
    | 'clients'
    | 'close'
    | 'home'
    | 'menu'
    | 'minus'
    | 'pencil'
    | 'plus'
    | 'products'
    | 'trash'
    | 'chevron-down'
    | '' = '';

  public currentColor!: string;

  ngOnInit() {
    this.currentColor = this.backgroundColor || '#000';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['backgroundColor'] && !changes['backgroundColor'].firstChange) {
      this.currentColor = this.backgroundColor || '#000';
    }
  }

  private _width = '20px';
  private _height = '20px';
  private _backgroundColor = '#000';
  private _hoverColor = '';

  @Input()
  set width(value: string) {
    this._width = value.trim().includes('px') ? value : `${value}px`;
  }
  get width(): string {
    return this._width;
  }

  @Input()
  set height(value: string) {
    this._height = value.trim().includes('px') ? value : `${value}px`;
  }
  get height(): string {
    return this._height;
  }

  @Input()
  set backgroundColor(value: string) {
    this._backgroundColor = value.trim().startsWith('#') ? value : `#${value}`;
  }
  get backgroundColor(): string {
    return this._backgroundColor;
  }

  @Input()
  set hoverColor(value: string) {
    this._hoverColor = value.trim().startsWith('#') ? value : `#${value}`;
  }
  get hoverColor(): string {
    return this._hoverColor;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.hoverColor) {
      this.currentColor = this.hoverColor;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.currentColor = this.backgroundColor || '#000';
  }

  @Input() applyTransition: boolean = true;

  get transitionStyle(): string {
    return this.applyTransition ? 'background-color 0.2s ease-in' : 'none';
  }

  toggleTransition() {
    this.applyTransition = !this.applyTransition;
  }
}

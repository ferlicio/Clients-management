import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   @Input() padding: string = '0';

  /** aplica esse padding direto no host do componente */
  @HostBinding('style.padding') get hostPadding(): string {
    return this.padding;
  }

}

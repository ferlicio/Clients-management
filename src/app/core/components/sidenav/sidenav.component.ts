import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  standalone: false,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  activeURL: string;

  constructor() {
    this.activeURL = window.location.pathname;
    console.log(this.activeURL);
  }
}

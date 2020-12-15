import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  openAngularUrl() {
    window.open("https://github.com/Marwan123-web/Dokkanz-Angular");
  }
  openNodeUrl() {
    window.open("https://github.com/Marwan123-web/dokkanz-s-task");
  }
  ngOnInit(): void {
  }

}

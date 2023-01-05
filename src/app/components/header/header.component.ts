import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public navMenuStatus = false;



  constructor() { }

  ngOnInit(): void {
  }

  openNavMenu(): void {
    this.navMenuStatus = !this.navMenuStatus
  }

  closeNavMenu(): void {
    this.navMenuStatus = !this.navMenuStatus
  }




}

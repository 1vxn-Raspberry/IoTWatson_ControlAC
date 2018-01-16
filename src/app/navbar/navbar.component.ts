import { Component, OnInit } from '@angular/core';
import { Navbar } from '../navbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  item: Navbar[] = [
  {id: 1, name: 'Home',URL: '#'},
  {id: 2, name: 'Rooms',URL: '#'},
  {id: 3, name: 'Statistics',URL: '#'},
  {id: 4, name: 'About Us',URL: '#'}
];

items = this.item;

  constructor() { }

  ngOnInit() {
  }

}

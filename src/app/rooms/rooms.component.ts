import { Component, OnInit } from '@angular/core';
import {Room} from '../room';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  room: Room = {
    id: 1,
    name: 'HR',
    temp: 0,
    hum: 0,
    timestamp: '01/01/2018 09:00:123',
    location: 'HR Offices',
    type: 'Mitsubishi'
  };

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  //@Input(trackArea) public ta;
  public trackArea: boolean = false;
  rand:number;

  constructor() { }

  ngOnInit(): void {
    this.rand = Math.floor(Math.random()*54312);
  }

}

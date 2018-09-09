import { Component, OnInit } from '@angular/core';

export interface Product {
  name:string , 
  description:string

}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

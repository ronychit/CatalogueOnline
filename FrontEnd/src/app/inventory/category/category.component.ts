import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../backend-service.service';

import {Category} from '../../models/models';

import {MatDialog} from '@angular/material';
import { CategoryDetailsComponent } from './category-details/category-details.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['id' , 'name', 'description', 'active'];
  dataSource : Category[] = [];
  constructor(private service : BackendService , public dialog: MatDialog) { }

  ngOnInit() {
    this.loadCategories();
  }

  reload() {
    this.loadCategories();
  }

  loadCategories() {
    this.service.getCategories().subscribe(response => {
      this.dataSource = response;
    } , err => console.error(err));
  }

  getRecord(data:Category) {
    this.dialog.open(CategoryDetailsComponent, {
      data: data
    });
  }

}

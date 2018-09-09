import { Component, OnInit , Inject, Optional} from '@angular/core';
import { Category } from '../../../models/models';
import { BackendService } from '../../../backend-service.service';

import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  category : Category;
  constructor(private service : BackendService ,@Optional() @Inject(MAT_DIALOG_DATA) public cat : Category) { 
    
    if (this.cat) {
      this.category = cat;
    }
    else {
      this.category = new Category();
    }
  }

  ngOnInit() {

  }

  saveCategory() {
    if (!this.category.id) {
        this.service.saveCategories(this.category).subscribe(respp => {
          alert("Category Saved : Id : " + respp.id);
        } , 
        err => alert ("Error " + err));
    }
    else {
      this.service.updateCategories(this.category).subscribe(respp => {
        alert("Category Saved : Id : " + respp.id);
      } , 
      err => alert ("Error " + err));
    }
  }

  delete() {
    this.service.deleteCategories(this.category).subscribe(respp => {
      alert("Deleted : ");
    } , 
    err => alert ("Error " + err));
  
  }

}

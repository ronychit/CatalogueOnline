import { Component, OnInit , Inject , Optional} from '@angular/core';

import { BackendService } from '../../../backend-service.service';

import {MAT_DIALOG_DATA} from '@angular/material';
import { Attribute } from '../../../models/models';

@Component({
  selector: 'app-attribute-details',
  templateUrl: './attribute-details.component.html',
  styleUrls: ['./attribute-details.component.css']
})
export class AttributeDetailsComponent implements OnInit {

  attribute : Attribute;
  constructor(private service : BackendService ,@Optional() @Inject(MAT_DIALOG_DATA) public attr : Attribute) { 
    if (this.attr) {
      this.attribute = this.attr;
    }
    else {
      this.attribute = new Attribute();
    }
  }

  ngOnInit() {
    
  }

  saveAttribute() {
    if (!this.attribute.id) {
        this.service.saveAttribute(this.attribute).subscribe(respp => {
          alert("Attribute Saved : Id : " + respp.id);
        } , 
        err => alert ("Error " + err));
    }
    else {
      this.service.updateCAttribute(this.attribute).subscribe(respp => {
        alert("Attribute updated : Id : " + respp.id);
      } , 
      err => alert ("Error " + err));
    }
  }

  delete() {
    this.service.deleteAttribute(this.attribute).subscribe(respp => {
      alert("Deleted : ");
    } , 
    err => alert ("Error " + err));
  
  }

}

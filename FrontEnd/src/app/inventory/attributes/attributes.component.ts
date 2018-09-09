import { Component, OnInit } from '@angular/core';
import { Attribute } from '../../models/models';
import { BackendService } from '../../backend-service.service';
import {MatDialog} from '@angular/material';
import { AttributeDetailsComponent } from './attribute-details/attribute-details.component';


@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit {
  displayedColumns: string[] = ['id' , 'name', 'description'];
  dataSource : Attribute[] = [];
  constructor(private service : BackendService , public dialog: MatDialog) { }
  
  ngOnInit() {
    this.loadAttributes();
  }

  reload() {
    this.loadAttributes();
  }

  loadAttributes() {
    this.service.getAttributes().subscribe(response => {
      this.dataSource = response;
    } , err => console.error(err));
  }

  getRecord(data:Attribute) {
    this.dialog.open(AttributeDetailsComponent, {
      data: data
    });
  }

}

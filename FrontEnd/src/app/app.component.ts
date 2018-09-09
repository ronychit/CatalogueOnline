import { Component , ViewChild} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {InventoryComponent} from './inventory/inventory.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  @ViewChild(InventoryComponent ) inventoryComponent: InventoryComponent ; 


  constructor(private router:Router) {

  }

  openCategory() {
    this.router.navigate(['/category'])
  }

  openAttributes() {
    this.router.navigate(['/attributes'])
  }

  openItems() {
    this.router.navigate(['/items'])
  }


  openInventory() {
    this.router.navigate(['/inventory']);
  }

  openDealers() {
    this.router.navigate(['/dealers']);
  }
}

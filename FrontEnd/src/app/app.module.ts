import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { NavigationOptionsComponent } from './navigation-options/navigation-options.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DealersComponent } from './dealers/dealers.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './inventory/category/category.component';
import { AttributesComponent } from './inventory/attributes/attributes.component';
import { ItemsComponent } from './inventory/items/items.component';
import { CategoryDetailsComponent } from './inventory/category/category-details/category-details.component';
import { AttributeDetailsComponent } from './inventory/attributes/attribute-details/attribute-details.component';

@NgModule({
  exports: [
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  declarations: [],
})
export class DemoMaterialModule {}


const appRoutes :  Routes = [
  {
    path : "category" , component : CategoryComponent ,
    children : [
      {
        path : 'id' , 
        component : CategoryDetailsComponent
      }
    ]
  } , 
  {
    path : "attributes" , component : AttributesComponent
  } , 
  {
    path : "items" , component : ItemsComponent
  } , 
  {
    path : "" , 
    redirectTo : "/category" , 
    pathMatch : "full"
  }

];

@NgModule({
  declarations: [
    AppComponent , NavigationOptionsComponent
    ,InventoryComponent, DealersComponent , 
    HomeComponent,CategoryComponent, AttributesComponent,
     ItemsComponent , CategoryDetailsComponent , 
     AttributeDetailsComponent , 
  ],
  imports: [
    RouterModule.forRoot(appRoutes , {enableTracing  :true}) , 
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent] , 
  entryComponents : [AttributeDetailsComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {Category , Attribute} from './models/models';

const apiUrl:string = "http://192.168.43.94:8000/";
const category:string = "categories/";
const attributes:string = "attributes/";

export class Api {
  constructor(private url:string , private path : string) {
  }
  getUrl() : string {
    return this.url + this.path;
  }
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  categoryApi : Api = new Api(apiUrl , category);
  attributeApi : Api = new Api(apiUrl , attributes);

  constructor(private http: HttpClient,) { }

  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryApi.getUrl())
  }

  saveCategories(category : Category) : Observable<Category> {
    return this.http.post<Category>(this.categoryApi.getUrl(), category);
  }

  updateCategories(category : Category) : Observable<Category> {
    return this.http.put<Category>(this.categoryApi.getUrl() + category.id , category);
  }

  deleteCategories(category : Category) : Observable<string> {
    return this.http.delete<string>(this.categoryApi.getUrl() + category.id);
  }

  //Attributes

  getAttributes() : Observable<Attribute[]> {
    return this.http.get<Attribute[]>(this.attributeApi.getUrl())
  }

  saveAttribute(attribute : Attribute) : Observable<Attribute> {
    return this.http.post<Attribute>(this.attributeApi.getUrl(), attribute);
  }

  updateCAttribute(attribute : Attribute) : Observable<Attribute> {
    return this.http.put<Attribute>(this.attributeApi.getUrl() + attribute.id , attribute);
  }

  deleteAttribute(attribute : Attribute) : Observable<string> {
    return this.http.delete<string>(this.attributeApi.getUrl() + attribute.id);
  }

}

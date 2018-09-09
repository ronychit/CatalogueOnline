export class Category {
  id: number;
  category_name: string;
  category_description: string;
  category_active: boolean;
}

export class Attribute {
  id : number ;
  attribute_name : string;
  attribute_description : string
}

export class Item {
  id :number ;
  product_name : string;
  product_description : string;
  product_active : boolean;
  category : Category[] ; 
  attributes : Attribute[]

}
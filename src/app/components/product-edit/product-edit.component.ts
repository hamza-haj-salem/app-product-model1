import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId?:number | any
  productFormGroup : FormGroup | any;
  submitted:boolean=false;
  constructor( private activatedRoute:ActivatedRoute,
               private productService : ProductService,
               private fb:FormBuilder){}
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.productService.getProduct(this.productId)
    .subscribe(product=>{
      this.productFormGroup = this.fb.group({
        id:[product.id,Validators.required],
        name:[product.name,Validators.required],
        price:[product.price,Validators.required], 
        quantity:[product.quantity,Validators.required], 
        selected:[product.selected,Validators.required], 
        available:[product.available,Validators.required]
    })
    })
  }

  onUpdateProduct(){
    this.productService.updateProducts(this.productFormGroup.value).subscribe(data=>{
      alert("Success Update");
    })
  }

}

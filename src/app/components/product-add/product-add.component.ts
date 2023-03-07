import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productFormGroup?:FormGroup | any;
  submitted:boolean=false;

  constructor(private fb:FormBuilder,private productService:ProductService){}
  ngOnInit(): void {
                    //pour le controle
    this.productFormGroup = this.fb.group({
      //"":val par defaut
      name:["",Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required],
    });
  }
  onSaveProduct(){
    this.submitted = true;
    if(this.productFormGroup.invalid) return
    this.productService.save(this.productFormGroup.value)
    .subscribe(data=>{
      alert("Success Saving Prod");
    })
  }

}

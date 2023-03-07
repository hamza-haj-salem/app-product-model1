import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  //$ : juste pour dire que c'est un observable
  products$:Observable<AppDataState<Product[]>> | undefined;
  //products$:Observable<Product[]> | null=null;
  productd$ : any;
  
  constructor(private productsService:ProductService,private router:Router){}

  public get DataStateEnum() {
    return DataStateEnum; 
  }
  async onGetAllProducts(){                                   // pipe : on peut utiliser un ensemble des operateurs
  this.products$ = this.productsService.getAllProducts().pipe(
      map(data => {
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
   );  
  // this.productd$=await this.getAllProduct();
   //console.log(this.productd$);
  // console.log("hello");
  }
  onGetSelectedProducts(){
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map(data => {
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
   ); 
  }
  onGetAvailableProducts(){
    this.products$ = this.productsService.getSAvailableProducts().pipe(
      map(data => {
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
   ); 
  }
  onSearch(dataForm:any){
    this.products$ = this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data => {
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
   ); 

  }
  onSelect(p:Product){
    this.productsService.select(p)
    .subscribe(data => {
      p.selected = data.selected;
    })
  }
  onDelete(p:Product){
    let v=confirm("Etes vous sùre ?")
    if(v==true)
      this.productsService.deleteProduct(p)
      .subscribe(data=>{ 
        this.onGetAllProducts();
      })
  }
  onNewProduct(){
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id);
  }
/*async getAllProduct(){
    let data  = await this.productsService.getAllProducts().toPromise();
    return data;
  }*/

}

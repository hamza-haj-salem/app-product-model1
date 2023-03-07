import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

            //pour indiquer que ce service est accessible depuis toute l'application
@Injectable({providedIn:"root"})
export class ProductService{
    constructor(private http:HttpClient){}
    
    getAllProducts():Observable<Product[]>{
        let host = "http://localhost:3000";
        let unreachableHost ="http://localhost:8000"
        return this.http.get<Product[]>(host+"/products");
    }

    getSelectedProducts():Observable<Product[]>{
        let host = "http://localhost:3000";
        return this.http.get<Product[]>(host+"/products?selected=true");
    }

    getSAvailableProducts():Observable<Product[]>{
        let host = "http://localhost:3000";
        return this.http.get<Product[]>(host+"/products?available=true");
    }

    searchProducts(keyword:string):Observable<Product[]>{
        let host = "http://localhost:3000";
        return this.http.get<Product[]>(host+"/products?name_like="+keyword);
    }

    select(product:Product):Observable<Product>{
        let host = "http://localhost:3000";
        product.selected = !product.selected;
        return this.http.put<Product>(host+"/products/"+product.id,product);
    }

    deleteProduct(product:Product):Observable<void>{
        let host = "http://localhost:3000";
        product.selected = !product.selected;
        return this.http.delete<void>(host+"/products/"+product.id);
    }

    save(product:Product):Observable<Product>{
        let host = "http://localhost:3000";
        product.selected = !product.selected;
        return this.http.post<Product>(host+"/products/",product);
    }

    getProduct(id:number):Observable<Product>{
        let host = "http://localhost:3000";
        return this.http.get<Product>(host+"/products/"+id);
    }

    updateProducts(product:Product):Observable<Product>{
        let host = "http://localhost:3000";
        return this.http.put<Product>(host+"/products/"+product.id,product);
    }



}
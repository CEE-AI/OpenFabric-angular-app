import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<any>("http://localhost:8701/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  createProduct(product : any){
    return this.http.post<any>("http://localhost:8701/products", product)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateProduct(product:any, id:number){
    return this.http.patch<any>("http://localhost:8701/products/"+id, product)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteProduct(id: number){
    return this.http.delete<any>("http://localhost:8701/products/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getProduct( id: number ){
    return this.http.get<any>("http://localhost:8701/products/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}

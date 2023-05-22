import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productList!: any[];
  products: any[] = [];
  public filterCategory: any;
  public searchKey: string = '';

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8701/products').subscribe(res => {
      this.productList = res.products.map((product: any) => {
        if (product.category === "skincare" || product.category === "grocery" || product.category === "home-decoration") {
          product.category = "grocery";
        }
        return Object.assign(product, { quantity: 1, total: product.price });
      });
      this.filterCategory = this.productList;
    });

    this.cartService.getSearch().subscribe(val => {
      this.searchKey = val;
    });
  }

  addtocart(item: any): void {
    this.cartService.addtoCart(item);
  }

  filter(category: string): void {
    this.filterCategory = this.productList.filter((product: any) => {
      if (product.category === category || category === '') {
        return product;
      }
    });
  }

}

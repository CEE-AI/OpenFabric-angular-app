import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { NavbarService } from 'src/app/service/navbar.service';
import {ApiService} from '../../service/api.service';
import { ProductModel } from './dashboard.product.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formValue !: FormGroup;
  productModelObj : ProductModel = new ProductModel();
  productList !:any [];
  products: any[] = []
  showCreate!: boolean;
  showUpdate!: boolean;
  navbarExpanded = true
  navbarHeight = 0

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: [''],
      title: [''],
      description: [''],
      price: [''],
      discountPercentage: [''],
      rating: [''],
      stock: [''],
      brand: [''],
      category: [''],
      thumbnail: [''],
    })
    this.getAllProducts();

    this.navbarService.collapsed$.subscribe(collapsed => {
      this.navbarExpanded = !collapsed;
      this.calculateNavbarHeight();
    });
  }

  private calculateNavbarHeight(): void {
    const navbarElement = document.getElementById('navbar');
    if (navbarElement) {
      this.navbarHeight = navbarElement.clientHeight;
    }
  }

  createProductDetails(){
    this.productModelObj._id = this.formValue.value.id;
    this.productModelObj.title = this.formValue.value.title;
    this.productModelObj.description = this.formValue.value.description;
    this.productModelObj.price = this.formValue.value.price;
    this.productModelObj.discountPercentage = this.formValue.value.discountPercentage;
    this.productModelObj.rating = this.formValue.value.rating;
    this.productModelObj.stock = this.formValue.value.stock;
    this.productModelObj.brand = this.formValue.value.brand;
    this.productModelObj.category = this.formValue.value.category;
    this.productModelObj.thumbnail = this.formValue.value.thumbnail;

    this.api.createProduct(this.productModelObj).subscribe(res =>{
      console.log(res)
      alert('Product Created Successfully')
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllProducts();
    }, 
    err =>{
      alert('Something went wrong')
    })
  }
  getAllProducts(){
    this.api.getProducts().subscribe(res =>{
      this.productList = res.products;
    })
  }
  deleteProduct(product: any){
    this.api.deleteProduct(product._id).subscribe(res=>{
      alert('Product Deleted')
      this.getAllProducts()
    })
  }
  onEdit(product: any){
     this.showCreate = false;
    this.showUpdate = true;
    this.productModelObj._id = product._id
    this.formValue.controls['id'].setValue(product._id);
    this.formValue.controls['title'].setValue(product.title);
    this.formValue.controls['description'].setValue(product.description);
    this.formValue.controls['price'].setValue(product.price);
    this.formValue.controls['discountPercentage'].setValue(product.discountPercentage);
    this.formValue.controls['rating'].setValue(product.rating);
    this.formValue.controls['stock'].setValue(product.stock);
    this.formValue.controls['brand'].setValue(product.brand);
    this.formValue.controls['category'].setValue(product.category);
    this.formValue.controls['thumbnail'].setValue(product.thumbnail);
  }
  updateProductDetails(){
    this.productModelObj._id = this.formValue.value.id;
    this.productModelObj.title = this.formValue.value.title;
    this.productModelObj.description = this.formValue.value.description;
    this.productModelObj.price = this.formValue.value.price;
    this.productModelObj.discountPercentage = this.formValue.value.discountPercentage;
    this.productModelObj.rating = this.formValue.value.rating;
    this.productModelObj.stock = this.formValue.value.stock;
    this.productModelObj.brand = this.formValue.value.brand;
    this.productModelObj.category = this.formValue.value.category;
    this.productModelObj.thumbnail = this.formValue.value.thumbnail;

    this.api.updateProduct(this.productModelObj, this.productModelObj._id)
    .subscribe(res=>{
      alert('Updated Successfully')
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllProducts();
    })
  }
  clickCreateProduct(){
    this.formValue.reset();
    this.showCreate = true;
    this.showUpdate = false
  }
}

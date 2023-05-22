import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/service/cart.service';
import { NavbarService } from 'src/app/service/navbar.service';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery/dist/jquery.min.js';
// import 'bootstrap/dist/js/bootstrap.min.js';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  public totalItem : number = 0;
  public searchTerm !: string;
  public isLoggedIn = false;
  collapsed = true
  navbarExpanded = false

  constructor(
    public authService: AuthService,
    private router: Router,
    private cartService : CartService,
    private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length
    })
    this.authService.authStatusChanged.subscribe((isAuthenticated) => { // subscribe to authStatusChanged
      this.isLoggedIn = isAuthenticated;
    });
  }

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

  onLogoutClick(): void {
    this.authService.logout();
    Swal.fire('Success','You are now logged out')
    this.router.navigate(['/login']);
  }

  toggledCollapsed(): void{
    this.collapsed = !this.collapsed
    this.navbarService.toggleCollapsed()
  }

}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  message: any =''
  constructor( private router: Router, private http: HttpClient){}

  ngOnInit(): void {
    this.http.get('http://localhost:8701/users/profile', {withCredentials: true}).subscribe((res: any)=>{
      console.log(res)
    this.message = `Hello ${res.name}`;
    
    },
    (err) =>{
      this.message = 'you are not logged in'
      
    }
    );

    
  }
}

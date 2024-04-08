import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import {AuthService} from '../../service/auth.service'
import { ValidateService } from '../../service/validate.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private forms: FormsModule,
    private reactiveForms:ReactiveFormsModule,) { 
    
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Validating fields
    if(!this.validateService.validateRegister(user)){
      Swal.fire('Error','Please fill in all fields', 'error');
      return false
    }
    if(!this.validateService.validateEmail(user.email)){
      Swal.fire('Error','Please enter a valid email address', 'error');
      return false
    }

    // Registration
    this.authService.registerUser(user).subscribe({
      next: (data) => {
        if (data) {
          Swal.fire('Success', 'Registration successful, redirecting to login page', 'success');
          this.router.navigate(['/login']);
        } else {
          Swal.fire('Error', 'Registration failed', 'error');
        }
      },
      error: (error) => {
        Swal.fire('Error', 'Registration failed', 'error');
      }
    });
    return undefined
  } 
   

}
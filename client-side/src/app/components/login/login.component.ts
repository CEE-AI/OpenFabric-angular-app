import { Component} from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    username: string = ''
    password: string = ''

  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }


  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.loginUser(user).subscribe(data => {
        if(data.success) {
          this.authService.storeUserData(data.token, data.user);
          Swal.fire('Success','You are now logged in');
          this.router.navigate(['cart']);
        } else {
          Swal.fire('Error','wrong username or password');
          this.router.navigate(['login']);
        }
    });
  }


}

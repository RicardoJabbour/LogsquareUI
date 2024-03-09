import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { Result } from '../../models/Result';
import { Login } from '../../models/LoginRequest';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  builder = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);
  authService = inject(AuthService);

  loginForm = this.builder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  onLogin() {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
    const loginRequest: Login = {
      email: email,
      password: password
    };

    this.authService.login(loginRequest).subscribe({
      next:(result: any) =>{          
        localStorage.setItem('token', result.token);
        this.router.navigateByUrl('/UserManagement');
      },
      error: (err) => {
        console.log(err);
      },
      complete: () =>{}
    })

  }

}

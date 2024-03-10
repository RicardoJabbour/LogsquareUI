import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { Login } from '../../models/Login';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    localStorage.setItem('token', "");
  }
  
  builder = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);
  authService = inject(AuthService);
  dialog = inject(MatDialog);

  loginForm = this.builder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  onLogin() {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
    const login: Login = {
      email: email,
      password: password
    };
    localStorage.setItem('user', login.email);

    this.authService.login(login).subscribe({
      next:(result: any) =>{          
        localStorage.setItem('token', result.token);
        this.router.navigateByUrl('/UserManagement');
      },
      error: (err) => {
        console.log(err);
      },
      complete: () =>{}
    });
  }

  signIn(){
    const dialogRef = this.dialog.open(AddEditUserComponent, { 
      width: '450px', 
      height: '550px', 
      data: { user: undefined, editMode: false, isSignIn: true},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe( (result: User) => {
      if(result){
        this.loginForm.setValue({
          email: result.email,
          password: result.password
        });

        this.onLogin();
      }    
    });
  }

}

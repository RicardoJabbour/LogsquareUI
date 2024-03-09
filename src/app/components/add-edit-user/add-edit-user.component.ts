import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { Result } from '../../models/Result';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  userService = inject(UserService);
  user: User ={
    id: 0,
    name: '',
    email: '',
    phone: '',
    age: 0,
    password: ''
  };

  editMode: boolean | undefined;
  
  ngOnInit() {
    console.log(this.data);
    this.user = this.data.user ?? this.user;
    this.editMode = this.data.editMode;
  }

  onSubmit() {
    if(this.editMode && this.user.email !== '' && this.user.password !== '')
      this.userService.updateUser(this.user).subscribe({
        next:(users: User[]) =>{
          this.dialogRef.close(users);         
        },
        error: (err) => {
          console.log(err);
        },
        complete: () =>{}
      });
    else if(!this.editMode && this.user.email !== '' && this.user.password !== '')
      this.userService.addUser(this.user).subscribe({
          next:(users: User[]) =>{
            this.dialogRef.close(users);         
          },
          error: (err) => {
            console.log(err);
          },
          complete: () =>{
    
          }
        });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}

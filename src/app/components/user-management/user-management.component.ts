import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExcelService } from '../../services/excel.service ';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  userService = inject(UserService);
  excelService = inject(ExcelService);
  dialog = inject(MatDialog);

  users: User[] = [];
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'age','email','phone', 'actions']; 
  config = new MatDialogConfig();
  
  ngOnInit() {
    this.userService.getUsers().subscribe({
      next:(result: User[]) =>{
            this.users.push(...result);
            this.dataSource = this.users;
           },
           error: (err) => {
            console.log(err);
           },
           complete: () =>{
    
           }
    });

  this.config.disableClose = true;

  }

  editUser(user: User){
    const dialogRef = this.dialog.open(AddEditUserComponent, { 
      width: '450px', 
      height: '550px', 
      data: { user: user, editMode: true},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataSource = [];
        this.users = [];
        this.users = result;
        this.dataSource = this.users;
      } 
    });
  }

  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe({
      next:(users: User[]) =>{
        this.dataSource = [];
        this.users = [];
        this.users = users;
        this.dataSource = this.users;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () =>{

      }
    });
  }

  exportData(){
    this.excelService.exportAsExcelFile(this.users,"users");
  }

  addUser(){
    const dialogRef = this.dialog.open(AddEditUserComponent, { 
      width: '450px', 
      height: '550px', 
      data: { user: undefined, editMode: false},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataSource = [];
        this.users = [];
        this.users = result;
        this.dataSource = this.users;
      }    
    });
  }

}

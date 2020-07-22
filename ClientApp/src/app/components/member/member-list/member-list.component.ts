import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  constructor(private userService: UserService, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(users=> {
      this.users = users;
    }, error=>{
      this.alertifyService.error(error);
    });
  }

}

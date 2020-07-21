import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
  }

  register(){
    this.authService
    .register(this.model)
    .subscribe(()=>{
      this.alertifyService.success("User Created.");
    },error=>{
      this.alertifyService.error(error);
    });
  }
}

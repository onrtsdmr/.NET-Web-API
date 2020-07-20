import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  register(){
    this._authService
    .register(this.model)
    .subscribe(()=>{
      console.log("Kullanıcı Oluşturuldu");
    },error=>{
      console.log(error);
    });
  }
}

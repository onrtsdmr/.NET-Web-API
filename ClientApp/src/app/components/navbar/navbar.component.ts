import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  model: any = {};
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this._authService.login(this.model).subscribe(next=>{
      console.log("login başarılı");
    }, error=>{
      console.log("Login baaşarıısz.");
    });
  }

  loggedIn(){
    const token = localStorage.getItem("token");
    return token?true:false;
  }

  logout(){
    localStorage.removeItem("token");
    console.log("logout");
  }
}

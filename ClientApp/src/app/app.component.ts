import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root', // html içinde ne tipte olacak.
  templateUrl: './app.component.html', // Bu componentin html dosyası
  styleUrls: ['./app.component.css'], // Bu componentin css dosyası
})
export class AppComponent implements OnInit {

  title = 'SocialApp';
  jwtHelper = new JwtHelperService();
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if(token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'http://localhost:5000/api/user/';

  constructor(private http: HttpClient) { }

  login(model: any)
  {
    return this.http
    .post(this.baseUrl+'login', model)
    .pipe(
      map((response: any)=>{
        const result = response;
        if(result){
          localStorage.setItem("token", result.token);
        }
      })
    );
  }

  register(model: any)
  {
    return this.http
    .post(this.baseUrl + "register", model);
  }

  loggedIn(){
    const token = localStorage.getItem("token");
    return token?true:false;
  }
}

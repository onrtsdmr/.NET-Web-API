import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { MemberListComponent } from './components/member/member-list/member-list.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ErrorInterceptor } from './services/error.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailsComponent } from './components/member/member-details/member-details.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    ProductFormComponent,
    ProductDetailsComponent,
    RegisterComponent,
    MemberListComponent,
    FriendListComponent,
    HomeComponent,
    MessagesComponent,
    NotfoundComponent,
    MemberDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5000"],
        disallowedRoutes: ['localhost:5000/api/auth'],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

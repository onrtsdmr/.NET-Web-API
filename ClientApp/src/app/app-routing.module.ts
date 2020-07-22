import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberListComponent } from './components/member/member-list/member-list.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { MemberDetailsComponent } from './components/member/member-details/member-details.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "members",
    component: MemberListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "members/:id",
    component: MemberDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "friends",
    component: FriendListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "messages",
    component: MessagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "**",
    component: NotfoundComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

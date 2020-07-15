import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // html içinde ne tipte olacak.
  templateUrl: './app.component.html', // Bu componentin html dosyası
  styleUrls: ['./app.component.css'] // Bu componentin css dosyası
})
export class AppComponent {
  title = 'SocialApp';

}

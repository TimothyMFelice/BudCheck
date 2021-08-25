import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/tools/authentication/authentication.service';
import { AuthService } from 'src/app/tools/authenticator/auth.service';
import { User } from 'src/app/tools/authenticator/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.getCurrentUserData().then(doc => {
      this.user = {
        uid: doc.data().userId,
        email: doc.data().email,
        displayName: doc.data().displayName,
        photoURL: doc.data().photoURL,
        emailVerified: doc.data().emailVerified,
      }
    }
    );
  }
}

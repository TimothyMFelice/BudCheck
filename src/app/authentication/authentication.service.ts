import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  public loginWithEmailAndPassword(email, password) {
    console.log(email, password);
  }
}

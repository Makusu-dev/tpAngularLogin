import { Component, inject, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { Userlogin } from '../../services/userlogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = signal('');
  password = signal('');
  // userToConnect: Signal<User>=signal<User>({email:"",password:""});
  // private readonly userService: Userlogin = inject(Userlogin);

  constructor(private readonly userService: Userlogin, private readonly router: Router){

  }

  login() {
    const userToConnect : User = {email: this.email(), password: this.password()}
    this.userService.login(userToConnect)
  }

  updateEmail(event: Event) {
    const target = event.target as HTMLInputElement;
    this.email.set(target.value);
  }

  updatePassword(event: Event) {
    const target = event.target as HTMLInputElement;
    this.password.set(target.value);
  }

}

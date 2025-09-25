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
  errorMessage = signal('');
  // userToConnect: Signal<User>=signal<User>({email:"",password:""});
  // private readonly userService: Userlogin = inject(Userlogin);

  constructor(private readonly userService: Userlogin, private readonly router: Router){
  }

  login() {
    const userToConnect : User = {email: this.email(), password: this.password(),roles: []}
    const loginSuccess = this.userService.login(userToConnect)
    if(loginSuccess){
      this.router.navigate(['/profile']);
    }
    else {
      this.errorMessage.set('Email ou mot de passe incorrect');
    }
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

import { Component, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isLoggedIn: Signal<Boolean>=signal(false);
  connectedUser: Signal<User>=signal<User>({email:"",password:""});
}

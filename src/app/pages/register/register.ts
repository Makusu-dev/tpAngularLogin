import { Component, inject, Signal, signal } from '@angular/core';
import { User } from '../../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { Userlogin } from '../../services/userlogin';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  isLoggedIn: Signal<Boolean> = signal(false);
  userToRegister: Signal<User> = signal<User>({ email: '', password: '' });
  passwordConfirm: Signal<string> = signal('');
  private readonly userService: Userlogin = inject(Userlogin);

  OnSubmit() {
    //On vérifie que le mail n'existe pas déjà
    if (this.userService.getUserByEmail(this.userToRegister().email)) {
      //TODO: afficher message d'alerte utilisateur existant
    }

    if (this.userToRegister().password == this.passwordConfirm()) {
      this.userService.register(this.userToRegister());
      this.userService.saveUsers();
    }
  }
}

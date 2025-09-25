import { Component, inject, Signal, signal } from '@angular/core';
import { User } from '../../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { Userlogin } from '../../services/userlogin';
import { JsonPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {  
  email = signal('');
  password = signal('');
  passwordConfirm = signal('');
  errorMessage = signal('');
  
  constructor(private readonly userService: Userlogin,
    private readonly router: Router) {    
  }

  OnSubmit() {
      if (this.password() == this.passwordConfirm()) {
        console.log(this.email());
      const userToRegister: User = {email: this.email(), password: this.password(), roles: ['ADMIN']}        
      const register = this.userService.register(userToRegister)

      if(register){
        this.router.navigate(["/login"])
      }
      else {
        this.errorMessage.set('Email ou mot de passe incorrect');
      }
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

  updateConfirmPassword(event: Event) {
    const target = event.target as HTMLInputElement;
    this.passwordConfirm.set(target.value);
  }
}

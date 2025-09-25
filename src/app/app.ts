import { Component, computed, inject, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { LoggedUser, User } from '../interfaces/user';
import { Userlogin } from './services/userlogin';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  protected readonly title = signal('tpLogin');
  isLoggedIn: Signal<Boolean> = signal(false);

  connectedUserEmail = computed(()=>{
    const user=this.userService.connectedUser();
    return user ? user.email : null; 
  }) 

  constructor(private readonly userService: Userlogin){
    console.log(this.isLoggedIn());    
  }    

}

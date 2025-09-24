import { Component, inject, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { User } from '../interfaces/user';
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
  connectedUser: Signal<User> = signal<User>({ email: '', password: '' });
  users!: Signal<User[]>;
  // Bonne pratique pour injecter le service adestination du constructeur ou du ngOnInit()
  private readonly userService: Userlogin = inject(Userlogin);

  ngOnInit(userService: Userlogin) {
    this.users = this.userService.getUsers();
  }

  currentUserEmail() {
    this.userService.getConnectedUser();
  }
}

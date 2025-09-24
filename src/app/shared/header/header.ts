import { Component, computed, input, signal, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Userlogin } from '../../services/userlogin';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  userEmail=input<string | null>(null);
  isLoggedIn = computed(()=>this.userEmail() !== null)
  currentUserEmail = computed(()=> this.userEmail());


  constructor(private readonly loginservice: Userlogin, private readonly router: Router){

  }

  logout(){
    this.loginservice.logout();
    this.router.navigate(["/login"])
  }



}

import { Component, computed, input, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  userEmail=input<string | null>(null);
  isLoggedIn = computed(()=>user.email!=null)
}

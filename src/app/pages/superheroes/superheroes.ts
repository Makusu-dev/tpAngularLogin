import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { SuperheroApi } from '../../services/superhero-api';
import { Hero } from '../../interfaces/hero-api';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-superheroes',
  imports: [],
  templateUrl: './superheroes.html',
  styleUrl: './superheroes.css'
})
export class Superheroes {
  superHeroes = signal<Hero[]>([]);
  private heroApi : SuperheroApi = inject(SuperheroApi);
  private router = inject(Router)

  openHeroPage(id: number){
    this.router.navigate(["/superheroes/"+id])    
  }


  ngOnInit() {
    this.heroApi.getSHeroes().subscribe({
      next: data => {
        this.superHeroes.set(data)
      },
      error: error =>  {
        console.log(error);        
      }
    })
  }

}

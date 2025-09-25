import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Hero } from '../../interfaces/hero-api';
import { SuperheroApi } from '../../services/superhero-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-superhero',
  imports: [],
  templateUrl: './superhero.html',
  styleUrl: './superhero.css'
})
export class Superhero {
  private route = inject(ActivatedRoute)
  superHero= signal<Hero | null> (null);
  private heroApi : SuperheroApi = inject(SuperheroApi);
  

  onNgInit(){
    const heroId = this.route.snapshot.params['id'];
    this.heroApi.getHero(+heroId).subscribe({
      next: data => {
        this.superHero.set();
      },
      error: error =>{
        console.log(error);
        
      }
    })
  }

}

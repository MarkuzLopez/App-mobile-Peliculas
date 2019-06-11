import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  favoritoGenero: any[] = [];
  constructor(private dataLocalSerbic: DataLocalService,
              private movieSevice: MoviesService) {}

  ngOnInit() { }

  // ciclo de vida de Ionic
  async ionViewWillEnter() {
    this.peliculas =  await this.dataLocalSerbic.cargarFavoritos();
    this.generos = await this.movieSevice.cargarGeneros();
    console.log(this.peliculas);

    this.peliPorGenero(this.generos, this.peliculas);
  }

  peliPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {

    this.favoritoGenero = [];

    generos.forEach( genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( pelis => {
          return pelis.genres.find( genre => genre.id === genero.id);
        })
      });
    });
    console.log(this.favoritoGenero);
  }

}

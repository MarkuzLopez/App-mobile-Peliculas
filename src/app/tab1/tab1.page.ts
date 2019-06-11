import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { RespuestaMovieDB, Peliculas } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // slideOpts = {
  //   slidesPerView: 1.2,
  //   freMode: true
  // };

  peliculasRecientes: Peliculas[] = [];
  populares: Peliculas [] = [];

  constructor(private movieService: MoviesService) {

  }

  ngOnInit() {
    this.movieService.getFeature().subscribe( (resp: RespuestaMovieDB) =>  {
      this.peliculasRecientes = resp.results;
    });
    this.obtenerPopulares();
  }

  obtenerPopulares() {
     this.movieService.getPopulares().subscribe( resp => {
       const arrTemp  = [...this.populares, ...resp.results]; // * se concatenaas lkos valores para que muesstra aalgo al inicio
       this.populares = arrTemp;
     });
  }

  cargarMas() {
    this.obtenerPopulares();
  }

}

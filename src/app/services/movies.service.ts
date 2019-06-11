import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMovieDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularPage = 0;
  geneross: Genre[] = [];

  constructor(private htttp: HttpClient) { }

  cargarGeneros(): Promise<Genre[]> {
    return new Promise (resolve => {
      this.ejecutarQuery(`/genre/movie/list?a=1`)
          .subscribe( resp => {
            console.log(resp);
            this.geneross = resp['genres'];
            resolve(this.geneross);
          });
    });
  }

  buscarPelicula(movie: string) {
    return this.ejecutarQuery(`/search/movie?query=${movie}`);
  }

  getActoresPelicula(id: string) {
    /// /credit/{credit_id}
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  getPeliculaDetalle(id: string) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getPopulares() {
    this.popularPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularPage}`;
    return this.ejecutarQuery<RespuestaMovieDB>(query);
  }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    // console.log(query);
    return this.htttp.get<T>(query);
  }

  getFeature() {
    const hoy = new Date();
    const ultimoDia =  new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;
    // console.log(ultimoDia);
    // console.log(mes);

    let mesString;

    if (mes < 10) {
       mesString = '0' + mes;
       // console.log(mesString);
    } else {
      mesString = mes;
      // console.log(mesString);
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMovieDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle;
  actores: Cast [] = [];
  oculto = 150;
  // exisste: boolean;
  estrella: string;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: 5
  };

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController,
              private dataLocal: DataLocalService) { }

  ngOnInit() {

    this.dataLocal.existePeliculas(this.id)
        .then(existe => this.estrella = (existe)  ? 'star' : 'star-outline');

    // const existe =  await this.dataLocal.existePeliculas(this.id);
    // console.log('Detalle component existe: ', existe);
    // this.exisste = existe;
  //  console.log(this.id);
    this.moviesService.getPeliculaDetalle(this.id).subscribe(resps => {
      // console.log(resps);
      this.pelicula = resps;
    });

    this.moviesService.getActoresPelicula(this.id)
        .subscribe(rep =>  {
          // console.log(rep);
          this.actores =  rep.cast;
        });
  }

  favoritos() {
    const existe  = this.dataLocal.guardarPelicula(this.pelicula);
    this.estrella =  (existe)  ? 'star' : 'star-outline';
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

}

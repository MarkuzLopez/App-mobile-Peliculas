import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Peliculas } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetallesComponent } from '../components/detalles/detalles.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
 textoBuscar = '';
 hayValor = false;
 ideas = ['Spiderman', 'Avenger', 'El Señor de los anillos', 'La vidaa es bella'];
 peliculas: Peliculas [] = [];
  constructor(private movieService: MoviesService, private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  buscar(event) {
    // console.log(event.detail.value);
    const valor: string = event.detail.value;
    this.hayValor = true;
    if (valor.length === 0) {
      this.hayValor = false;
      this.peliculas = [];
      return;
    }
    this.movieService.buscarPelicula(valor).subscribe((res: any) => {
    //  console.log(res);
      this.peliculas = res.results;
      this.hayValor = false;
    });
  }

 async verDetalle(id: string) {
    const modal =  await this.modalCtrl.create({
      component: DetallesComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { MenuService, DataImgHot } from '../../services/menu.service';
import { ImagenHot } from '../../models/ImagenHot';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
declare var $:any; 

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit {
  origen = "url";
  imagenes: ImagenHot[];
  cargar = true;   

  dataImgHot : DataImgHot = {
    ImaPath: "",
    ImaTitulo: "",
    ImaIsLink: true
  } 

  constructor(
    private _menuService: MenuService,
    private router: Router,
    private _route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
    let ImaTitulo = params.ImaTitulo;
      this.dataImgHot.ImaTitulo = ImaTitulo;
      this.getImags(ImaTitulo);
    });  
  }

  addImg(){
    if(this.origen == "url"){
       this._menuService.addImg(this.dataImgHot).subscribe(()=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Imagen guardada, correctamente',
            showConfirmButton: false,
            timer: 1500
          });  
       }, error=>{
           Swal.fire(
             'Error, al Intentar Guardar imagen',
             'error'
            )
       });
    }else{
      Swal.fire(
        'Funcionalidad en contrucción',
        'error'
       )

    }
  }

  getImags(ImaTitulo){
    //console.log(ImaTitulo);
    this._menuService.getImgs(ImaTitulo).subscribe(
      response =>{
        console.log(response);
        this.imagenes = response;
        this.cargar = false;
        
      },
      error =>{
        console.log(<any>error);
      });
  }
}

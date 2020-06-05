import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { MenuService, DataMenu } from '../../services/menu.service';
import { Menu } from '../../models/menu';
import { Imagen } from '../../models/imagen';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
declare var $:any; 

@Component({
  selector: 'app-editmenu',
  templateUrl: './editmenu.component.html',
  styleUrls: ['./editmenu.component.css']
})
export class EditmenuComponent implements OnInit {
  public menu: Menu;
  public datamenu: DataMenu ={
    menTitulo: '',
    Imagen: '',
    menIsHot: false,
    menEstado: 1
} 

  constructor(  
    private _menuService: MenuService,
    private _router: Router,
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id = params.id;
          this.getMenu(id);
    });
  }

  getMenu(id){
    this._menuService.getMenu(id).subscribe(
      response =>{
        this.datamenu = response;
      },
      error =>{
        console.log(<any>error);
      });
  }

  updateMenu(){
    this._menuService.updateMenu(this.datamenu).subscribe(
      () =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Menu Actualizado, correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          this._location.back(); 
        }, 1500);
      },error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error, al Intentar actualizar menu',
          showConfirmButton: false,
          timer: 1500
        });      
      });      
  }
}

import { Component, OnInit } from '@angular/core';
import { MenuService, DataMenu } from '../../services/menu.service';
import { Menu } from '../../models/menu';
import { Imagen } from '../../models/imagen';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $:any; 

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css']
})
export class AddmenuComponent implements OnInit {
  public menus: Menu[];
  public imagenes: Imagen[];
  public menu: FormGroup;
  submitted = false;
  cargar = true;
  opcion: any;
  
  public datamenu: DataMenu ={
      menTitulo: '',
      Imagen: '',
      menIsHot: false,
      menEstado: 1
  } 
  
  constructor(
    private _menuService: MenuService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {

   }
  
  ngOnInit(): void {
    this.getImagenes(); 
  }

  getImagenes(){
    this._menuService.getImagenes().subscribe(
      response =>{
        if(response){
          this.imagenes = response;   
          for (let img of response){
            let opcion = $("#opcionImg").append('<option class="fa" style="font-size:35px;color:#174367" [value]="' + img.icoApp + '"' + '>&#x' + img.icoApp + '</option>' );
            //console.log(opcion); 
          }
          
        }
      },
      error =>{
        console.log(<any>error);
      });
      return this.imagenes;
 }

 addMenu(){  
    this._menuService.addMenu(this.datamenu).subscribe(()=>{
         Swal.fire({
           position: 'center',
           icon: 'success',
           title: 'Menu Insertado, correctamente',
           showConfirmButton: false,
           timer: 1500
         });  
         setTimeout(()=>{
          $("#addMenu").modal('hide'); 
         },1000);  
    },err =>{
      console.log(<any>err);
          Swal.fire(
           'Error, al Intentar insertar menu',
           'error'
          )
    }); 
 }
}

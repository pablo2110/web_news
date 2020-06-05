import { Component, OnInit } from '@angular/core';
import { MenuService, DataMenu } from '../../services/menu.service';
import { Menu } from '../../models/menu';
import { Imagen } from '../../models/imagen';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $:any; 

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public menus: Menu[];
  public imagenes: Imagen[];
  public menu: FormGroup;
  submitted = false;
  cargar = true;
  public maxSizePagination: string = '6';
  filtroMenu='';
  
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
    private modalService: NgbModal 
  ) {

    }
  
    public paginationConfig: PaginationInstance = {
      id: 'advanced',
      itemsPerPage: 12,
      currentPage: 1
    };

    private labels: object = {
      previousLabel: 'Back',
      nextLabel: 'Next',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
    };

    private onPageChange(number: number) {
      this.paginationConfig.currentPage = number;
    }

  ngOnInit(): void {
    this.getMenus();
  }
     
  getMenus(){
   this._menuService.getMenus().subscribe(
     response =>{
       if(response){
         this.menus = response;
         this.cargar =false;     
       }
     },
     error =>{
       console.log(<any>error);
     });
  }

}

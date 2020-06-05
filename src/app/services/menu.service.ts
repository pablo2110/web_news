import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Swagger } from '../rutas/swagger';

export interface DataMenu{
   menTitulo: string;
   Imagen: string;
   menIsHot: boolean;
   menEstado: number;
  } 
   
  export interface DataImgHot{
    ImaPath: string;
    ImaTitulo: string;
    ImaIsLink: boolean;
   } 

@Injectable({
  providedIn: 'root'
})
export class MenuService {
public url : string;

  constructor(
        private _http: HttpClient
  ) {
       this.url = Swagger.url;
   }

   getMenus():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
   
    return this._http.get(this.url +'Menu',{ headers: headers});
   }

   getImagenes():Observable<any>{
     let headers = new HttpHeaders().set('Content-Type', 'application/json');

     return this._http.get(this.url +'Menu/Iconos',{ headers: headers});
   }

   addMenu(menu:DataMenu):Observable<any>{
       return this._http.post(this.url +'Menu', menu);
   }

   getMenu(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
   
    return this._http.get(this.url +'Menu/'+ id,{ headers: headers});
   }

   updateMenu(menu:DataMenu):Observable<any>{
		return this._http.post(this.url+'Menu/Actualizar', menu);
   }

   addImg(imgHot:DataImgHot):Observable<any>{
    return this._http.post(this.url +'Noticias/PostHotImagenes', imgHot);
  }

  getImgs(ImaTitulo):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
   
    return this._http.get(this.url +'Noticias/GetHotImagenes'+ImaTitulo,{ headers: headers}); 
  }
}

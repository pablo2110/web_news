import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ErrorComponent } from './components/error/error.component';
import { EditmenuComponent } from './components/editmenu/editmenu.component';
import { ImagenComponent } from './components/imagen/imagen.component';
import { LoginComponent } from './components/login/login.component';

import { from } from 'rxjs';

const appRoutes: Routes = [
	{path: 'login', component: LoginComponent},
	{path: 'home', component: HomeComponent},
	{path: 'menu', component: MenuComponent},
	{path: 'editmenu/:id', component: EditmenuComponent},
	{path: 'imagen/:ImaTitulo', component: ImagenComponent},
	{path: '**', component: ErrorComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
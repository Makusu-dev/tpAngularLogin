import { Routes } from '@angular/router';
import { Userlogin } from './services/userlogin';
import { inject } from '@angular/core';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
    {path: '', redirectTo: "/home", pathMatch:"full"},
    {path: 'home', loadComponent: ()=> import("./pages/home/home").then(m =>m.Home)},
    {path: 'contact', loadComponent: ()=> import("./pages/contact/contact").then(m =>m.Contact)},
    {path: 'profile',canActivate: [() => inject(Userlogin).isLoggedIn], loadComponent: ()=> import("./pages/profile/profile").then(m =>m.Profile)},
    {path: 'login', loadComponent: ()=> import("./pages/login/login").then(m =>m.Login)},
    {path: 'register', loadComponent: ()=> import("./pages/register/register").then(m =>m.Register)},
    {path: 'superheroes', loadComponent: ()=> import("./pages/superheroes/superheroes").then(m =>m.Superheroes)},
    {path: 'superheroes/:id', loadComponent: ()=> import("./pages/superhero/superhero").then(m =>m.Superhero)},
    {path: 'admin',canActivate: [adminGuard], loadChildren: () => import('./pages/admin/admin.routes.js').then(m => m.ADMIN_ROUTES), data: { role: 'ADMIN' } },
    {path: '**',loadComponent: ()=> import("./pages/not-found/not-found").then(m =>m.NotFound) }
];

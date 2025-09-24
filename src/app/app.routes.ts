import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { Profile } from './pages/profile/profile';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { Register } from './pages/register/register';

export const routes: Routes = [
    {path: '', redirectTo: "/home", pathMatch:"full"},
    {path: 'home', component: Home},
    {path: 'contact', component: Contact},
    {path: 'profile', component: Profile},
    {path: 'login', component: Login},
    {path: 'register', component: Register },
    {path: '**',component: NotFound }
];

import { Injectable, Signal, signal } from '@angular/core';
import { User } from '../../interfaces/user';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Userlogin {
  private connectedUser = signal<User>({email:"",password:""})
  private users = signal<User[]>([]); 
  usersToComponent = this.users.asReadonly(); 

  getUsers(): Signal<User[]> {
    return this.usersToComponent;
  }

  getConnectedUser(){
    return this.connectedUser;
  }

  getUserByEmail(userEmail: string): User {
    //Attention le resultat peux être undefined
    return this.users().find(user=>user.email==userEmail)!;
  }

  register(user: User): boolean{    
    this.users.update(users=>[...users,user])
    return true;
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users()))
  }

  login(userToConnect: User): boolean {
    const userToCheck = this.getUserByEmail(userToConnect.email);
    if(userToCheck.password==userToConnect.password){
      sessionStorage.setItem('connectedUser',JSON.stringify(userToConnect.email))
      return true;
    }
    else{
      return false
    }
  }

  logout(){
    sessionStorage.removeItem('connectedUser')
  }
}

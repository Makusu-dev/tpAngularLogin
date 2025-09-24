import { Injectable,  signal } from '@angular/core';
import { LoggedUser, User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class Userlogin {
  private connectedUserSignal = signal<LoggedUser|null>(null);
  private users = signal<User[]>([]); 
  
  constructor(){
    this.loadStoredData();
  }

  private loadStoredData(){
    const storedUser = sessionStorage.getItem('connectedUser');
    if(storedUser) {
      this.connectedUserSignal.set(JSON.parse(storedUser))
    }
    const storedUsers = localStorage.getItem("users");
    if(storedUsers){
      this.users.set(JSON.parse(storedUsers));
    }
  }

  public get connectedUser() {
    return this.connectedUserSignal.asReadonly();
  }

  public get isLoggedIn(){
    return this.connectedUserSignal() !== null;
  }

  getUserByEmail(userEmail: string): User {
    //Attention le resultat peux être undefined
    return this.users().find(user=>user.email==userEmail)!;
  }

  register(user: User): boolean{ 
    console.log("time to save users");
    
    if(this.users().find(u => u.email===user.email)){
      console.log("seem to be such a user already"+user.email);
      
      return false;
    }   

    this.users.update(users=>[...users,user])
    this.saveUsers();
    return true;
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users()))
  }

  login(userToConnect: User): boolean {
    
    const userToCheck = this.getUserByEmail(userToConnect.email);
    if(!userToCheck){
      return false;
    }
    else if(userToCheck.password==userToConnect.password){
      const userStoreData: LoggedUser =  { email: userToConnect.email,
        token: 'fake-jwt'+Date.now()
      }
      sessionStorage.setItem('connectedUser',JSON.stringify(userStoreData))
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

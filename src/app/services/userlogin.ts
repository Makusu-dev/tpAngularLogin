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
 //################################ LOGIN/LOGOUT ###############################
  login(userToConnect: User): boolean {
    
    const userToCheck = this.getUserByEmail(userToConnect.email);

    console.log("User has been found : " + userToCheck.email);
    

    if(!userToCheck){
      console.log("No such user");
      return false;     
    }
    else if(userToCheck.password==userToConnect.password){
      console.log("password is ok");
      //ATTENTION: ici il faut stocker le isAdmin de userToCheck parce que
      // l'information sur le role est récupérée lors du getUser
      const userStoreData: LoggedUser =  { email: userToConnect.email,
        token: 'fake-jwt'+Date.now(), roles: userToCheck.roles
      }
      sessionStorage.setItem('connectedUser',JSON.stringify(userStoreData))
      this.connectedUserSignal.set(userStoreData);
      return true;
    }
    else{
      console.log("password doesn't seem right");      
      return false
    }
  }

  logout(){
    sessionStorage.removeItem('connectedUser');
    this.connectedUserSignal.set(null);
  }

  //########################################## ROLES ######################################

  hasRole(requiredRole: string){
    if(this.connectedUser()?.roles.find(el => el == requiredRole)!==undefined){
      return true
    }
    else{
      return 
    }
  }



}

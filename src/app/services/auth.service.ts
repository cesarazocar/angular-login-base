import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url ="http://localhost:3000"
  userToken:string;

  

  //crear nuevo usuario
  //https://
  //Login
  //https://

  constructor(private http: HttpClient) { 

    this.leerToken();

  }

  logout(){

  }
  login(usuario:UsuarioModel){
    const authData = {
      ...usuario // al ser los mismos datos  con "..." resume la informacion  (email:usuario.email, password: usuario.password)
    }
    return this.http.post(
      `${this.url}/signin`,
      authData
    ).pipe(      
      map((resp)=>{
        console.log('Entro en el mapa del RXJS');
        
        this.guardarToken( resp['token']);
        return resp;
      })

      );
  }
  nuevoUsuario(usuario:UsuarioModel){

    const authData = {
      ...usuario // al ser los mismos datos  con "..." resume la informacion  (email:usuario.email, password: usuario.password)
    }
    return this.http.post(
      `${this.url}/signup`,
      authData
    ).pipe(      
      map((resp)=>{
        console.log('Entro en el mapa del RXJS');
        
        this.guardarToken( resp['token']);
        return resp;
      })

      );
  }

  private guardarToken( idToken:string ){
    this.userToken = idToken;
    localStorage.setItem('token',idToken);
     
  }
  
  leerToken(){
    
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken='';
    }

    return this.userToken;
  }
  
  estaAutenticado(): boolean{

    
    return this.userToken.length > 2;
  }
}

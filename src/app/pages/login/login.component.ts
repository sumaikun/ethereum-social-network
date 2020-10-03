import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from "@ngrx/store";
import { AuthActions } from "../../store/actions";
import { selectError, selectEntityLoaded, selectToken } from "../../store/selectors/auth";
import Swal from 'sweetalert2' 
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  username: string = '';
  password: string = '';
  error$ = this.store.pipe(select(selectError));
  loaded$ =  this.store.pipe(select(selectEntityLoaded));
  token$ = this.store.pipe(select(selectToken));
  
  
  constructor(private store: Store<any>,private router: Router) {}

  ngOnInit() {

    this.store.dispatch(AuthActions.offLoad())

    this.loaded$.subscribe( loaded => { 
      console.log("loaded",loaded)
      let self = this
      if(loaded){

        setTimeout(function(){ self.router.navigate(['dashboard']) }, 1000);   
        return Swal.fire(
          '',
          'Bienvenido',
          'success'
        );
         
      }     
      
    })


    this.username = ""
    this.password = ""  

    //this.token$.subscribe ( token => console.log("token",token))

    this.error$.subscribe( data => { 
      
      console.log("error",data)
      
      if(data)
      {
        if(data.status == 401){
          return Swal.fire(
            'Espera',
            'Las credenciales no son correctas',
            'warning'
          );
        }
        else{
          return Swal.fire(
            'Espera',
            'Sucedio un error con el servidor',
            'error'
          );
        }
        
      }
      
    })
  }

  ngOnDestroy() {
  }

  authenticate(){
    console.log(this.username,this.password)
    
    this.store.dispatch(AuthActions.auth({
      username:this.username,
      password:this.password
    }))    

  }

}

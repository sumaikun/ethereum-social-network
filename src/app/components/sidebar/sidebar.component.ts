import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectUser } from 'src/app/store/selectors/auth';
import { environment } from '../../../environments/environment'

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/users', title: 'Usuarios',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/participants', title: 'Proveedores',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/contracts', title: 'Contratos',  icon:'ni-cart text-pink', class: '' },
    /*{ path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  user$ =  this.store.pipe(select(selectUser));
  userName:string
  userPicture:string

  constructor(private router: Router,  private store: Store<any>) { }

  ngOnInit() {    
    
    this.userPicture = environment.defaultImage

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });

   this.user$.subscribe( user => {
    this.userName = user.name+" "+user.lastName

    if(user.picture)
    {
      this.userPicture = environment.imagesUrl+user.picture
    }
  })
  }
}

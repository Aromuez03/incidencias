import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuariosService } from '../../shared/services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate{
  rolActual: string = 'Sin-rol';
  constructor(
        private usuariosService: UsuariosService,
        private auth: AuthService,
        private router: Router
        ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.router.getCurrentNavigation);
      return this.checkUserLogin(route); 
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    this.rolActual = this.usuariosService.getRolActual();

    if(this.rolActual === route.data["role"])
        return true;
    else{
        console.log(this.rolActual);
        this.router.navigate(['/login']);
        return false;
    }
  }
  
  
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuariosService } from '../../shared/services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class DirectivoGuard implements CanActivate{
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
      this.auth.isAuthenticated().subscribe(
        res => {
          console.log("[DirectivoGuard]: Comprobando si esta logueado con un rol correcto...");
          if (res && res.uid) {
            this.usuariosService.getUser(res.email).subscribe(
              (res: any[])  => {
                console.log("Comprobando el rol");
                res.forEach( dataUser => {
                  this.eresDirectivo(dataUser.rol);
                });
              }
            )
            return true;
          } else {
            console.log('Usuario no logueado!');
            this.router.navigate(['/login']);
            return false;
          }
        }
      );
      return true;
    }
  
    eresDirectivo(rol: string): boolean {
      if(rol === "directivo") {
        return true;
      }else{
        this.router.navigate(['/IntInc']);
        return false;
      }
    }


  
  
}

import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { SystemConstants } from '../common/system.constants';
import { UrlConstants } from '../common/url.constants';

@Injectable()
export class AuthenGuard implements CanActivate {
    constructor(private router: Router) {

    }

    canActivate(activeRoute: ActivatedRouteSnapshot, routeState: RouterStateSnapshot): boolean {
        if (localStorage.getItem(SystemConstants.CURRENT_USER)) {
            return true;
        }
        else {
            this.router.navigate([UrlConstants.LOGIN], {
                queryParams: {
                    returnUrl: activeRoute.url
                }
            });
            return false;
        }

    }
}
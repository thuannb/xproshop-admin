import { Routes } from '@angular/router';
import { AuthenGuard } from './core/guards/authen.guard';

export const appRoutes: Routes = [
    //localhost:4200
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    //localhost:4200/login
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    //localhost:4200/main
    { path: 'main', loadChildren: './main/main.module#MainModule', canActivate: [AuthenGuard] }
]
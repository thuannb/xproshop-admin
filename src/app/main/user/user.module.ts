import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { FormsModule } from '@angular/forms';
import { ModalModule, PaginationModule } from 'ngx-bootstrap';
import { UploadService } from '../../core/services/upload.service';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Daterangepicker } from 'ng2-daterangepicker';

const userRoutes: Routes = [
   //localhost:4200/main/user
  { path: '', redirectTo: 'index', pathMatch: 'full' },
   //localhost:4200/main/user/index
  { path: 'index', component: UserComponent }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    MultiselectDropdownModule,
    Daterangepicker,
    ModalModule.forRoot(),
    RouterModule.forChild(userRoutes)
  ],
  providers: [DataService, NotificationService, UploadService],
  declarations: [UserComponent]
})
export class UserModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AuthenGuard } from './core/guards/authen.guard';
import { PaginationModule } from 'ngx-bootstrap/pagination';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PaginationModule.forRoot(),
    
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [AuthenGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonHttpRequestInterceptor } from './clients/CommonHttpRequestInterceptor';
import { API_BASE_URL, Client } from './clients/system-api/UserApiClient.gen';
import { environment } from '../environments/environment';
import { MatTabsModule} from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    //MatDatepickerModule,
    [
      { provide: HTTP_INTERCEPTORS, useClass: CommonHttpRequestInterceptor, multi: true },
      {
        provide: API_BASE_URL,
        useValue: environment.apiUrl
      },
    ],
    //{ provide: MAT_DIALOG_DATA, useValue: {} }
    Client
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment.prod';
import {AngularFireStorage} from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { IncomeListComponent } from './income/income-list/income-list.component';
import { IncomeCreateComponent } from './income/income-create/income-create.component';
import { IncomeUpdateComponent } from './income/income-update/income-update.component';
import { IncomeDeleteComponent } from './income/income-delete/income-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IncomeListComponent,
    IncomeCreateComponent,
    IncomeUpdateComponent,
    IncomeDeleteComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        BrowserAnimationsModule,
        MatProgressSpinnerModule
    ],
  providers: [
    AngularFireStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

export const firebaseConfig = {
  apiKey: "AIzaSyB2Hgp20iMiTNDAHToSNrwaX3xkqF5t3AU",
  authDomain: "todolistionic-4f83a.firebaseapp.com",
  databaseURL: "https://todolistionic-4f83a.firebaseio.com",
  projectId: "todolistionic-4f83a",
  storageBucket: "todolistionic-4f83a.appspot.com",
  messagingSenderId: "377259368536",
  appId: "1:377259368536:web:2c30995740df1c19732a2d",
  measurementId: "G-5EWRB91CWR"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


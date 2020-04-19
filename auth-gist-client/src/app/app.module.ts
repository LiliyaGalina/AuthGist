import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsAdalAngular6Module } from 'microsoft-adal-angular6'; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsAdalAngular6Module.forRoot({  
      tenant: 'f9092631-0875-488f-8d8a-6b7fd832220e',  
      clientId: '9a044b23-30fa-4055-a2ae-480df0ed4093',  
      redirectUri: 'http://localhost:4200/',  
      endpoints: {  
        'api application url': 'be807724-1b9c-41ea-9080-5ba05f25355c',
         // this is for feteching the access token  
      },  
      navigateToLoginRequestUrl: false,  
      cacheLocation: '<localStorage / sessionStorage>',  
      postLogoutRedirectUri: 'http://localhost:4200/',  
    }),  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

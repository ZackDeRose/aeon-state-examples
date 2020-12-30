import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(() => {}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'Aeon State Examples App',
      maxAge: 2500,
      logOnly: true,
    }),
    RouterModule.forRoot([
      {
        path: 'aeons',
        loadChildren: () =>
          import('@aeon-state-examples/aeon-feature').then(
            (m) => m.AeonFeatureModule
          ),
      },
    ]),
    AngularFireModule.initializeApp({
      apiKey: '',
      authDomain: '',
      projectId: 'aeons',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: '',
    }),
  ],
  providers: [
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: ['localhost', 8080],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

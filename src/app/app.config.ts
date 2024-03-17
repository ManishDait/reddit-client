import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { TokenTnterceptor } from './token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(ToastrModule.forRoot()),
    importProvidersFrom(NgxWebstorageModule.forRoot()),
    provideToastr(),
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenTnterceptor,
      multi:true
    }
  ]
};

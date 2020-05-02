import { BrowserModule } from "@angular/platform-browser";
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { AboutComponent } from './component/about/about.component';
import { RecuitmentComponent } from './component/recuitment/recuitment.component';
import { RateComponent } from './component/rate/rate.component';
import { NewstemplateComponent } from './component/newstemplate/newstemplate.component';
import { AuthGuard } from './auth.guard';
import { MediatorComponent } from './component/mediator/mediator.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { MyadsComponent } from './component/myads/myads.component';
import { AdslistComponent } from './component/adslist/adslist.component';
import { AccountVerificationComponent } from './component/account-verification/account-verification.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { PickNewsComponent } from './component/pick-news/pick-news.component';
import { MyPublishedAdsComponent } from './component/my-published-ads/my-published-ads.component';
import { ProfileNavComponent } from './component/profile-nav/profile-nav.component';
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
// import {MatDialogModule} from '@angular/material/dialog';
import { NewsImgComponent } from './component/news-img/news-img.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    RecuitmentComponent,
    RateComponent,
    NewstemplateComponent,
    MediatorComponent,
    UserProfileComponent,
    MyadsComponent,
    AdslistComponent,
    AccountVerificationComponent,
    EditProfileComponent,
    PickNewsComponent,
    MyPublishedAdsComponent,
    ProfileNavComponent,
    NewsImgComponent,
 
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule,NgxSpinnerModule],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [PickNewsComponent,NewsImgComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { EmbedVideo } from "ngx-embed-video";

import { AppComponent } from "./app.component";
import { DataService } from "./services/data.service";
import { LaunchesComponent } from "./components/launches/launches.component";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { SearchInputComponent } from "./components/search-input/search-input.component";
import { LaunchComponent } from "./components/launch/launch.component";

@NgModule({
  declarations: [
    AppComponent,
    LaunchesComponent,
    SearchInputComponent,
    LaunchComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    EmbedVideo
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}

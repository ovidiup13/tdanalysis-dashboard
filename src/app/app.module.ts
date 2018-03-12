import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

// components
import { AppComponent } from "./app.component";

// services
import { DataService } from "./services/data-service.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JudgeService } from './shared/judge/judge.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { JudgeListComponent } from './judge-list/judge-list.component';

@NgModule({
  declarations: [
    AppComponent,
    JudgeListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [JudgeService],
  bootstrap: [AppComponent]
})

export class AppModule { }

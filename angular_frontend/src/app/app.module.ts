import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JudgeService } from './shared/judge/judge.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { JudgeListComponent } from './judge-list/judge-list.component';
import { JudgeEditComponent } from './judge-edit/judge-edit.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/judge-list', pathMatch: 'full' },
  {
    path: 'judge-list',
    component: JudgeListComponent
  },
  {
    path: 'judge-add',
    component: JudgeEditComponent
  },
  {
    path: 'judge-edit/:id',
    component: JudgeEditComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    JudgeListComponent,
    JudgeEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [JudgeService],
  bootstrap: [AppComponent]
})

export class AppModule { }

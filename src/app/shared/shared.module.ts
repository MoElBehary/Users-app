import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoulmnOneComponent } from './layouts/coulmn-one/coulmn-one.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { NgProgressModule } from 'ngx-progressbar'

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AlertModule } from 'ngx-alerts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [CoulmnOneComponent, HeaderComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgProgressModule,
    BrowserAnimationsModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    // Specify your library as an import (set timeout to -1 for unlimited timeout, the message can only be closed by the user clicking on it)
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, position: 'right' })
  ],
  exports: [CoulmnOneComponent]
})
export class SharedModule { }

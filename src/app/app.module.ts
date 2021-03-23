import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadModule } from '@progress/kendo-angular-upload';
import { HttpClientModule } from '@angular/common/http';
import {GridModule, RowFilterModule, SharedModule} from '@progress/kendo-angular-grid';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { FieldComponent } from './components/field/field.component';
import {ButtonModule} from "@progress/kendo-angular-buttons";







@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    SearchResultComponent,
    EditDialogComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputsModule,
    BrowserAnimationsModule,
    UploadModule,
    HttpClientModule,
    GridModule,
    SharedModule,
    DialogsModule,
    RowFilterModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

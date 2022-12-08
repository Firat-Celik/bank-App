import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { DataService } from "./services/data.service";
import { DepositMoneyDialogComponent } from "./dialogs/depositMoney/depositMoney.dialog.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { DecimalValidation } from "./decimalValidation";
import {WithdrawMoneyDialogComponent} from "./dialogs/withdrawMoney/withdrawMoney.dialog.component";
@NgModule({
  declarations: [
    AppComponent,
    DepositMoneyDialogComponent,
    WithdrawMoneyDialogComponent,
    DecimalValidation,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}


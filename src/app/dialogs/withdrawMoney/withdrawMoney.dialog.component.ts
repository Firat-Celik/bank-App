import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import Swal from "sweetalert2";
@Component({
  selector: 'app-baza.dialog',
  templateUrl: 'withdrawMoney.dialog.html',
  styleUrls: ['withdrawMoney.dialog.css']
})
export class WithdrawMoneyDialogComponent {

  //region Constructor
  constructor(public dialogRef: MatDialogRef<WithdrawMoneyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService ) { }

  amount: any;
  //endregion

  //region Metots
  onNoClick(): void {
    this.dialogRef.close();
  }

  successNotification() {
    Swal.fire({
      title: 'İşlem Başarılı',
      text: 'Hesap bilgileriniz güncellenmiştir.',
      timer: 2500,
      icon:'success'
    });

  }

  async onAppClick() {
    try {
      await this.dataService.DepositMoney(this.data.hesapNo, this.amount);
      setTimeout(() =>
          this.successNotification(),
        // @ts-ignore
        this.dialogRef.close()
        ,2000);

    }catch {
      alert("İşlem Başarısız!. Bir Sorun oluştu.")
    }
    // zaman kısıtlı olduğu için şimdilik try catch ile Error kontrolü sağladım.
  }
  //endregion
}

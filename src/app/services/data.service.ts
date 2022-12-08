import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Issue } from "../models/issue";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class DataService {
  private readonly API_URL = "https://localhost:7127/Account";

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) {}

  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAccounts(): void {
    this.httpClient.get<Issue[]>(this.API_URL + "/GetAccounts").subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  async DepositMoney(hesapNo: number, Tutar: number) {
    let formData: any = new FormData();
    formData.append("hesapNo", hesapNo);
    formData.append("Tutar", Tutar);
    const result = await this.httpClient.post(
      `${this.API_URL}/DepositMoney`,
      formData
    );

    return true;
  }

  async WithdrawMoney(hesapNo: number, Tutar: number) {
    let formData: any = new FormData();
    formData.append("hesapNo", hesapNo);
    formData.append("Tutar", Tutar);
    const result = await this.httpClient.post(
      `${this.API_URL}/WithdrawMoney`,
      formData
    );

    return true;
  }
}

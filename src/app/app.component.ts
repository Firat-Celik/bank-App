import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from './services/data.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Issue} from './models/issue';
import {DataSource} from '@angular/cdk/collections';
import {DepositMoneyDialogComponent} from './dialogs/depositMoney/depositMoney.dialog.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {WithdrawMoneyDialogComponent} from "./dialogs/withdrawMoney/withdrawMoney.dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  //region Constructor
  displayedColumns = ['hesapNo', 'hesapAdi', 'bakiye', 'paraBirimi', 'actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  hesapNo: number;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DataService) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;
  //endregion

  //region Metots
  ngOnInit() {

    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  depositMoney(i: number, hesapNo: number, hesapAdi: string, bakiye: string, paraBirimi: string) {
    this.hesapNo = hesapNo;
    const dialogRef = this.dialog.open(DepositMoneyDialogComponent, {
      data: {hesapNo: hesapNo, hesapAdi: hesapAdi, bakiye: bakiye, paraBirimi: paraBirimi}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  withdrawMoney(i: number, hesapNo: number, hesapAdi: string, bakiye: string, paraBirimi: string) {
    this.hesapNo = hesapNo;
    const dialogRef = this.dialog.open(WithdrawMoneyDialogComponent, {
      data: {hesapNo: hesapNo, hesapAdi: hesapAdi, bakiye: bakiye, paraBirimi: paraBirimi}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public loadData() {

    this.exampleDatabase = new DataService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);

    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {

        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
  //endregion
}

export class ExampleDataSource extends DataSource<Issue> {

  //region TableFilters
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Issue[] = [];
  renderedData: Issue[] = [];

  constructor(public _exampleDatabase: DataService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }
  //endregion

  //region Metots
  connect(): Observable<Issue[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAccounts();


    return merge(...displayDataChanges).pipe(map( () => {
        this.filteredData = this._exampleDatabase.data.slice().filter((issue: Issue) => {

          const searchStr = (issue.hesapNo + issue.hesapAdi + issue.paraBirimi)
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}

  sortData(data: Issue[]): Issue[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'hesapNo': [propertyA, propertyB] = [a.hesapNo, b.hesapNo]; break;
        case 'hesapAdi': [propertyA, propertyB] = [a.hesapAdi, b.hesapAdi]; break;
        case 'bakiye': [propertyA, propertyB] = [a.bakiye, b.bakiye]; break;
        case 'paraBirimi': [propertyA, propertyB] = [a.paraBirimi, b.paraBirimi]; break;

      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
  //endregion
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServeService } from '../services/app-serve.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  sub: any;
  categorydata: any;
  categoryid: string;
  data: any;

  displayedColumns: string[] = ['Code', 'Name', 'Price'];
  dataSource: MatTableDataSource<any>;
  selection: SelectionModel<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private appservices: AppServeService, private _Activatedroute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.categoryid = params.get('categoryid');
      this.appservices.getOneCategory(this.categoryid).subscribe(res => {
        this.categorydata = res.Products;
        this.dataSource = new MatTableDataSource(this.categorydata);
        // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.categorydata = err;
        this.dataSource = new MatTableDataSource(err);
      }
      );
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServeService } from '../services/app-serve.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  sub: any;
  categorydata: any;
  categoryname: string;
  data: any;

  displayedColumns: string[] = ['select', 'Code', 'Name', 'Price', 'UpdateProduct'];
  dataSource: MatTableDataSource<any>;
  // selection: SelectionModel<any>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selectedRows: any;
  constructor(private appservices: AppServeService, private _Activatedroute: ActivatedRoute,
    public dialog: MatDialog) { }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  getCategoryProducts() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.categoryname = params.get('categoryname');
      this.appservices.getOneCategory(this.categoryname).subscribe(res => {
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
  ngOnInit(): void {
    this.getCategoryProducts();
  }
  deletedSelectedRows() {
    // console.log(this.selection.selected);
    this.selectedRows = this.selection.selected

    for (let i = 0; i < this.selectedRows.length; i++) {
      this.sub = this._Activatedroute.paramMap.subscribe(params => {
        this.categoryname = params.get('categoryname');
        this.appservices.deleteCategoryProduct(this.categoryname, this.selectedRows[i].code).subscribe(res => {
          console.log(res);
          this.getCategoryProducts();
          this.selection.clear();
        }, err => {
          console.log(err)
        }
        );
      });

    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openAddDialog(): void {
    let dialogRef = this.dialog.open(DialogAddview, {
      width: '300px',
      data: { categoryname: this.categoryname }
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getCategoryProducts();
      }, 1000);


    });
  }
  openUpdateDialog(productid, code, name, price): void {
    let dialogRef = this.dialog.open(DialogUpdateview, {
      width: '300px',
      data: { categoryname: this.categoryname, productid: productid, productcode: code, productname: name, productprice: price }
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getCategoryProducts();
        this.selection.clear();
      }, 1000);


    });
  }

}
@Component({
  selector: 'dialog-add-view',
  templateUrl: './dialog-add-view.html',
})
export class DialogAddview implements OnInit {
  productCode: any;
  productName: any;
  productPrice: any;
  sub: any;
  categoryname: any;
  validations_form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogAddview>,
    @Inject(MAT_DIALOG_DATA) public data: any, private appservices: AppServeService, private _Activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,) {
    this.categoryname = data.categoryname;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      pcode: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      pname: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      pprice: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }
  addNewProduct() {
    let productCode = document.getElementById("pcode") as HTMLInputElement;
    let productName = document.getElementById("pname") as HTMLInputElement;
    let productPrice = document.getElementById("pprice") as HTMLInputElement;
    this.productCode = productCode.value, this.productName = productName.value, this.productPrice = productPrice.value
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.appservices.addCategoryProduct(this.categoryname, this.productCode, this.productName, this.productPrice).subscribe(res => {
        console.log(res)
      }, err => {
        console.log(err)
      });
    });
  }

}


@Component({
  selector: 'dialog-update-view',
  templateUrl: './dialog-update-view.html',
})
export class DialogUpdateview implements OnInit {
  productCode: any;
  productName: any;
  productPrice: any;
  sub: any;
  categoryname: any;
  validations_form: FormGroup;
  productid: any;
  price: any;
  name: any;
  code: any;

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateview>,
    @Inject(MAT_DIALOG_DATA) public data: any, private appservices: AppServeService, private _Activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,) {
    this.categoryname = data.categoryname;
    this.productid = data.productid;
    this.code = data.productcode;
    this.name = data.productname;
    this.price = data.productprice;

  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      pcode: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      pname: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      pprice: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }
  updateProduct() {
    let productCode = document.getElementById("pcode") as HTMLInputElement;
    let productName = document.getElementById("pname") as HTMLInputElement;
    let productPrice = document.getElementById("pprice") as HTMLInputElement;
    this.productCode = productCode.value, this.productName = productName.value, this.productPrice = productPrice.value
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.appservices.updateCategoryProduct(this.categoryname, this.productid, this.productCode, this.productName, this.productPrice).subscribe(res => {
        console.log(res)
      }, err => {
        console.log(err)
      });
    });
  }

}

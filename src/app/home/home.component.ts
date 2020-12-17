import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServeService } from '../services/app-serve.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sub: any;
  categories: any;
  subCategories: any;
  constructor(private appservices: AppServeService, private _Activatedroute: ActivatedRoute,
    public dialog: MatDialog) { }

  getAllCategories() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.appservices.getAllCategories().subscribe(res => {
        this.categories = res;
      }, err => {
        this.categories = err;
      }
      );
    });
  }
  ngOnInit(): void {
    this.getAllCategories();
  }
  openAddNewCatDialog(): void {
    let dialogRef = this.dialog.open(AddNewCategory, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getAllCategories();
      }, 1500);


    });
  }

  openAddNewSubCatDialog(CategoryName): void {
    let dialogRef = this.dialog.open(AddNewSubCategory, {
      width: '300px',
      data: { CategoryName }

    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getAllCategories();
      }, 1500);


    });
  }
}


@Component({
  selector: 'add-new-category',
  templateUrl: './add-new-category.html',
})
export class AddNewCategory implements OnInit {
  sub: any;
  validations_form: FormGroup;
  categoryName: string;
  constructor(
    public dialogRef: MatDialogRef<AddNewCategory>,
    @Inject(MAT_DIALOG_DATA) public data: any, private appservices: AppServeService, private _Activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,) {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      cname: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }
  addNewCategory() {
    let categoryName = document.getElementById("cname") as HTMLInputElement;
    this.categoryName = categoryName.value;
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.appservices.addNewCategory(this.categoryName).subscribe(res => {
        console.log(res)
      }, err => {
        console.log(err)
      });
    });
  }

}



// -------------------
@Component({
  selector: 'add-new-sub-category',
  templateUrl: './add-new-sub-category.html',
})
export class AddNewSubCategory implements OnInit {
  sub: any;
  validations_form: FormGroup;
  CategoryName: string;
  SubCategoryName: any;
  constructor(
    public dialogRef: MatDialogRef<AddNewSubCategory>,
    @Inject(MAT_DIALOG_DATA) public data: any, private appservices: AppServeService, private _Activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,) {
    this.CategoryName = data.CategoryName;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      scname: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }
  addNewSubCategory() {
    let SubCategoryName = document.getElementById("scname") as HTMLInputElement;
    this.SubCategoryName = SubCategoryName.value;
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.appservices.addNewSubCategory(this.CategoryName, this.SubCategoryName).subscribe(res => {
        console.log(res)
      }, err => {
        console.log(err)
      });
    });
  }

}



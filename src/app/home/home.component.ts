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
  categories: Object;
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
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogHomeOverview, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getAllCategories();
      }, 1500);


    });
  }
}

@Component({
  selector: 'dialog-view-home',
  templateUrl: './dialog-view-home.html',
})
export class DialogHomeOverview implements OnInit {
  sub: any;
  validations_form: FormGroup;
  categoryName: string;
  categoryDescription: string;
  constructor(
    public dialogRef: MatDialogRef<DialogHomeOverview>,
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
      cdescription: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }
  addNewCategory() {
    let categoryName = document.getElementById("cname") as HTMLInputElement;
    let categoryDescription = document.getElementById("cdescription") as HTMLInputElement;
    this.categoryName = categoryName.value, this.categoryDescription = categoryDescription.value
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.appservices.addNewCategory(this.categoryName, this.categoryDescription).subscribe(res => {
        console.log(res)
      }, err => {
        console.log(err)
      });
    });
  }

}


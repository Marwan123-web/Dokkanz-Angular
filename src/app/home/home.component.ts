import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServeService } from '../services/app-serve.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sub: any;
  categories: Object;
  constructor(private appservices: AppServeService, private _Activatedroute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.appservices.getAllCategories().subscribe(res => {
        this.categories = res;
      }, err => {
        this.categories = err;
      }
      );
    });
  }

}

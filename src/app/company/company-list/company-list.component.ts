import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { tap, takeWhile, finalize } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies$: Observable<Company[]>;


  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.loadCompanies();
  }


  loadCompanies() {
    this.companies$ = this.companyService.getCompanies()
    .pipe(
      tap(c => console.log('component has companies')),
      finalize (() => console.log('complete'))
    );
  }

  deleteClicked(company: Company) {
    this.companyService.deleteCompany(company);
  }


}

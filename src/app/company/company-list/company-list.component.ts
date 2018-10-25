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

    this.companies$ = this.companyService.getCompanies()
    .pipe(
      tap(c => console.log('component has companies')),
      finalize (() => console.log('complete'))
    );
    // .subscribe(
    //   next => {
    //     this.companies = next;
    //     console.log('Component Next value');
    //   },
    //   error => { console.error('ERROR in component'); },
    //   () => {console.log('COMPLETE'); } );
  }





}

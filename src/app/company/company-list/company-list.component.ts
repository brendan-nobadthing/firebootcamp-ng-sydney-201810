import { Component, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies: Company[] = [];

  constructor() { }

  ngOnInit() {
    this.companies = this.getCompanies();
  }

  getCompanies(): Company[] {
    return [
      { name: "Company A", phone: 12345, email: "email@companyA.com.au" },
      { name: "Company B", phone: 12345, email: "email@companyB.com.au" },
      { name: "Company C", phone: 12345, email: "email@companyC.com.au" },
    ]
  }

}

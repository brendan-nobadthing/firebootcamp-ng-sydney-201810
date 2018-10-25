import { Injectable } from '@angular/core';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  getCompanies(): Company[] {
    return [
      { name: "Company A", phone: 12345, email: "email@companyA.com.au" },
      { name: "Company B", phone: 12345, email: "email@companyB.com.au" },
      { name: "Company C", phone: 12345, email: "email@companyC.com.au" },
    ];
  }
}

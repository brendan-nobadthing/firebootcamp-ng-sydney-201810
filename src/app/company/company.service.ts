import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient) { }

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  getCompanies(): Observable<Company[]> {
    return this.httpClient
    .get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        tap(c => console.log('service has companies')),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error): Observable<Company[]> {
    console.log('ERROR in service', error);
    // return new Observable<Company[]>();
    throw error;
  }
}

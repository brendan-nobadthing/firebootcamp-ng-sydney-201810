import { Injectable } from '@angular/core';
import { Company } from './company';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient) {
    this.loadCompanies();
  }

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  companies$ = new BehaviorSubject<Company[]>([]);

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  loadCompanies() {
    this.httpClient
    .get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        tap(c => console.log('service has companies')),
        catchError(error => this.errorHandler<Company[]>(error))
      )
      .subscribe(c => this.companies$.next(c));
  }

  deleteCompany(company: Company) {
    console.log('DELETE 1');
    const x = this.httpClient.delete<Company>(`${this.API_BASE}/company/${company.id}`)
      .pipe(catchError(error => this.errorHandler<Company>(error)));
    console.log('DELETE 2');
    x.subscribe(c => this.loadCompanies());
  }

  addCompany(company: Company){
    this.httpClient.post<Company>(`${this.API_BASE}/company`, company, {
      headers: new HttpHeaders().set('content-type', 'application/json')
    })
    .pipe(catchError(error => this.errorHandler<Company>(error)))
    .subscribe(c => this.loadCompanies());
  }

  updateCompany(company: Company) {
    this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`, company, {
      headers: new HttpHeaders().set('content-type', 'application/json')
    })
    .pipe(catchError(error => this.errorHandler<Company>(error)))
    .subscribe(c => this.loadCompanies());
  }



  getCompany(id: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${id}`)
    .pipe(catchError(error => this.errorHandler<Company>(error)));
  }

  errorHandler<T>(error): Observable<T> {
    console.log('ERROR in service', error);
    // return new Observable<T>();
    throw error;
  }
}


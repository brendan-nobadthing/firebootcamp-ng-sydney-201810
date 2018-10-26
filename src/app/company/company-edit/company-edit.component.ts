import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  companyId: number;
  isNewCompany: boolean;
  companyForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.companyId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.isNewCompany = this.companyId == 0;

    this.buildForm();

    if(!this.isNewCompany){
      this.companyService.getCompany(this.companyId).subscribe(company => {
        this.companyForm.patchValue(company);
      });
      // Get the current company values from server, and display it
    }
  }

  buildForm(){
    this.companyForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        phone: ['0061'],
        email: ['']
      }
    )
  }

  saveCompany(){
    if(!this.isNewCompany){
      const newCompany = {...this.companyForm.value, id: this.companyId};
      this.companyService.updateCompany(newCompany)
      .subscribe(c => this.navigate("/company/list"));
    }else{
      this.companyService.addCompany(this.companyForm.value)
      .subscribe(c => this.navigate("/company/list"))
    }

  }

  navigate(url: string){
    this.router.navigateByUrl(url);
  }

}

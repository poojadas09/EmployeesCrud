import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { isBuffer } from 'util';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss']
})
export class AddemployeeComponent implements OnInit {

  submitted = false;
  addEmployeeForm: FormGroup;
  employeeId;
  isupdatting = false;
  constructor(private formbuilder: FormBuilder, private employeeService: EmployeeService, private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.addEmployeeForm = this.formbuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      hiredate: ['', Validators.required],
      jobrole: ['', Validators.required],
    });
    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id');
      if (this.employeeId) {
        this.isupdatting = true;
        this.setValue();
      }
    });
  }
  get EmployeeForm() { return this.addEmployeeForm.controls; }

  setValue() {
    this.employeeService.getEmployeeById(this.employeeId)
      .subscribe(
        data => {
          this.employeeId = data.id;
          this.addEmployeeForm.setValue(
            {
              firstname: data.firstname,
              lastname: data.lastname,
              hiredate: data.hiredate,
              jobrole: data.jobrole,
            });
        });

  }

  fromJsonDate(hireDate): string {
    console.log(hireDate);
    const updatedDate: Date = new Date(hireDate);
    return updatedDate.toISOString().substring(0, 10);  // Ignore time
  }

  onEmployeeFormSubmit(): void {
    this.submitted = true;
    if (this.addEmployeeForm.invalid) {
      return;
    }
    console.log(this.addEmployeeForm.value);
    this.addEmployeeForm.value.hiredate = this.fromJsonDate(this.addEmployeeForm.value.hiredate);
    console.log(this.addEmployeeForm.value);
    if (this.isupdatting) {
      this.addEmployeeForm.value.id = this.employeeId;
      this.employeeService.updateEmployeeDetails(this.addEmployeeForm.value, this.employeeId)
        .subscribe(
          data => {

          });
    } else {
      this.employeeService.postEmployeeDetails(this.addEmployeeForm.value).subscribe((data) => {
      });
    }
    this.router.navigate(['/']);
  }
}

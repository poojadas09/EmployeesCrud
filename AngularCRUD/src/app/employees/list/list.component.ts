import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  employeeData: object;
  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.employeeService.getEmployees().subscribe((data) => {
      console.log(data);
      this.employeeData = data;
    });
  }

  editEmployee(employeeId) {
    this.router.navigate(['/addemployee', employeeId]);
  }
  onDelete(employeeid) {
    const conf = confirm('Are you sure ?');
    if (conf) {
      this.employeeService.deleteEmployeeDetails(employeeid).subscribe((data) => {
        this.ngOnInit();
        this.router.navigate(['/']);
      });
    }
    return;
  }

}

import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService {

  getEmployeeById(employeeId: Observable<any>) {
    const URI = 'getEmployeebyId/';
    return this.getbyId(URI, employeeId);
  }
  getEmployees(): Observable<any> {
    const URI = 'getEmployee';
    return this.get(URI);
  }
  postEmployeeDetails(employeeData): Observable<any> {
    const URI = 'saveEmployee';
    return this.post(URI, employeeData);
  }
  updateEmployeeDetails(data, employeeid): Observable<any> {
    const URI = 'updateEmployee/' + employeeid;
    return this.put(URI, data);
  }
  deleteEmployeeDetails(employeeid): Observable<any> {
    const URI = 'deleteEmployee/' + employeeid;
    return this.delete(URI, employeeid);
  }
}

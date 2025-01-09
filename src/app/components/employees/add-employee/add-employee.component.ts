import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentDto } from 'src/app/dto/department/department-dto';
import { CreateEmployeeDto } from 'src/app/dto/employee/create-employee-dto';
import { PositionDto } from 'src/app/dto/position/position-dto';
import { EmployeeService } from 'src/app/services/employee.service';
import { DepartmentComponent } from '../../departments/department/department.component';
import { PositionComponent } from '../../positions/position/position.component';
import { DepartmentService } from 'src/app/services/department.service';
import { PositionService } from 'src/app/services/position.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDto } from 'src/app/dto/employee/employee-dto';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  employeeToUpdate?: EmployeeDto;
  employeeForm: FormGroup;
  positions: PositionDto[] = [];
  departments: DepartmentDto[] = [];
  isEdit = false;
  employeeId?: number; // Employee ID for update

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      salary: [0, [Validators.required, Validators.min(0)]],
      joiningDate: [null, [Validators.required]],
      positionId: [0, Validators.required],
      departmentId: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getPositions();
    this.getDepartments();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        this.employeeId = +params['id'];
        this.loadEmployee(this.employeeId);
      }
    });
  }
  loadEmployee(id: number) {
    this.employeeService.getById(id).subscribe((res) => {
      this.employeeToUpdate = res.data;
      const formattedDate = new Date(this.employeeToUpdate.joiningDate)
        .toISOString()
        .split('T')[0];

      this.employeeForm.patchValue({
        name: this.employeeToUpdate.name,
        salary: this.employeeToUpdate.salary,
        joiningDate: formattedDate,
        positionId: this.employeeToUpdate.positionId,
        departmentId: this.employeeToUpdate.departmentId,
      });
    });
  }

  getPositions() {
    this.positionService.getList().subscribe((res) => {
      this.positions = res.data;
    });
  }
  getDepartments() {
    this.departmentService.getList().subscribe((res) => {
      this.departments = res.data;
    });
  }
  openDepartmentDialog(): void {
    const dialogRef = this.dialog.open(DepartmentComponent);

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getDepartments();
      }
    });
  }

  openPositionDialog(): void {
    const dialogRef = this.dialog.open(PositionComponent);

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getPositions();
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      return;
    }

    const employeeData: CreateEmployeeDto = this.employeeForm.value;

    if (this.isEdit && this.employeeId) {
      employeeData.id = this.employeeId;
      this.employeeService.update(employeeData, this.employeeId).subscribe(
        (res) => {
          this.snackBar.open(res.message, '', {
            duration: 3000,
          });
        },
        (err) => {
          this.snackBar.open('Failed to update employee', '', {
            duration: 3000,
          });
        }
      );
    } else {
      this.employeeService.create(employeeData).subscribe(
        (res) => {
          this.employeeForm.reset();
          this.snackBar.open(res.message, '', {
            duration: 3000,
          });
        },
        (res) => {
          this.snackBar.open('Failed to add employee', '', { duration: 3000 });
        }
      );
    }
  }
}

import { EmployeeDto } from './../../../dto/employee/employee-dto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmationDialogComponent } from '../../common/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css'],
})
export class AllEmployeesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'salary',
    'joiningDate',
    'departmentName',
    'positionName',
    'actions',
  ];
  dataSource: MatTableDataSource<EmployeeDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<EmployeeDto>([]);
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getList().subscribe(
      (res) => {
        this.dataSource.data = res.data;

        if (res.data.length == 0) {
          this.snackBar.open('There Is No Employees, Please Add One!', '', {
            duration: 3000,
          });
        }
      },
      (error) => {
        this.snackBar.open('Failed To Load Employees!', '', {
          duration: 3000,
        });
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployee(employeeId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.employeeService.delete(employeeId).subscribe(
          () => {
            this.snackBar.open('Employee deleted successfully!', '', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
            this.dataSource.data = this.dataSource.data.filter(
              (p) => p.id !== employeeId
            );
          },
          (error) => {
            this.snackBar.open(
              'Failed to delete employee. Please try again.',
              '',
              {
                duration: 3000,
                panelClass: ['error-snackbar'],
              }
            );
          }
        );
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

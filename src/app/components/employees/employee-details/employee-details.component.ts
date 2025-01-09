import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDto } from 'src/app/dto/employee/employee-dto';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmationDialogComponent } from '../../common/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employee: EmployeeDto | null = null;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const employeeId = +this.route.snapshot.paramMap.get('id')!;

    this.employeeService.getById(employeeId).subscribe((res) => {
      this.employee = res.data;
      if (res.succeeded == false) {
        this.router.navigate(['/employees']);
      }
    });
  }
  deleteEmployee(employeeId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.employeeService.delete(employeeId).subscribe(
          (res) => {
            this.snackBar.open('Employee deleted successfully!', '', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
            if (res.succeeded) {
              this.router.navigate(['/employees']);
            }
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
}

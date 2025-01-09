import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentDto } from 'src/app/dto/department/department-dto';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent {
  departmentForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DepartmentComponent>,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.departmentService.create(this.departmentForm?.value).subscribe(
      (res) => {
        this.snackBar.open(res.message, '', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.dialogRef.close(res);
      },
      (error) => {
        this.snackBar.open('Failed to save department. Please try again.', '', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }
}

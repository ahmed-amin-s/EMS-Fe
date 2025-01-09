import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PositionDto } from 'src/app/dto/position/position-dto';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css'],
})
export class PositionComponent implements OnInit {
  positionForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<PositionComponent>,
    private positionService: PositionService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.positionForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}

  onSubmit(): void {
    this.positionService.create(this.positionForm?.value).subscribe(
      (res) => {
        this.snackBar.open(res.message, '', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.dialogRef.close(res);
      },
      (error) => {
        this.snackBar.open('Failed to save position. Please try again.', '', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }
}

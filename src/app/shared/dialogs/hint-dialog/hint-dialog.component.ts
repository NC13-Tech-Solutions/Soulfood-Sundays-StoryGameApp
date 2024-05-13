import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef} from '@angular/material/dialog'
import { EvolutionData } from '../../models/evolution-data.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './hint-dialog.component.html',
  styleUrl: './hint-dialog.component.sass',
})
export class HintDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<HintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EvolutionData
  ) {
    console.log(`Dialog data: ${data.src}`);
  }
}

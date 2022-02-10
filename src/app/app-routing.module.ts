import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecordLabelComponent } from './components/record-label/record-label.component';

const routes: Routes = [
  { path: 'record-label', component: RecordLabelComponent },
  { path: '**', redirectTo: 'record-label', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

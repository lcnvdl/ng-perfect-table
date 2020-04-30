import { Input } from '@angular/core';

export abstract class PFTComponent {
  @Input() pftClass: string = "";
}
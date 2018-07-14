import {NgModule} from '@angular/core';
import {MatSlideToggleModule, MatTooltipModule} from '@angular/material';

@NgModule({imports: [MatSlideToggleModule, MatTooltipModule], exports: [MatSlideToggleModule, MatTooltipModule]})
export class MaterialModule {}

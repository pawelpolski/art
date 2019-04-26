import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatBadgeModule,
        MatInputModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatListModule,
        MatExpansionModule,
        MatCardModule,
        MatSidenavModule,
        MatAutocompleteModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatChipsModule,
        MatIconModule,
        MatTooltipModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatProgressBarModule,
        MatTabsModule,
        MatTableModule,
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatDividerModule,
        MatListModule,
        MatExpansionModule,
        MatCardModule,
        MatSidenavModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatChipsModule,
        MatIconModule,
        MatTooltipModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatProgressBarModule,
        MatTabsModule,
        MatTableModule,
    ],

    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },],
})
export class Material { }
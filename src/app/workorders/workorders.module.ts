import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { WorkordersListComponent } from './workorders-list/workorders-list.component';
import { WorkordersAddComponent } from './workorders-add/workorders-add.component';
import { WorkordersDetailsComponent } from './workorders-details/workorders-details.component';

import { WorkordersService } from './workorders.service';
import { MemoriesService } from './memories.service';
import { CpesService } from './cpes.service';
import { SallaryService } from './sallary.service';
import { FilesService } from './files.service';

import { Material } from '../material';
import { WorkordersStatusIconsComponent } from './workorders-status-icons/workorders-status-icons.component';
import { WorkordersTypeBadgesComponent } from './workorders-type-badges/workorders-type-badges.component'
import { UpcComponent } from '../dashboard/upc/upc.component';
import { OrangeComponent } from '../dashboard/orange/orange.component';
import { NetiaComponent } from '../dashboard/netia/netia.component';
import { WorkorderComponent } from './workorder/workorder.component';
import { WorkordersQueryComponent } from './workorders-query/workorders-query.component'
import { DataTransferService } from '../data-transfer.service';
import { LocationComponent } from './ui-pieces/location/location.component';
import { StatusComponent } from './ui-pieces/status/status.component';
import { FcmService } from '../services/fcm.service';
import { CodesComponent } from './ui-pieces/codes/codes.component';
import { EquipmentsComponent } from './ui-pieces/equipments/equipments.component';
import { MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { RemovesComponent } from './ui-pieces/removes/removes.component';
import { InfoboxComponent } from './ui-pieces/infobox/infobox.component';
import { SingleMemoriesComponent } from './ui-pieces/single-memories/single-memories.component';
import { WorkordersSearchComponent } from './workorders-search/workorders-search.component';
import { CpesDetailsComponent } from './cpes-details/cpes-details.component';
import { MemoriesListComponent } from './memories-list/memories-list.component';
import { MemoriesDetailsComponent } from './memories-details/memories-details.component';
import { MemoriesModalComponent } from './memories-modal/memories-modal.component';
import { SallaryComponent } from './sallary/sallary.component';
import { FilesModalComponent } from './files-modal/files-modal.component';
import { SettingsComponent } from './settings/settings.component';
import { ActivationsListComponent } from './activations-list/activations-list.component';
import { ActivationsDetailsComponent } from './activations-details/activations-details.component';
import { VindicationsComponent } from './vindications/vindications.component';
import { ListComponent } from './vindications/list/list.component';
import { VindicationsListComponent } from './vindications/vindications-list/vindications-list.component';
import { VindicationsDetailsComponent } from './vindications/vindications-details/vindications-details.component';
import { DropzoneDirective } from './dropzone.directive';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';

@NgModule({
  declarations: [
    WorkordersListComponent, 
    WorkordersAddComponent, 
    WorkordersDetailsComponent, 
    WorkordersStatusIconsComponent, 
    WorkordersTypeBadgesComponent, 
    UpcComponent, 
    OrangeComponent, 
    NetiaComponent, 
    WorkorderComponent, 
    WorkordersQueryComponent, 
    LocationComponent, 
    StatusComponent, 
    CodesComponent, 
    EquipmentsComponent, 
    RemovesComponent, 
    InfoboxComponent, 
    SingleMemoriesComponent, 
    WorkordersSearchComponent, 
    CpesDetailsComponent, 
    MemoriesListComponent, 
    MemoriesDetailsComponent, 
    MemoriesModalComponent, SallaryComponent, FilesModalComponent, SettingsComponent, ActivationsListComponent, ActivationsDetailsComponent, VindicationsComponent, ListComponent, VindicationsListComponent, VindicationsDetailsComponent, DropzoneDirective, UploaderComponent, UploadTaskComponent, CalendarViewComponent, 
  ],
  imports: [
    CommonModule,
    Material,
    RouterModule,
    FormsModule,
  ],
  exports: [
    Material,
    MemoriesListComponent
  ],
  providers: [WorkordersService, DataTransferService, FcmService, MemoriesService, CpesService, SallaryService, FilesService,
    {
    provide: MAT_CHIPS_DEFAULT_OPTIONS,
    useValue: {
      separatorKeyCodes: [ENTER, COMMA, SPACE]
    }
  }]
})
export class WorkordersModule { }

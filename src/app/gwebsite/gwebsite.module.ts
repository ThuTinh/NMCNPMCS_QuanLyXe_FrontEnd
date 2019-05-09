import { CustomerServiceProxy, ThongTinSuaChuaServiceProxy, PhiDuongBoServiceProxy } from './../../shared/service-proxies/service-proxies';
import { ViewDemoModelModalComponent } from './demo-model/view-demo-model-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import {CalendarModule} from 'primeng/calendar';
import { UtilsModule } from '@shared/utils/utils.module';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalModule, PopoverModule, TabsModule, TooltipModule } from 'ngx-bootstrap';
import { AutoCompleteModule, EditorModule, FileUploadModule as PrimeNgFileUploadModule, InputMaskModule, PaginatorModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { GWebsiteRoutingModule } from './gwebsite-routing.module';

import { MenuClientComponent, CreateOrEditMenuClientModalComponent } from './index';
import { DemoModelComponent } from './demo-model/demo-model.component';
import { CreateOrEditDemoModelModalComponent } from './demo-model/create-or-edit-demo-model-modal.component';
import { DemoModelServiceProxy } from '@shared/service-proxies/service-proxies';
import { CustomerComponent } from './customer/customer.component';
import { ViewCustomerModalComponent } from './customer/view-customer-modal.component';
import { CreateOrEditCustomerModalComponent } from './customer/create-or-edit-customer-modal.component';
import { PhiDuongBoComponent } from './phiDuongBo/phiDuongBo.component';
import { CreateOrEditPhiDuongBoModalComponent } from './phiDuongBo/create-or-edit-phiDuongBo-modal.component';
import { ViewPhiDuongBoModalComponent } from './phiDuongBo/view-phiDuongBo-modal.component';

import { ThongTinSuaChuaComponent } from './thongTinSuaChua/thongTinSuaChua.component';
import { CreateOrEditThongTinSuaChuaModalComponent } from './thongTinSuaChua/create-or-edit-thongTinSuaChua-modal.component';
import { ViewThongTinSuaChuaModalComponent } from './thongTinSuaChua/view-thongTinSuaChua-modal.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        FileUploadModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        GWebsiteRoutingModule,
        UtilsModule,
        AppCommonModule,
        TableModule,
        PaginatorModule,
        PrimeNgFileUploadModule,
        AutoCompleteModule,
        EditorModule,
        InputMaskModule,
        CalendarModule
    ],
    declarations: [
        MenuClientComponent, CreateOrEditMenuClientModalComponent,
        DemoModelComponent, CreateOrEditDemoModelModalComponent, ViewDemoModelModalComponent,
        CustomerComponent, CreateOrEditCustomerModalComponent, ViewCustomerModalComponent,
        PhiDuongBoComponent, CreateOrEditPhiDuongBoModalComponent, ViewPhiDuongBoModalComponent,
        ThongTinSuaChuaComponent, CreateOrEditThongTinSuaChuaModalComponent, ViewThongTinSuaChuaModalComponent,
    ],
    providers: [
        DemoModelServiceProxy,
        CustomerServiceProxy,
        PhiDuongBoServiceProxy,
        ThongTinSuaChuaServiceProxy
    ]
})
export class GWebsiteModule { }

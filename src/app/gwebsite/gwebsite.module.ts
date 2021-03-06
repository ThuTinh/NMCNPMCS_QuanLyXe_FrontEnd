
import { CustomerServiceProxy, TaiSanServiceProxy, ModelServiceProxy, NhaCungCapServiceProxy, ThongTinXeServiceProxy, QuanLyVanHanhDto, QuanLyVanHanhServiceProxy, ThongTinBaoHiemServiceProxy, PhiDuongBoServiceProxy, ThongTinBaoDuongServiceProxy, ThongTinDangKiemServiceProxy, ThietBiKemTheoServiceProxy, ThongTinSuaChuaServiceProxy, CheckServiceProxy } from './../../shared/service-proxies/service-proxies';

import { ViewDemoModelModalComponent } from './demo-model/view-demo-model-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalModule, PopoverModule, TabsModule, TooltipModule } from 'ngx-bootstrap';
import { AutoCompleteModule, EditorModule, FileUploadModule as PrimeNgFileUploadModule, InputMaskModule, PaginatorModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { GWebsiteRoutingModule } from './gwebsite-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { MenuClientComponent, CreateOrEditMenuClientModalComponent } from './index';
import { DemoModelComponent } from './demo-model/demo-model.component';
import { CreateOrEditDemoModelModalComponent } from './demo-model/create-or-edit-demo-model-modal.component';
import { DemoModelServiceProxy } from '@shared/service-proxies/service-proxies';
import { CustomerComponent } from './customer/customer.component';
import { ViewCustomerModalComponent } from './customer/view-customer-modal.component';
import { CreateOrEditCustomerModalComponent } from './customer/create-or-edit-customer-modal.component';
import { TaiSanComponent } from './taisan/taisan.component'
import { ModelComponent } from './model/model.component';
import { NhaCungCapComponent } from './nhacungcap/nhacungcap.component';
import { ThongTinXeComponent } from './thongtinxe/thongtinxe.component';
import { CreateOrEditThongTinXeModalComponent } from './thongtinxe/create-or-edit-thongtinxe-modal.component';
import { ViewThongTinXeModalComponent } from './thongtinxe/view-thongtinxe-modal.component';
import { ButtonModule } from 'primeng/button';
import { VanHanhXeComponent } from './vanhanhxe/vanhanhxe.component';
import { CreateOrEditVanHanhXeModalComponent } from './vanhanhxe/create-or-edit-vanhanhxe-modal.component';
import { ViewVanHanhXeModalComponent } from './vanhanhxe/view-vanhanhxe-modal.component';
import { ThongTinXeModalComponent } from './thongtinxe/thongtinxe-modal.component';
import { ThongTinBaoHiemComponent } from './thongtinbaohiem/thongtinbaohiem.component';
import { CreateOrEditBaoHiemXeModalComponent } from './thongtinbaohiem/create-or-edit-thongtinbaohiem-modal.component';
import { ViewBaoHiemXeModalComponent } from './thongtinbaohiem/view-thongtinbaohiem-modal.component';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { PhiDuongBoComponent } from './phiduongbo/phiduongbo.component';
import { CreateOrEditPhiDuongBoModalComponent } from './phiduongbo/create-or-edit-phiduongbo-modal.component';
import { ViewPhiDuongBoModalComponent } from './phiduongbo/view-phiduongbo-modal.component';
import { ViewThongTinBaoDuongModalComponent } from './thongtinbaoduong/view-thongtinbaoduong-modal.component';
import { CreateOrEditThongTinBaoDuongModalComponent } from './thongtinbaoduong/create-or-edit-thongtinbaoduong-modal.component';
import { ThongTinBaoDuongComponent } from './thongtinbaoduong/thongtinbaoduong.component';
import { ViewDangKiemXeModalComponent } from './thongtindangkiem/view-thongtindangkiem-modal.component';
import { CreateOrEditDangKiemXeModalComponent } from './thongtindangkiem/create-or-edit-thongtindangkiem-modal.component';
import { ThongTinDangKiemComponent } from './thongtindangkiem/thongtindangkiem.component';
import { OrganizationUnitsTreeComponent } from '@app/admin/shared/organization-unit-tree.component';

import { CreateOrEditThongTinSuaChuaModalComponent } from './thongTinSuaChua/create-or-edit-thongTinSuaChua-modal.component';
import { ThongTinSuaChuaComponent } from './thongTinSuaChua/thongTinSuaChua.component';
import { ViewThongTinSuaChuaModalComponent } from './thongTinSuaChua/view-thongTinSuaChua-modal.component';
import { ChiTietXeComponent } from './chitietxe/chitietxe.component';

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
        ButtonModule,
        CalendarModule,
        DropdownModule,
        CheckboxModule
    ],
    declarations: [
        MenuClientComponent, CreateOrEditMenuClientModalComponent,
        DemoModelComponent, CreateOrEditDemoModelModalComponent, ViewDemoModelModalComponent,
        TaiSanComponent, ModelComponent, NhaCungCapComponent,
        CustomerComponent, CreateOrEditCustomerModalComponent, ViewCustomerModalComponent,
        ThongTinXeComponent, CreateOrEditThongTinXeModalComponent, ViewThongTinXeModalComponent, ThongTinXeModalComponent,
        VanHanhXeComponent, CreateOrEditVanHanhXeModalComponent, ViewVanHanhXeModalComponent,
        ThongTinBaoHiemComponent, CreateOrEditBaoHiemXeModalComponent, ViewBaoHiemXeModalComponent,
        PhiDuongBoComponent, CreateOrEditPhiDuongBoModalComponent, ViewPhiDuongBoModalComponent,
        ThongTinBaoDuongComponent, CreateOrEditThongTinBaoDuongModalComponent, ViewThongTinBaoDuongModalComponent,

        ThongTinDangKiemComponent, CreateOrEditDangKiemXeModalComponent, ViewDangKiemXeModalComponent,
        ThongTinSuaChuaComponent, CreateOrEditThongTinSuaChuaModalComponent, ViewThongTinSuaChuaModalComponent,
        ChiTietXeComponent,
        ThongTinDangKiemComponent, CreateOrEditDangKiemXeModalComponent, ViewDangKiemXeModalComponent

    ],
    providers: [
        DemoModelServiceProxy,
        CustomerServiceProxy,
        TaiSanServiceProxy,
        ModelServiceProxy,
        NhaCungCapServiceProxy,
        ThongTinXeServiceProxy,
        QuanLyVanHanhServiceProxy,
        ThongTinBaoHiemServiceProxy,
        PhiDuongBoServiceProxy,
        ThongTinBaoDuongServiceProxy,
        ThongTinDangKiemServiceProxy,
        ThietBiKemTheoServiceProxy,
        ThongTinSuaChuaServiceProxy,
        CheckServiceProxy,
        ThietBiKemTheoServiceProxy

    ]
})
export class GWebsiteModule { }

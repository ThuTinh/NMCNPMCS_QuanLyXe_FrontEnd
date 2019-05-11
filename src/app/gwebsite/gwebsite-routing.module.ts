import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuClientComponent } from '@app/gwebsite/menu-client/menu-client.component';
import { DemoModelComponent } from './demo-model/demo-model.component';
import { CustomerComponent } from './customer/customer.component';
import { TaiSanComponent } from './taisan/taisan.component'
import { ModelComponent } from './model/model.component';
import { NhaCungCapComponent } from './nhacungcap/nhacungcap.component';
import { ThongTinXeComponent } from './thongtinxe/thongtinxe.component'
import { VanHanhXeComponent } from './vanhanhxe/vanhanhxe.component';
import { ThongTinBaoHiemComponent } from './thongtinbaohiem/thongtinbaohiem.component';
import { PhiDuongBoComponent } from './phiduongbo/phiduongbo.component';
import { ThongTinBaoDuongComponent } from './thongtinbaoduong/thongtinbaoduong.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'menu-client', component: MenuClientComponent,
                        data: { permission: 'Pages.Administration.MenuClient' }
                    },
                ]
            },
            {
                path: '',
                children: [
                    {
                        path: 'demo-model', component: DemoModelComponent,
                        data: { permission: 'Pages.Administration.DemoModel' }
                    },
                ]
            },
            {
                path: '',
                children: [
                    {
                        path: 'customer', component: CustomerComponent,
                        data: { permission: 'Pages.Administration.Customer' }
                    },
                ]

            },
            {
                path: '',
                children: [

                    {
                        path: 'nhacungcap', component: NhaCungCapComponent,

                    },
                    {
                        path: 'thongtinxe', component: ThongTinXeComponent,
                    },
                    {
                        path: 'vanhanhxe', component: VanHanhXeComponent,
                    },
                    {
                        path: 'thongtinbaohiem', component: ThongTinBaoHiemComponent,
                    },
                    {
                        path: 'phiduongbo', component: PhiDuongBoComponent,
                    },
                    {
                        path: 'thongtinbaoduong', component: ThongTinBaoDuongComponent,
                    }

                ]

            },


        ])
    ],
    exports: [
        RouterModule
    ]
})
export class GWebsiteRoutingModule { }

import { ThongTinSuaChuaForViewDTO } from './../../../shared/service-proxies/service-proxies';
import { AppComponentBase } from "@shared/common/app-component-base";
import { AfterViewInit, Injector, Component, ViewChild } from "@angular/core";
import { ThongTinSuaChuaServiceProxy } from "@shared/service-proxies/service-proxies";
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'viewThongTinSuaChuaModal',
    templateUrl: './view-ThongTinSuaChua-modal.component.html'
})

export class ViewThongTinSuaChuaModalComponent extends AppComponentBase {

    thongTinSuaChua: ThongTinSuaChuaForViewDTO = new ThongTinSuaChuaForViewDTO();
    @ViewChild('viewModal') modal: ModalDirective;

    constructor(
        injector: Injector,
        private _thongTinSuaChuaService: ThongTinSuaChuaServiceProxy
    ) {
        super(injector);
    }

    show(thongTinSuaChuaId?: number | null | undefined): void {
        this._thongTinSuaChuaService.getThongTinSuaChuaForView(thongTinSuaChuaId).subscribe(result => {
            this.thongTinSuaChua = result;
            this.modal.show();
        })
    }

    close(): void {
        this.modal.hide();
    }
}

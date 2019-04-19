import { QuanlyxeForViewDto } from './../../../shared/service-proxies/service-proxies';
import { AppComponentBase } from "@shared/common/app-component-base";
import { AfterViewInit, Injector, Component, ViewChild } from "@angular/core";
import { QuanlyxeServiceProxy } from "@shared/service-proxies/service-proxies";
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'viewQuanlyxeModal',
    templateUrl: './view-quanlyxe-modal.component.html'
})

export class ViewQuanlyxeModalComponent extends AppComponentBase {

    quanlyxe : QuanlyxeForViewDto = new QuanlyxeForViewDto();
    @ViewChild('viewModal') modal: ModalDirective;

    constructor(
        injector: Injector,
        private _quanlyxeService: QuanlyxeServiceProxy
    ) {
        super(injector);
    }

    show(quanlyxeId?: number | null | undefined): void {
        this._quanlyxeService.getQuanlyxeForView(quanlyxeId).subscribe(result => {
            this.quanlyxe = result;
            this.modal.show();
        })
    }

    close() : void{
        this.modal.hide();
    }
}
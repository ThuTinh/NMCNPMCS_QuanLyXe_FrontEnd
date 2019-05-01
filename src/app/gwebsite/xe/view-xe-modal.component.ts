import { XeForViewDto } from './../../../shared/service-proxies/service-proxies';
import { AppComponentBase } from "@shared/common/app-component-base";
import { AfterViewInit, Injector, Component, ViewChild } from "@angular/core";
import { XeServiceProxy } from "@shared/service-proxies/service-proxies";
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'viewXeModal',
    templateUrl: './view-xe-modal.component.html'
})

export class ViewXeModalComponent extends AppComponentBase {

    xe : XeForViewDto = new XeForViewDto();
    @ViewChild('viewModal') modal: ModalDirective;

    constructor(
        injector: Injector,
        private _xeService: XeServiceProxy
    ) {
        super(injector);
    }

    show(xeId?: number | null | undefined): void {
        this._xeService.getXeForView(xeId).subscribe(result => {
            this.xe = result;
            this.modal.show();
        })
    }

    close() : void{
        this.modal.hide();
    }
}
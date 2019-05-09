import { AppComponentBase } from "@shared/common/app-component-base";
import { AfterViewInit, Injector, Component, ViewChild } from "@angular/core";
import { PhiDuongBoServiceProxy, PhiDuongBoForViewDTO } from "@shared/service-proxies/service-proxies";
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'viewPhiDuongBoModal',
    templateUrl: './view-phiduongbo-modal.component.html'
})

export class ViewPhiDuongBoModalComponent extends AppComponentBase {
    phiDuongBo: PhiDuongBoForViewDTO = new PhiDuongBoForViewDTO();
    @ViewChild('viewModal') modal: ModalDirective;

    constructor(
        injector: Injector,
        private _phiDuongBoService: PhiDuongBoServiceProxy
    ) {
        super(injector);
    }

    show(phiDuongBoId?: number | null | undefined): void {
        this._phiDuongBoService.getPhiDuongBoForView(phiDuongBoId).subscribe(result => {
            this.phiDuongBo = result;
            this.modal.show();
        })
    }

    close(): void {
        this.modal.hide();
    }
}
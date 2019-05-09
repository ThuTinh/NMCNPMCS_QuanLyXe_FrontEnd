import { Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { PhiDuongBoServiceProxy, PhiDuongBoInput } from '@shared/service-proxies/service-proxies';


@Component({
    selector: 'createOrEditPhiDuongBoModal',
    templateUrl: './create-or-edit-phiDuongBo-modal.component.html'
})
export class CreateOrEditPhiDuongBoModalComponent extends AppComponentBase {


    @ViewChild('createOrEditModal') modal: ModalDirective;
    @ViewChild('phiDuongBoCombobox') phiDuongBoCombobox: ElementRef;
    @ViewChild('iconCombobox') iconCombobox: ElementRef;
    @ViewChild('dateInput') dateInput: ElementRef;


    /**
    * @Output dùng để public event cho component khác xử lý
    */
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    saving = false;
    phiDuongBo: PhiDuongBoInput = new PhiDuongBoInput();

    constructor(
        injector: Injector,
        private _phiDuongBoService: PhiDuongBoServiceProxy
    ) {
        super(injector);
    }

    show(phiDuongBoId?: number | null | undefined): void {
        this.saving = false;


        this._phiDuongBoService.getPhiDuongBoForEdit(phiDuongBoId).subscribe(result => {
            this.phiDuongBo = result;
            this.modal.show();

        })
    }

    save(): void {
        let input = this.phiDuongBo;
        this.saving = true;
        this._phiDuongBoService.createOrEditPhiDuongBo(input).subscribe(result => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
        })

    }

    close(): void {
        this.modal.hide();
        this.modalSave.emit(null);
    }
}

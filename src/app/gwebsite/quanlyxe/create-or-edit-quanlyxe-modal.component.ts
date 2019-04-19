import { Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { QuanlyxeServiceProxy, QuanlyxeInput } from '@shared/service-proxies/service-proxies';


@Component({
    selector: 'createOrEditQuanlyxeModal',
    templateUrl: './create-or-edit-quanlyxe-modal.component.html'
})
export class CreateOrEditQuanlyxeModalComponent extends AppComponentBase {


    @ViewChild('createOrEditModal') modal: ModalDirective;
    @ViewChild('quanlyxeCombobox') quanlyxeCombobox: ElementRef;
    @ViewChild('iconCombobox') iconCombobox: ElementRef;
    @ViewChild('dateInput') dateInput: ElementRef;


    /**
     * @Output dùng để public event cho component khác xử lý
     */
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    saving = false;

    quanlyxe: QuanlyxeInput = new QuanlyxeInput();

    constructor(
        injector: Injector,
        private _quanlyxeService: QuanlyxeServiceProxy
    ) {
        super(injector);
    }

    show(quanlyxeId?: number | null | undefined): void {
        this.saving = false;


        this._quanlyxeService.getQuanlyxeForEdit(quanlyxeId).subscribe(result => {
            this.quanlyxe = result;
            this.modal.show();

        })
    }

    save(): void {
        let input = this.quanlyxe;
        this.saving = true;
        this._quanlyxeService.createOrEditQuanlyxe(input).subscribe(result => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
        })

    }

    close(): void {
        this.modal.hide();
        this.modalSave.emit(null);
    }
}

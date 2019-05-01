import { Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { XeServiceProxy, XeInput } from '@shared/service-proxies/service-proxies';


@Component({
    selector: 'createOrEditXeModal',
    templateUrl: './create-or-edit-xe-modal.component.html'
})
export class CreateOrEditXeModalComponent extends AppComponentBase {


    @ViewChild('createOrEditModal') modal: ModalDirective;
    @ViewChild('xeCombobox') xeCombobox: ElementRef;
    @ViewChild('iconCombobox') iconCombobox: ElementRef;
    @ViewChild('dateInput') dateInput: ElementRef;


    /**
     * @Output dùng để public event cho component khác xử lý
     */
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    saving = false;

    xe: XeInput = new XeInput();

    constructor(
        injector: Injector,
        private _xeService: XeServiceProxy
    ) {
        super(injector);
    }

    show(xeId?: number | null | undefined): void {
        this.saving = false;


        this._xeService.getXeForEdit(xeId).subscribe(result => {
            this.xe = result;
            this.modal.show();

        })
    }

    save(): void {
        let input = this.xe;
        // console.log(input);
        this.saving = true;
        this._xeService.createOrEditXe(input).subscribe(result => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
        })

    }

    close(): void {
        this.modal.hide();
        this.modalSave.emit(null);
    }
}

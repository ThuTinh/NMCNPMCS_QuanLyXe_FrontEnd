import { Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { ThongTinSuaChuaServiceProxy, ThongTinSuaChuaInput } from '@shared/service-proxies/service-proxies';


@Component({
    selector: 'createOrEditThongTinSuaChuaModal',
    templateUrl: './create-or-edit-thongTinSuaChua-modal.component.html'
})
export class CreateOrEditThongTinSuaChuaModalComponent extends AppComponentBase {


    @ViewChild('createOrEditModal') modal: ModalDirective;
    @ViewChild('thongTinSuaChuaCombobox') thongTinSuaChuaCombobox: ElementRef;
    @ViewChild('iconCombobox') iconCombobox: ElementRef;
    @ViewChild('dateInput') dateInput: ElementRef;


    /**
    * @Output dùng để public event cho component khác xử lý
    */
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    saving = false;
    thongTinSuaChua: ThongTinSuaChuaInput = new ThongTinSuaChuaInput();

    constructor(
        injector: Injector,
        private _thongTinSuaChuaService: ThongTinSuaChuaServiceProxy
    ) {
        super(injector);
    }

    show(thongTinSuaChuaId?: number | null | undefined): void {
        this.saving = false;


        this._thongTinSuaChuaService.getThongTinSuaChuaForEdit(thongTinSuaChuaId).subscribe(result => {
            this.thongTinSuaChua = result;
            this.modal.show();

        })
    }

    save(): void {
        let input = this.thongTinSuaChua;
        this.saving = true;
        this._thongTinSuaChuaService.createOrEditThongTinSuaChua(input).subscribe(result => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
        })

    }

    close(): void {
        this.modal.hide();
        this.modalSave.emit(null);
    }
}
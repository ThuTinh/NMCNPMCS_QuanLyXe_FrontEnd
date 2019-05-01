import { Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { ThongTinXeInput, ThongTinXeServiceProxy, TaiSanInput, TaiSanServiceProxy } from '@shared/service-proxies/service-proxies';
import { TaiSanComponent } from '../taisan/taisan.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';


@Component({
    selector: 'createOrEditThongTinXeModal',
    templateUrl: './create-or-edit-thongtinxe-modal.component.html',
    animations: [appModuleAnimation()]
})
export class CreateOrEditThongTinXeModalComponent extends AppComponentBase {


    @ViewChild('createOrEditModal') modal: ModalDirective;
    @ViewChild('viewTaiSan') viewTaiSan: TaiSanComponent;
    @ViewChild('customerCombobox') customerCombobox: ElementRef;
    @ViewChild('iconCombobox') iconCombobox: ElementRef;
    @ViewChild('dateInput') dateInput: ElementRef;


    /**
     * @Output dùng để public event cho component khác xử lý
     */
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    saving = false;

    thongtinxe: ThongTinXeInput = new ThongTinXeInput();
    taisan: any;
    constructor(
        injector: Injector,
        private _thongtinxeService: ThongTinXeServiceProxy,
        private _taisanService: TaiSanServiceProxy
    ) {
        super(injector);
    }
    tinh(taisan: any) {
        this.taisan = taisan;
    }
    show(soXe?: string | null | undefined): void {
        this.saving = false;

        this._thongtinxeService.getThongTinSeForEdit(soXe).subscribe(result => {
            this.thongtinxe = result;
            this._taisanService.getTaiSanForEdit(result.maTaiSan).subscribe(kq => {
                this.taisan = kq;
                console.log("hix", kq);

            });
            this.modal.show();

        })
    }

    save(): void {
        let input = this.thongtinxe;
        this.saving = true;
        this._thongtinxeService.createOrEditThongTinXe(input).subscribe(result => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
        })

    }

    close(): void {
        this.modal.hide();
        this.modalSave.emit(null);
    }
}

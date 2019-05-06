import { Component, ElementRef, EventEmitter, Injector, Output, ViewChild, Input } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { CustomerServiceProxy, CustomerInput, QuanLyVanHanhInput, QuanLyVanHanhServiceProxy, ThongTinXeServiceProxy, ModelServiceProxy, ThongTinXeInput, ModelInput } from '@shared/service-proxies/service-proxies';


@Component({
    selector: 'createOrEditVanHanhXeModal',
    templateUrl: './create-or-edit-vanhanhxe-modal.component.html',
    styleUrls: ['./create-or-edit-vanhanhxe.component.css']
})
export class CreateOrEditVanHanhXeModalComponent extends AppComponentBase {


    @ViewChild('createOrEditModal') modal: ModalDirective;
    @ViewChild('customerCombobox') customerCombobox: ElementRef;
    @ViewChild('iconCombobox') iconCombobox: ElementRef;
    @ViewChild('dateInput') dateInput: ElementRef;


    /**
     * @Output dùng để public event cho component khác xử lý
     */
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    saving = false;

    vanhanhxe: QuanLyVanHanhInput = new QuanLyVanHanhInput();
    thongtinxe: ThongTinXeInput = new ThongTinXeInput();
    model: ModelInput = new ModelInput();
    km: number;
    xangdinhmuc: number;
    @Input() soXe: string;

    constructor(
        injector: Injector,
        private _vanhanhxeService: QuanLyVanHanhServiceProxy,
        private _thongtinxeService: ThongTinXeServiceProxy,
        private _modelService: ModelServiceProxy
    ) {
        super(injector);
    }

    show(Id?: number | null | undefined): void {
        this.saving = false;

        this._thongtinxeService.getThongTinSeForEdit(this.soXe).subscribe(kq => {
            this.thongtinxe = kq;
            this._modelService.getModelForEdit(kq.model).subscribe(kq1 => {
                this.model = kq1;

            })
            this._vanhanhxeService.getQuanLyVanHanhForEdit(Id).subscribe(result => {
                this.vanhanhxe = result;
                this.vanhanhxe.soKM = this.vanhanhxe.kmMoi - this.vanhanhxe.kmCu;
                this.xangdinhmuc = (this.model.dinhMucNhienLieu * this.vanhanhxe.soKM) / 100;

            })



            this.modal.show();
        })
    }
    onKeydown(event): void {
        if (event.key === "Enter") {

            this.vanhanhxe.soKM = this.vanhanhxe.kmMoi - this.vanhanhxe.kmCu;

            this.xangdinhmuc = (this.model.dinhMucNhienLieu * this.vanhanhxe.soKM) / 100;
            console.log("enter ne" + this.xangdinhmuc);

        }
    }
    TinhDinhMucNhienLieu(): void {

        this.vanhanhxe.soKM = this.vanhanhxe.kmMoi - this.vanhanhxe.kmCu;
        this.xangdinhmuc = (this.model.dinhMucNhienLieu * this.vanhanhxe.soKM) / 100;

    }
    save(): void {

        this.vanhanhxe.soXe = this.soXe;
        let input = this.vanhanhxe;

        this.saving = true;
        this._vanhanhxeService.createOrEditQuanLyVanHanh(input).subscribe(result => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
        })

    }

    close(): void {
        this.modal.hide();
        this.modalSave.emit(null);
    }
}

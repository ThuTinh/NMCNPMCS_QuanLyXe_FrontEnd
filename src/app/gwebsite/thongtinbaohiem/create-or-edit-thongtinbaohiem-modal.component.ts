import { Component, ElementRef, EventEmitter, Injector, Output, ViewChild, Input } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { ThongTinXeServiceProxy, ModelServiceProxy, ThongTinXeInput, ModelInput, ThongTinBaoHiemServiceProxy, ThongTinBaoHiemInput, NhaCungCapServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
    selector: 'createOrEditBaoHiemXeModal',
    templateUrl: './create-or-edit-thongtinbaohiem-modal.component.html',
})
export class CreateOrEditBaoHiemXeModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal') modal: ModalDirective;
    @ViewChild('customerCombobox') customerCombobox: ElementRef;
    @ViewChild('iconCombobox') iconCombobox: ElementRef;
    @ViewChild('dateInput') dateInput: ElementRef;


    /**
     * @Output dùng để public event cho component khác xử lý
     */
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    saving = false;

    thongtinxe: ThongTinXeInput = new ThongTinXeInput();
    baohiemxe: ThongTinBaoHiemInput = new ThongTinBaoHiemInput();
    model: ModelInput = new ModelInput();
    arrCongTyBaoHiem: string[] = [];
    ngayMua: Date;
    ngayHetHan: Date;
    check: boolean = false;
    @Input() soXe: string;


    constructor(
        injector: Injector,
        private _thongtinxeService: ThongTinXeServiceProxy,
        private _modelService: ModelServiceProxy,
        private _baohiemxeService: ThongTinBaoHiemServiceProxy,
        private _nhacungcapService: NhaCungCapServiceProxy
    ) {
        super(injector);

    }

    show(Id?: number | null | undefined): void {
        this.saving = false;
        this._thongtinxeService.getThongTinSeForEdit(this.soXe).subscribe(kq => {
            this.thongtinxe = kq;
            if (this.thongtinxe.trangThaiDuyet === "Đã duyệt")
                this.check = true;
            this._modelService.getModelForEdit(kq.model).subscribe(kq1 => {
                this.model = kq1;
            })
            this._baohiemxeService.getThongTinBaoHiemForEdit(Id).subscribe(result => {
                this.baohiemxe = result;
                if (Id != -1) {
                    this.ngayMua = result.ngayMuaBaoHiem.toDate();
                    this.ngayHetHan = result.ngayHetHanBaoHiem.toDate();
                }

            })

            this._nhacungcapService.getNhaCungCapsByFilter(undefined, undefined, undefined, undefined).subscribe(kq => {

                kq.items.map(item => {
                    this.arrCongTyBaoHiem.push(item.tenCongTyBaoHiem);
                })
                console.log("mang", this.arrCongTyBaoHiem);
            })

        })



        this.modal.show();
    }

    save(): void {

        if (this.check)
            this.baohiemxe.trangThaiDuyet = "Đã duyệt";
        else
            this.baohiemxe.trangThaiDuyet = "Chưa duyệt";

        this.baohiemxe.soXe = this.soXe;
        // this.baohiemxe.ngayMuaBaoHiem = moment(this.ngayMua);
        // this.baohiemxe.ngayHetHanBaoHiem = moment(this.ngayHetHan);
        // alert(this.baohiemxe.ngayHetHanBaoHiem.diff(this.baohiemxe.ngayMuaBaoHiem, 'month'));


        let input = this.baohiemxe;
        console.log("ahihihi", this.baohiemxe.congTyBaoHiem);
        this.saving = true;
        this._baohiemxeService.createOrEditThongTinBaoHiem(input).subscribe(result => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
            this.arrCongTyBaoHiem = [];
        })


    }
    ChonNgayMua(): void {
        this.baohiemxe.ngayMuaBaoHiem = moment(this.ngayMua);

        this.baohiemxe.thoiHanBaoHiem = this.baohiemxe.ngayHetHanBaoHiem.diff(this.baohiemxe.ngayMuaBaoHiem, 'month');

    }
    ChonNgayHetHan(): void {
        this.baohiemxe.ngayHetHanBaoHiem = moment(this.ngayHetHan);
        this.baohiemxe.thoiHanBaoHiem = this.baohiemxe.ngayHetHanBaoHiem.diff(this.baohiemxe.ngayMuaBaoHiem, 'month');
    }

    close(): void {
        this.modal.hide();
        this.arrCongTyBaoHiem = [];
        this.ngayMua = null;
        this.ngayHetHan = null;
        this.modalSave.emit(null);
    }
}

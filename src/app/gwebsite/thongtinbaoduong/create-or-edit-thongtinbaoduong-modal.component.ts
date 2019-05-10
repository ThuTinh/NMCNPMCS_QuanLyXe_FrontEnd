import { Component, ElementRef, EventEmitter, Injector, Output, AfterViewInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { ThongTinBaoDuongServiceProxy, ThongTinBaoDuongInput } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
    selector: 'createOrEditThongTinBaoDuongModal',
    templateUrl: './create-or-edit-thongtinbaoduong-modal.component.html'
})
export class CreateOrEditThongTinBaoDuongModalComponent extends AppComponentBase {


    @ViewChild('createOrEditModal') modal: ModalDirective;
    @ViewChild('thongtinbaoduongCombobox') thongtinbaoduongCombobox: ElementRef;
    @ViewChild('iconCombobox') iconCombobox: ElementRef;
    @ViewChild('dateInput') dateInput: ElementRef;


    /**
     * @Output dùng để public event cho component khác xử lý
     */
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    saving = false;
    ngayBaoDuong: Date;
    ngayBaoDuongTiepTheo: Date;


    thongtinbaoduong: ThongTinBaoDuongInput = new ThongTinBaoDuongInput();

    constructor(
        injector: Injector,
        private _thongtinbaoduongService: ThongTinBaoDuongServiceProxy
    ) {
        super(injector);
    }

    // ngAfterViewInit(): void {
    //     let t = this;
    //     $(this.dateInput.nativeElement).datetimepicker({
    //         locale: abp.localization.currentLanguage.name,
    //         format: 'L'
    //     }).on('dp.change', function (e) {
    //         t.thongtinbaoduong.ngayBaoDuong = $(t.ngayBaoDuongInput.nativeElement).val().toString();
    //         t.thongtinbaoduong.ngayBaoDuongTiepTheo = $(t.ngayBaoDuongTiepTheoInput.nativeElement).val().toString();
    //     });
    // }
    show(thongtinbaoduongId?: number | null | undefined): void {
        this.saving = false;


        this._thongtinbaoduongService.getThongTinBaoDuongForEdit(thongtinbaoduongId).subscribe(result => {
            this.thongtinbaoduong = result;
            if (result.ngayBaoDuong != null && result.ngayBaoDuongTiepTheo != null) {
                this.ngayBaoDuong = result.ngayBaoDuong.toDate();
                this.ngayBaoDuongTiepTheo = result.ngayBaoDuongTiepTheo.toDate();
            }
            this.modal.show();

        })
    }

    save(): void {
        this.thongtinbaoduong.ngayBaoDuong = moment(this.ngayBaoDuong);
        this.thongtinbaoduong.ngayBaoDuongTiepTheo = moment(this.ngayBaoDuongTiepTheo);
        let input = this.thongtinbaoduong;
        console.log(input);
        this.saving = true;
        this._thongtinbaoduongService.createOrEditThongTinBaoDuong(input).subscribe(result => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
        })

    }

    close(): void {
        this.modal.hide();
        this.modalSave.emit(null);
    }
}

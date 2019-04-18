import{Component , ElementRef, EventEmitter,Injector, Output, ViewChild} from '@angular/core';
import{AppComponentBase} from '@shared/common/app-component-base';
import{ModalDirective} from 'ngx-bootstrap';
import {ThongTinVanHanhXeServiceProxy, ThongTinVanHanhXeInput} from '@shared/service-proxies/service-proxies';

@Component({
    selector:'createOrEditThongTinVanHanhXeModal',
    templateUrl:'./create-or-edit-thongtinvanhanhxe-modal.component.html',
})

export class CreateOrEditThongTinVanHanhXeModalComponent extends AppComponentBase
{
    @ViewChild('createOrEditModal') modal : ModalDirective;
    @ViewChild('customerCombobox') thongTinVanHanhXeCombobox: ElementRef;
    @ViewChild('iconCombobox') iconCombobox: ElementRef;
    @ViewChild('dataInput') dataInput:ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    saving = false;

    thongtinvanhanhxe: ThongTinVanHanhXeInput = new ThongTinVanHanhXeInput();
    constructor(
        injector: Injector,
        private _thongTinVanHanhXeService: ThongTinVanHanhXeServiceProxy)
        {
            super(injector);

        }

        show(id?: number| null|undefined):void{
            this.saving = false;
            this._thongTinVanHanhXeService.getThongTinVanHanhXeForEdit(id).subscribe(result=>{
                this.thongtinvanhanhxe = result;
                this.modal.show();

            })

        }

        save():void{
            let input = this.thongtinvanhanhxe;
            this.saving= true;
            this._thongTinVanHanhXeService.createOrEditThongTinVanHanhXe(input).subscribe(result =>{
                this.notify.info(this.l('Saved Successfully'));
                this.close ();
            })
        }

        close():void{
            this.modal.hide();
            this.modalSave.emit(null);
        }


}

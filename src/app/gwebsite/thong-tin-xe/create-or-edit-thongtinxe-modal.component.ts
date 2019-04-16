import { Component, ElementRef, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { ThongTinXeServiceProxy, CustomerInput, ThongTinXeInput } from '@shared/service-proxies/service-proxies';

@Component({
    selector:'createOrEditThongTinXeModal',
    templateUrl:'./create-or-edit-thongtinxe-modal.component.html'
})

export class CreateOrEditThongTinXeModalComponent extends AppComponentBase{

    @ViewChild('createOrEditModal') modal : ModalDirective;
    @ViewChild('customerCombobox') custommerCombobox: ElementRef;
    @ViewChild('iconCombobox') iconCombobox: ElementRef;
    @ViewChild('dataInput') dataInput: ElementRef;

    @Output() modalSave : EventEmitter<any> = new EventEmitter<any>();
    saving = false;

    thongTinXe : ThongTinXeInput = new ThongTinXeInput();
    constructor(
        injector: Injector,
        private _thongTinXeService: ThongTinXeServiceProxy
    )
    {
        super(injector);
    }

    show(Id?:number|null|undefined):void{
        this.saving = false;
        console.log('ketqua'+ Id);
        this._thongTinXeService.getThongTinXeForEdit(Id).subscribe(resutl=>{
            this.thongTinXe = resutl;
            
            this.modal.show();
        })
    }

    save():void{
        let input = this.thongTinXe;
        this.saving = true;
        this._thongTinXeService.createOrEditThongTinXe(input).subscribe(result=>{
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();

        })
       
    
    }

    close():void{
            this.modal.hide();
            this.modalSave.emit(null);
                        
    }

}

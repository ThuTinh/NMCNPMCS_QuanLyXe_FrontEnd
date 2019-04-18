import{ThongTinVanHanhXeForViewDto, ThongTinXeForViewDto} from '../../../shared/service-proxies/service-proxies';
import {AppComponentBase} from '@shared/common/app-component-base';
import{AfterViewInit, Injector, Component, ViewChild, Input} from '@angular/core';
import {ThongTinVanHanhXeServiceProxy} from '@shared/service-proxies/service-proxies';
import {ModalDirective} from 'ngx-bootstrap';


@Component({
    selector:'viewThongTinVanHanhXeModal',
    templateUrl:'./view-thongtinvanhanhxe-modal.component.html'
})

export class ViewThongTinVanHanhXeModalComponent extends AppComponentBase
{
    thongtinvanhanhxe: ThongTinVanHanhXeForViewDto = new ThongTinVanHanhXeForViewDto();
    @ViewChild('viewModal') modal: ModalDirective;
    

    
    constructor(
        injector: Injector,
        private _thongtinvanhanhxeService: ThongTinVanHanhXeServiceProxy
    )
    {
        super(injector);
    }

    show(id?: number|null|undefined):void{
        this._thongtinvanhanhxeService.getThongTinVanhanhXeForView(id).subscribe(result =>
            {
                this.thongtinvanhanhxe  =result;
               
                this.modal.show();
            })
    }

    close():void{
        this.modal.hide();
    }
}
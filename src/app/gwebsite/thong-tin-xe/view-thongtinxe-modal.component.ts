
import { ThongTinXeForViewDto } from '../../../shared/service-proxies/service-proxies';
import { AppComponentBase } from "@shared/common/app-component-base";
import { AfterViewInit, Injector, Component, ViewChild } from "@angular/core";
import { ThongTinXeServiceProxy } from "@shared/service-proxies/service-proxies";
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'viewThongTinXeModal',
    templateUrl:'./view-thongtinxe-modal.component.html'
})
export class ViewThongTinXeModalComponent extends AppComponentBase {

thongtinxe: ThongTinXeForViewDto = new ThongTinXeForViewDto();
@ViewChild('viewModal') modal : ModalDirective;

constructor( 
injector : Injector,
private _thongtinxeService: ThongTinXeServiceProxy
)
{
    super(injector);
}

show(Id?:number | null | undefined): void {
    this._thongtinxeService.getThongTinXeForView(Id).subscribe(result =>{
        this.thongtinxe = result;
        this.modal.show();
    })

}
close():void{
    this.modal.hide();
}

}
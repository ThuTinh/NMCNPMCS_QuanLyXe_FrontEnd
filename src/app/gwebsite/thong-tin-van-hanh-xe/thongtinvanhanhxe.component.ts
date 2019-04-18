import{ViewThongTinVanHanhXeModalComponent} from './view-thongtinvanhanhxe-modal.component';
import{AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild} from '@angular/core';
import{ ActivatedRoute, Params, Router} from '@angular/router';
import{appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as _ from 'lodash';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import{ThongTinVanHanhXeServiceProxy} from '@shared/service-proxies/service-proxies';
import{ CreateOrEditThongTinVanHanhXeModalComponent} from './create-or-edit-thongtinvanhanhxe-modal.component';
import { AbpModule } from 'abp-ng2-module/dist/src/abp.module';
import { ModalDirective } from 'ngx-bootstrap';
import{ThongTinXeServiceProxy}  from '@shared/service-proxies/service-proxies';
import{ThongTinXeForViewDto} from '@shared/service-proxies/service-proxies';

@Component({
    selector:'thongTinVanHanhXeModal',
    templateUrl:'./thongtinvanhanhxe.component.html',
    animations:[appModuleAnimation()]

})

export class ThongTinVanHanhXeComponent extends AppComponentBase
{
    @ViewChild('dataTable') dataTable : Table;
    @ViewChild('paginator') paginator: Paginator;
    @ViewChild('createOrEditModal') createOrEditModal : CreateOrEditThongTinVanHanhXeModalComponent;
     @ViewChild('showThongTinVanHanhXeModal') showThongTinVanHanhXeModal: ViewThongTinVanHanhXeModalComponent;
    @ViewChild('showThongTinVanHanhXe') modal : ModalDirective;
    thongTinXeId: string;
    thongtinxe: ThongTinXeForViewDto = new ThongTinXeForViewDto();
    constructor(
        injector: Injector,
        private _thongTinVanHanhXeService: ThongTinVanHanhXeServiceProxy,
        private _activateRoute: ActivatedRoute,
        private _thongTinXeService: ThongTinXeServiceProxy
    )
    {
        super(injector);
    }
    ngAfterViewInit():void{
        setTimeout(()=>{
          //  this.init ();
        });
    }

    show(id?: number| null|undefined, thongtinxeid?: number|null|undefined):void{
       
        setTimeout(()=>{
             this.init (thongtinxeid);
             this.getThongTinXe(id);
          });
         
            
            
    

       
        this.modal.show();

    }
    close():void{
        this.modal.hide();
    }
    getThongTinVanHanhXes(event? :LazyLoadEvent)
    {
        if(!this.paginator|| this.dataTable){
            return ;
        }
        this.primengTableHelper.showLoadingIndicator();
        this.reloadList(null, event);

    }

    getThongTinXe(thongTinXeId): void{
        console.log('met qua roi1: id = ' + thongTinXeId);
        this._thongTinXeService.getThongTinXeForView(thongTinXeId).subscribe(result=>{
            this.thongtinxe = result;
            console.log('met qua roi1: '+ result);

        });

    }
    reloadList(thongTinXeId, event?:LazyLoadEvent)
    {
        console.log('ham reload list: ' + thongTinXeId);
        this._thongTinVanHanhXeService.getThongTinVanHanhXeByFilter(this.thongTinXeId, this.primengTableHelper.getSorting(this.dataTable),
        this.primengTableHelper.getMaxResultCount(this.paginator,event),
        this.primengTableHelper.getSkipCount(this.paginator, event),
        ).subscribe( result =>{
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
            console.log('ket qua fill');
        });

        
    }

    deleteThongTinVanHanhXe(id): void{
        this._thongTinVanHanhXeService.deleteThongTinVanHanhXe(id).subscribe(()=>{
            this.reloadPage();
        })
    }

    viewThongTinVanHanhXe(id):void{
      //  var modal = this.showThongTinVanHanhXeModal;
       // modal.show();
    }

    init(id):void{

        this._activateRoute.params.subscribe((params:Params)=>{
            //this.thongTinXeId = params['ThogTinXeId']||'';
            this.thongTinXeId = id;
            this.reloadList(this.thongTinXeId,null);
            
        });
    }

    reloadPage():void{
        this.getThongTinVanHanhXes();
        this.paginator.changePage(this.paginator.getPage());
    }

    applyFilters():void{
        this.reloadList(this.thongTinXeId, null);
        if(this.paginator.getPage()!=0)
        {
            this.paginator.changePage(0);
            return;
        }

    }
    createThongTinVanHanhXe(){
        this.createOrEditModal.show();
    }
    truncateString(text):string{
        return abp.utils.truncateStringWithPostfix(text,32,'...');
    }
}
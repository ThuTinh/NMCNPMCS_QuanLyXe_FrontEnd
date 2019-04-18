import { ViewThongTinXeModalComponent } from './view-thongtinxe-modal.component';
import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as _ from 'lodash';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import { ThongTinXeServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditThongTinXeModalComponent } from './create-or-edit-thongtinxe-modal.component';
import {ThongTinVanHanhXeComponent} from '../thong-tin-van-hanh-xe/thongtinvanhanhxe.component';


@Component({
    selector: 'viewThongTinXeModal',
    templateUrl:'./thongtinxe.component.html',
    animations: [appModuleAnimation()]

})
export class ThongTinXeComponent extends AppComponentBase implements AfterViewInit, OnInit{

    @ViewChild('dataTable') dataTable : Table;
    @ViewChild('paginator') paginator: Paginator;
    @ViewChild('createOrEditModal') createOrEditModal : CreateOrEditThongTinXeModalComponent;
    //  @ViewChild('viewThongTinXeModal') viewThongTinXeModal: ViewThongTinXeModalComponent;
    @ViewChild('thongTinVanHanhXeComponent') thongTinVanHanhXeComponent : ThongTinVanHanhXeComponent;


    thongTinXeId:string;
    constructor( injector: Injector, private _thongTinXeService: ThongTinXeServiceProxy, private _activateRoute: ActivatedRoute){
        super(injector);

    }

    ngOnInit():void{

    }
    ngAfterViewInit():void{
        setTimeout(()=>{
            this.init();
        });
    }

   
    getThongTinXes(event?: LazyLoadEvent){
        if(!this.paginator|| this.dataTable){
            return ;
        }
        this.primengTableHelper.showLoadingIndicator();
        this.reloadList(null, event);
    }

    reloadList(thongTinXeId, event?: LazyLoadEvent)
    {
        this._thongTinXeService.getThongTinXeByFilter(thongTinXeId, this.primengTableHelper.getSorting(this.dataTable),
        this.primengTableHelper.getMaxResultCount(this.paginator, event),
        this.primengTableHelper.getSkipCount(this.paginator, event),
        ).subscribe(result=>{
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    deleThongTinXe(id):void{

        console.log('delete xe: '+ id);
        this._thongTinXeService.deleteThongTinXe(id).subscribe(()=>{
            console.log('ketquaxoa: '+ id);
            this.reloadPage();
        })
    }

    viewThongTinXe(id) : void{
       
    //    var modal = this.viewThongTinXeModal;
    //     modal.show(id);
    }

    ShowThongTinVanHanhXe(id, thongtinxeid):void
    {
        console.log("id + maxe:" + id + thongtinxeid);
        var modal = this.thongTinVanHanhXeComponent;
        modal.show(id,thongtinxeid);
    }

    init():void{
        this._activateRoute.params.subscribe((params: Params)=>{
            this.thongTinXeId = params['ThongTinXeId']||'';
            this.reloadList(this.thongTinXeId, null);
        });

    }

    reloadPage():void{
        console.log('corealoag');
        this.getThongTinXes();
        this.paginator.changePage(this.paginator.getPage());
    }
    applyFilters():void{
        this.reloadList(this.thongTinXeId, null);
        if(this.paginator.getPage()!==0)
        {
            this.paginator.changePage(0);
            return ;
        }
    }
    createThongTinXe(){
        this.createOrEditModal.show();
    }

    truncateString(text):string{
        return abp.utils.truncateStringWithPostfix(text, 32, '...');
    }
}
import { ViewThongTinSuaChuaModalComponent } from './view-thongtinsuachua-modal.component';
import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as _ from 'lodash';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import { ThongTinSuaChuaServiceProxy, ModelForViewDto, CheckServiceProxy, ThongTinSuaChuaDTO, UserSevicrServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditThongTinSuaChuaModalComponent } from './create-or-edit-thongTinSuaChua-modal.component';
import { ThongTinXeViewDTO } from '../thongtinxe/dto/ThongTinXeViewDTO';

@Component({
    templateUrl: './thongTinSuaChua.component.html',
    animations: [appModuleAnimation()]
})

export class ThongTinSuaChuaComponent extends AppComponentBase implements AfterViewInit, OnInit {

    /**
    * @ViewChild là dùng get control và call thuộc tính, functions của control đó
    */
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;
    @ViewChild('createOrEditModal') createOrEditModal: CreateOrEditThongTinSuaChuaModalComponent;
    @ViewChild('viewThongTinSuaChuaModal') viewThongTinSuaChuaModal: ViewThongTinSuaChuaModalComponent;

    /**
    * tạo các biến dể filters
    */
    thongTinSuaChuaName: string;

    thongtinxeDto: ThongTinXeViewDTO = new ThongTinXeViewDTO();
    soXe: string;
    model: ModelForViewDto = new ModelForViewDto();
    isDuyet: boolean = false;
    currentUser: string;
    thongtinsuachuas: ThongTinSuaChuaDTO[] = [];

    constructor(
        injector: Injector,
        private _thongTinSuaChuaService: ThongTinSuaChuaServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _isDuyet: CheckServiceProxy,
        private _user: UserSevicrServiceProxy
    ) {
        super(injector);
        // _isDuyet.isDuyet().subscribe(result => {
        //     this.isDuyet = result;
        // })
        _user.getUser().subscribe(result => {
            this.currentUser = result;
            if (this.currentUser == "admin")
                this.isDuyet = true;
        })

    }

    ngOnInit(): void {
    }


    ngAfterViewInit(): void {
        setTimeout(() => {
            this.init();
        });
    }


    getThongTinSuaChuas(event?: LazyLoadEvent) {
        if (!this.paginator || !this.dataTable) {
            return;
        }

        //show loading trong gridview
        this.primengTableHelper.showLoadingIndicator();

        this.reloadList(null, event);

    }

    getThongTinXe(item: ThongTinXeViewDTO) {
        this.thongtinxeDto = item;
        this.soXe = item.soXe;
        this.reloadList(null);

    }

    reloadList(thongTinSuaChuaName, event?: LazyLoadEvent) {

        this.soXe = this.thongtinxeDto.soXe;
        if (this.soXe != undefined) {
            this._thongTinSuaChuaService.getThongTinSuaChuasByFilter(this.soXe, undefined, undefined, undefined, this.primengTableHelper.getSorting(this.dataTable),
                this.primengTableHelper.getMaxResultCount(this.paginator, event),
                this.primengTableHelper.getSkipCount(this.paginator, event),
            ).subscribe(result => {
                result.items.map(item => {
                    if (item.trangThaiDuyet == "Đã duyệt" || item.createdBy == this.currentUser) {
                        this.thongtinsuachuas.push(item);
                    }
                })
                if (this.isDuyet) {
                    this.primengTableHelper.totalRecordsCount = result.items.length;
                    this.primengTableHelper.records = result.items;
                }
                else {
                    this.primengTableHelper.totalRecordsCount = this.thongtinsuachuas.length;
                    this.primengTableHelper.records = this.thongtinsuachuas;
                }


            });
        }
        this.primengTableHelper.hideLoadingIndicator();
    }

    ThongTinSuaChua(id): void {
        this._thongTinSuaChuaService.deleteThongTinSuaChua(id).subscribe(() => {
            this.reloadPage();
        })
    }

    init(): void {

        this._activatedRoute.params.subscribe((params: Params) => {
            this.thongTinSuaChuaName = params['soXe'] || '';
            this.reloadList(this.thongTinSuaChuaName, null);
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    applyFilters(): void {
        this.reloadList(this.thongTinSuaChuaName, null);

        if (this.paginator.getPage() !== 0) {
            this.paginator.changePage(0);
            return;
        }
    }

    createThongTinSuaChua() {
        this.createOrEditModal.show();
    }

    truncateString(text): string {
        return abp.utils.truncateStringWithPostfix(text, 32, '...');
    }
}
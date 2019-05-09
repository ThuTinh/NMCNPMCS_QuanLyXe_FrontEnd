import { ViewPhiDuongBoModalComponent } from './view-phiDuongBo-modal.component';
import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as _ from 'lodash';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';
import { PhiDuongBoServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditPhiDuongBoModalComponent } from './create-or-edit-phiDuongBo-modal.component';

@Component({
    templateUrl: './phiDuongBo.component.html',
    animations: [appModuleAnimation()]
})
export class PhiDuongBoComponent extends AppComponentBase implements AfterViewInit, OnInit {

    /**
    * @ViewChild là dùng get control và call thuộc tính, functions của control đó
    */
    @ViewChild('dataTable') dataTable: Table;
    @ViewChild('paginator') paginator: Paginator;
    @ViewChild('createOrEditModal') createOrEditModal: CreateOrEditPhiDuongBoModalComponent;
    @ViewChild('viewPhiDuongBoModal') viewPhiDuongBoModal: ViewPhiDuongBoModalComponent;

    /**
    * tạo các biến dể filters
    */
    phiDuongBoName: string;

    constructor(
        injector: Injector,
        private _phiDuongBoService: PhiDuongBoServiceProxy,
        private _activatedRoute: ActivatedRoute,
    ) {
        super(injector);
    }

    /**
    * Hàm xử lý trước khi View được init
    */
    ngOnInit(): void {
    }

    /**
    * Hàm xử lý sau khi View được init
    */
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.init();
        });
    }

    /**
    * Hàm get danh sách PhiDuongBo
    * @param event
    */
    getPhiDuongBos(event?: LazyLoadEvent) {
        if (!this.paginator || !this.dataTable) {
            return;
        }

        //show loading trong gridview
        this.primengTableHelper.showLoadingIndicator();

        /**
                    * mặc định ban đầu lấy hết dữ liệu nên dữ liệu filter = null
                    */

        this.reloadList(null, event);

    }

    reloadList(phiDuongBoName, event?: LazyLoadEvent) {
        this._phiDuongBoService.getPhiDuongBosByFilter(phiDuongBoName, this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getMaxResultCount(this.paginator, event),
            this.primengTableHelper.getSkipCount(this.paginator, event),
        ).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    deletePhiDuongBo(id): void {
        this._phiDuongBoService.deletePhiDuongBo(id).subscribe(() => {
            this.reloadPage();
        })
    }

    init(): void {
        //get params từ url để thực hiện filter
        this._activatedRoute.params.subscribe((params: Params) => {
            this.phiDuongBoName = params['soXe'] || '';
            this.reloadList(this.phiDuongBoName, null);
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    applyFilters(): void {
        //truyền params lên url thông qua router
        this.reloadList(this.phiDuongBoName, null);

        if (this.paginator.getPage() !== 0) {
            this.paginator.changePage(0);
            return;
        }
    }

    //hàm show view create MenuClient
    createPhiDuongBo() {
        this.createOrEditModal.show();
    }

    /**
    * Tạo pipe thay vì tạo từng hàm truncate như thế này
    * @param text
    */
    truncateString(text): string {
        return abp.utils.truncateStringWithPostfix(text, 32, '...');
    }
}

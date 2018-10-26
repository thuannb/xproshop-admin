import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/common/message.constants';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})

export class RoleComponent implements OnInit {
  public modalRef: BsModalRef;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public totalRows: number;
  public filter: string = '';
  public roles: any[];
  public entity: any;
  public tagModal: string = "Thêm mới";

  constructor(private _dataService: DataService,
    private _notificationService: NotificationService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this._dataService.get('/api/appRole/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((respone: any) => {
        this.roles = respone.Items;
        this.pageIndex = respone.PageIndex;
        this.pageSize = respone.PageSize;
        this.totalRows = respone.TotalRows;
      }, error => {
        this._notificationService.printErrorMessage('Không tải được dữ liệu!')
      });
  }

  pageChanged(event: any) {
    this.pageIndex = event.page;
    this.loadData();
  }

  saveChange(valid: boolean) {
    if (valid) {
      if (this.entity.Id == undefined) {
        this._dataService.post('/api/appRole/add', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.loadData();
            this.modalRef.hide();
            this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/appRole/update', JSON.stringify(this.entity))
          .subscribe((response: any) => {
            this.loadData();
            this.modalRef.hide();
            this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          }, error => this._dataService.handleError(error));
      }
    }
  }

  openAddModal(template: TemplateRef<any>) {
    this.tagModal = "Thêm mới";
    this.entity = {};
    this.modalRef = this.modalService.show(template);
  }


  openEditModal(id: any, template: TemplateRef<any>) {
    this.tagModal = "Sửa";
    this.loadRoleEdit(id);
    this.modalRef = this.modalService.show(template);
  }

  loadRoleEdit(id: any) {
    this._dataService.get('/api/appRole/detail/' + id)
      .subscribe((respone: any) => {
        this.entity = respone;
      }, error => {
        this._notificationService.printErrorMessage(MessageContstants.SYSTEM_ERROR_MSG);
      });
  }

  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id))
  }

  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/appRole/delete', 'id', id).subscribe((respone: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    })
  }
}

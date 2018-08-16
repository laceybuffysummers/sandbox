import { IAuthServiceToken, IAuthService } from './../../services/auth/i-auth.service';
import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../common/base.component';
import { IProcessServiceToken, IProcessService } from '../../services/process/i-process-service';
import { FileUploaderMulti } from './file-uploader-multi';
import { FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { UploadedFiles } from '../../models/files/uploaded-files';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent
  extends BaseComponent implements OnInit {

  @Input()
  public uploadUrl: string;

  @Output()
  public uploaded: EventEmitter<UploadedFiles> = new EventEmitter<UploadedFiles>();

  private hasBaseDropZoneOver = false;
  private uploader: FileUploaderMulti;

  constructor(
    @Inject(IProcessServiceToken) protected processService: IProcessService,
    @Inject(IAuthServiceToken) private authService: IAuthService
  ) {
    super(processService);
  }

  public ngOnInit(): void {
    const user = this.authService.getUser();
    this.uploader = new FileUploaderMulti({
      url: this.uploadUrl,
      authToken: `Bearer ${user ? user.token : ''}`
    });

    this.uploader.onCompleteItem = (
        item: FileItem,
        response: string,
        status: number,
        headers: ParsedResponseHeaders) => {
          this.uploaded.emit(JSON.parse(response));
    };
  }

  private fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}


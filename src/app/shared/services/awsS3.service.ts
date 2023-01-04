import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import * as S3 from 'aws-sdk/clients/s3';
import { s3Access } from 'src/credentials';


@Injectable({
  providedIn: 'root'
})
export class AwsS3Service {

  constructor(
    private _appService: AppService,
    private http: HttpClient
  ) { }


  public getS3Bucket(): any {
    const bucket = new S3(s3Access);

    return bucket;
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { S3Client } from '@aws-sdk/client-s3';
import { AppService } from 'src/app/app.service';

import { s3Access } from 'src/credentials';


@Injectable({
  providedIn: 'root'
})
export class AwsS3Service {

  constructor(
    private _appService: AppService,
    private http: HttpClient
  ) { }


  public getS3Bucket(): S3Client {

    const bucket = new S3Client (s3Access);
    return bucket;
    
  }

}

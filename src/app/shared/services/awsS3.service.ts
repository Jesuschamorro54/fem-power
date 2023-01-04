import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import * as S3 from 'aws-sdk/clients/s3';


@Injectable({
  providedIn: 'root'
})
export class AwsS3Service {

  constructor(
    private _appService: AppService,
    private http: HttpClient
  ) { }


  public getS3Bucket(): any {
    const bucket = new S3(
      {
        //  User: s3AngularAccess
        accessKeyId: 'AKIA2MZZSFAOOBKXJZ2K',
        secretAccessKey: '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',
        region: 'us-east-1'
      }
    );

    return bucket;
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth/auth.service';

import { s3Access } from 'src/credentials';
import { environment } from 'src/environments/environment';
import { dataUploadFile } from './awsS3Models';


@Injectable({
  providedIn: 'root'
})
export class AwsS3Service {

  private bucketName = {
    'ipt-user-photo': 'fempower-public',
    'ipt-cover-photo': 'fempower-public'
  }

  private fileNames = {
    'ipt-user-photo': 'avatar',
    'ipt-cover-photo': 'cover'
  }

  constructor(
    private _authService: AuthService,
    private _appService: AppService,
    private http: HttpClient
  ) { }


  public getS3Bucket(): S3Client {

    const bucket = new S3Client(s3Access);
    return bucket;

  }


  public uploadFileS3(params: dataUploadFile): Promise<any> {
    return new Promise((resolved, reject) => {

      const { filePath, fileList, fileInput, element_id, folderKey, extension_type, haveHash = true } = params;
      const allowedImageExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const allowedDocsExtensions = /(\.doc|\.pdf|\.dot|\.txt|\.docx)$/i;

      // Comprobar que lleguen los parametros necesarios
      if (!filePath || !fileInput || !element_id || !folderKey) {
        let error = `Insufficient parameters for this function: ${!filePath ? '{filePath}' : ''} ${!folderKey ? '{folderKey}' : ''} ${!fileInput ? '{fileInput}' : ''} ${!element_id ? '{element_id}' : ''}`;
        reject(error)
      }

      // Validar que el tipo de extension para Imagenes sea el adecuado
      if (!allowedImageExtensions.exec(filePath) && extension_type == 'img') {
        reject('The file format is not valid');
      }

      // Validar que el tipo de extension para Documentos sea el adecuado
      if (!allowedDocsExtensions.exec(filePath) && extension_type == 'doc') {
        reject('The file format is not valid');
      }


      // Validar que el fileList llegue completo
      if (fileList.length <= 0) {
        reject("The 'fileList' parameter cannot be null");
      }

      let file: any
      const { size, name, type } = fileList[0];
      const imgSizeRecomended = Boolean((size <= (1024 * 1024 * 250)) && extension_type == 'img'); // 250 MB
      const docSizeRecomended = Boolean((size <= (1024 * 1024 * 500)) && extension_type == 'doc'); // 500 MB

      // Validar que esté dentro de los tamaños
      if (!imgSizeRecomended && !docSizeRecomended) {
        reject('The file exceeds the stipulated size')
      }

      let extension = name.toLowerCase().split('.').pop();
      let tokenhash = this._authService.generateRandomString();

      file = {
        size: size,
        file_type: type,
        file_ext: extension,
        file_name: `${this.fileNames[element_id]}${haveHash ? '-' + tokenhash : ''}.${extension}`
      }

      const Bucketparams = {
        Bucket: this.bucketName[element_id],
        Key: `${folderKey}/${file.file_name}`,
        Body: fileList[0],
        ContentType: file.file_type
      };

      const command = new PutObjectCommand(Bucketparams)
      this.getS3Bucket().send(command, (error, data) => {

        if (error) {
          // this.alert.error = 'Ocurrió un error al subir el documento. Por favor recargue y vuelva intentarlo'
          console.log(error);
          reject('An error occurred while trying to upload the file. Check the data.');
        }

        const is_public = Bucketparams.Bucket.includes('public')

        let response = {
          file,
          Location: is_public ? environment.s3PublicUrl + `${folderKey}/${file.file_name}` : null
        }

        resolved({status: true, data: response });

      });



    })

  }


}


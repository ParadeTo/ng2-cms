import {Injectable}from '@angular/core';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class UploadService {
  progress$: any;
  progress: any;
  progressObserver: any;
  constructor() {
    this.progress$ = Observable.create((observer:any) => {
      this.progressObserver = observer;
    }).share();
  }

  makeFileRequest(url: string, params: string[], fileName:string, files: File[]): Observable<any> {
    return Observable.create((observer:any) => {
      let formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append(fileName, files[i], files[i].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = (event) => {
        this.progress = Math.round(event.loaded / event.total * 100);
        this.progressObserver.next(this.progress);
      };

      // xhr.onerror = () => {
      //   console.log('error');
      //   observer.error(xhr.response);
      // };

      xhr.open('POST', url, true);
      var serverFileName = xhr.send(formData);
      return serverFileName;
    });
  }
}

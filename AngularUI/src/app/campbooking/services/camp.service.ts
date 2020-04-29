import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camp} from '../models/camp.interface';
import { Injectable } from '@angular/core';
import { CampFilter } from '../models/campFilter.interface';
import { FormGroup } from '@angular/forms';

@Injectable()
export class CampService{
  url = 'http://localhost:53056/api/Camp';

  constructor(private http: HttpClient) {}


  async getAllFilteredCamps(checkIn: Date , checkOut: Date , capacity: number)
  {
    const params = new HttpParams().set('checkIn', checkIn.toString())
                                   .set('checkOut', checkOut.toString())
                                   .set('capacity', capacity.toString());


    return this.http.get<Camp[]>(this.url, {params});

  }
  async postNewCamp(campForm: FormGroup , imageToUpload: File)
  {
    const formData: FormData = new FormData();
    Object.entries(campForm.value).forEach(
      ([key, value]: any[]) =>{
        formData.set(key,value);
      }
    )
    formData.append('image', imageToUpload, imageToUpload.name);
    return this.http.post(this.url, formData);
  }
  async getAllCamps()
  {
    return this.http.get<Camp[]>(this.url);
  }


}

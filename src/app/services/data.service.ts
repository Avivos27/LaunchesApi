import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const apiEndPoint = `https://launchlibrary.net/1.4/launch`;

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}

  getLaunchesByDates(start, end, options) {
    let url;
    if (!start || !end) url = apiEndPoint;
    else url = `${apiEndPoint}/${start}/${end}`;
    if (options) {
      let optionKeys = Object.keys(options);
      optionKeys.forEach((key, index) => {
        if (index === 0) url += `?${key}=${options[key]}`;
        else url += `&${key}=${options[key]}`;
      });
    }
    return this.http.get<any>(url);
  }

  getLaunchById(id) {
    let url = `${apiEndPoint}/${id}`;
    return this.http.get<any>(url);
  }

  getLaunchesByName(name, options) {
    let url = `${apiEndPoint}/${name}`;
    if (options) {
      let optionKeys = Object.keys(options);
      optionKeys.forEach((key, index) => {
        if (index === 0) url += `?${key}=${options[key]}`;
        else url += `&${key}=${options[key]}`;
      });
    }
    return this.http.get<any>(url);
  }
}

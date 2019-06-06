import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) { }

  getTeams() {
    const teamsUrl = 'https://next.json-generator.com/api/json/get/VkLcRgfA8';
    return this.http.get(teamsUrl);
  }

}

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Client, ClientListResponse } from '../../shared/models/client';
import { Sorting } from '../../shared/components/table/table.component';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private readonly baseUrl = 'http://localhost:3000/clients'; 


  constructor(private http: HttpClient) {}


  getClientsList(pageSize:number = 10, pageIndex:number = 1, sorting:Sorting|null, filter:{termo:string, prop:string}): Observable<ClientListResponse> {
    const url = `${this.baseUrl}?_limit=${pageSize}&_page=${pageIndex}`;
    const sortParam = sorting ? `&_sort=${sorting.prop}&_order=${sorting.direction}` : '';
    const filterTerm = filter.termo ? `&${filter.prop}_like=${filter.termo}` : '';
    const finalUrl = `${url}${sortParam}${filterTerm}`;
    return this.http.get<Client[]>(finalUrl, {observe: 'response'}).pipe(
      map((response: HttpResponse<Client[]>) => {
        const data = response.body || [];
        const totalCountHeader = response.headers.get('X-Total-Count');
        const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : data.length;

        return { data, totalCount };
      })
    );
  }

  getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${id}`);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client, this.httpOptions);
  }

  updateClient(client: Client): Observable<Client> {
    if (!client.id) {
      throw new Error('Client ID is required for update');
    }
    return this.http.put<Client>(
      `${this.baseUrl}/${client.id}`,
      client,
      this.httpOptions
    );
  }

  deleteClient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

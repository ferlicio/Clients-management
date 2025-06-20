import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../shared/models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private readonly baseUrl = 'http://localhost:3000/clients'; 


  constructor(private http: HttpClient) {}


  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl);
  }

  getClientById(id: number): Observable<Client> {
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

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

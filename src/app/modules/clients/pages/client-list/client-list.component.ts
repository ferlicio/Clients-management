import { Component } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { Client, ClientListResponse } from '../../../../shared/models/client';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Sorting } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-client-list',
  standalone: false,
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
  pageSize: number = 10
  pageIndex: number = 0
  currentSort: Sorting | null = null;
  clientsList$!: Observable<ClientListResponse>;
  totalClientsCount: number = 0;

  constructor(
      public router: Router,
      private clientService: ClientService,
      public dialog: MatDialog,
  ) {
    this.loadClients();
  }

  private loadClients(): void {
    this.clientsList$ = this.clientService.getClientsList(this.pageSize, this.pageIndex + 1, this.currentSort).pipe(
      tap(response => {
        this.totalClientsCount = response.totalCount; 

        if (response.data.length === 0 && this.pageIndex > 0) {
          this.pageIndex = Math.max(0, this.pageIndex - 1);
          this.loadClients();
        }
      })
    );
  }

  deleteUser(id?: string) {
    if (!id) {
      this.dialog.open(DialogComponent, {
        data: {
          title: "Erro",
          message: "ID do usuário não encontrado.",
          buttons: ["OK"]
        }
      });
      return;
    }

    this.clientService.deleteClient(id).subscribe(() => {
      this.loadClients();
    })
    
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.loadClients();
  }

  sortColumn($event: Sorting | null) {
    this.currentSort = $event;
    this.loadClients();
  }
}

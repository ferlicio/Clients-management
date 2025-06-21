import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { Client, ClientListResponse } from '../../../../shared/models/client';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Sorting } from '../../../../shared/components/table/table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-list',
  standalone: false,
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit{
  pageSize: number = 10
  pageIndex: number = 0
  currentSort: Sorting | null = null;
  clientsList$!: Observable<ClientListResponse>;
  totalClientsCount: number = 0;
  colunas:{name: string, prop: keyof Client}[] = 
  [
    {name:'Nome Cliente', prop: 'nome'},
    {name:'CPF', prop: 'cpf'},
    {name:'Data Cadastro', prop: 'dataCadastro'},
    {name:'Renda Mensal', prop: 'rendaMensal'},
  ];
  selectList: {label: string, value: keyof Client}[] = 
    this.colunas.map(c => ({ label: c.name, value: c.prop }))
  filterForm!: FormGroup


  constructor(
      public router: Router,
      private clientService: ClientService,
      public dialog: MatDialog,
      private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      termo: ['',Validators.required],
      prop: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.pageIndex = 0;
    this.pageSize = 10;
    this.currentSort = null;
    this.filterForm.reset();
    this.loadClients();
  }

  resetFilter() {
    this.filterForm.reset();
    this.loadClients();
  }

  loadClients(): void {
    let filter = this.filterForm.valid ? this.filterForm.value : { termo: '', prop: '' };
    this.clientsList$ = this.clientService.getClientsList(this.pageSize, this.pageIndex + 1, this.currentSort, filter).pipe(
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

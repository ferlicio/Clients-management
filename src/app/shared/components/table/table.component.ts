import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Client } from '../../models/client';

export interface Sorting {
  prop: keyof Client;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() redirectURL = '/clients';
  @Input() hasEdit = true;
  @Input() hasDelete = true;
  @Input() hasView = true;
  @Input() sortable = true;
  @Input() appliedSort: Sorting | null = null;
  @Output() sortEvent = new EventEmitter<Sorting|null>();
  @Output() editFunction = new EventEmitter<string>();
  @Output() deleteFunction = new EventEmitter<string>();


  @Input() columns!: {name: string, prop: keyof Client}[]
  @Input() data: Client[] = [
    {
      id: '1',
      nome: 'João da Silva',
      cpf: '123.456.789-00',
      dataCadastro: '2023-01-01',
      rendaMensal: 5000,
    },
    {
      id: '2',
      nome: 'Maria Oliveira',
      cpf: '987.654.321-00',
      dataCadastro: '2023-02-15',
      rendaMensal: 7000
    },
    {
      id: '3',
      nome: 'Carlos Pereira',
      cpf: '456.789.123-00',
      dataCadastro: '2023-03-10',
      rendaMensal: 6000
    }
  ];


  constructor(
      public dialog: MatDialog,
  ) {}

  sortColumn(column: string) {
    if (!this.sortable) return;

    const currentSort = this.appliedSort;

    if (currentSort?.prop === column) {

      if (currentSort.direction === 'desc') {
        this.appliedSort = { prop: column as keyof Client, direction: 'asc' };
      }
      else {
        this.appliedSort = null;
      }
    } else {
      const newDirection = currentSort?.prop === column && currentSort.direction === 'desc' ? 'asc' : 'desc';
      this.appliedSort = { prop: column as keyof Client, direction: newDirection };
    }
    
    this.sortEvent.emit(this.appliedSort);
  }


  confirmDelete(id?: string) {
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

    this.dialog.open(DialogComponent, {
      data: {
        title: "Deletar Usuário",
        message: "Deseja realmente deletar este usuário?",
        type: "boolean",
        buttons: ["Cancelar", "Deletar"]
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.deleteFunction.emit(id);
      }
    })
  }

}

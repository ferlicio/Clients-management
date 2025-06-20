export interface Client {
    id?: string;
    nome: string;
    cpf: string;
    dataNascimento?: string;
    rendaMensal: number;
    email?: string;
    dataCadastro: string;
}

export interface ClientToCreate extends Omit<Client, 'id'> {
    nome: string;
    cpf: string;
    dataNascimento: string;
    rendaMensal: number;
    email: string;
    dataCadastro: string;
}



export interface ClientListResponse {
    data: Client[];
    totalCount: number;
}

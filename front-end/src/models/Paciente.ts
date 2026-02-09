import { Prioridade } from "../enums/Prioridade.js";

export class Paciente {
  public nome: string;
  public idade: number;
  public prioridade: Prioridade;
  public emAtendimento: boolean;

  constructor(nome: string, idade: number, prioridade: Prioridade) {
    this.nome = nome;
    this.idade = idade;
    this.prioridade = prioridade;
    this.emAtendimento = false;
  }

  iniciarAtendimento(): void {
    this.emAtendimento = true;
  }

  finalizarAtendimento(): void {
    this.emAtendimento = false;
  }
}

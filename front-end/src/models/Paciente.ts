import { Prioridade } from "../enums/Prioridade.js";

export class Paciente {
  public nome: string;
  public idade: number;
  public prioridade: Prioridade;
  public emAtendimento: boolean;
  public inicioAtendimento: Date | null = null;
  public fimAtendimento: Date | null = null;

  constructor(nome: string, idade: number, prioridade: Prioridade) {
    this.nome = nome;
    this.idade = idade;
    this.prioridade = prioridade;
    this.emAtendimento = false;
  }

  iniciarAtendimento(): void {
    this.emAtendimento = true;
    this.inicioAtendimento = new Date();
  }

  finalizarAtendimento(): void {
    this.emAtendimento = false;
    this.fimAtendimento = new Date();
  }

  get tempoAtendimento(): number | null {
   
    const inicio = this.inicioAtendimento;
    const fim = this.fimAtendimento;

    if (!inicio || !fim) return null;

    const diff = fim.getTime() - inicio.getTime();
    return Math.floor( diff / 1000);    
  }
}


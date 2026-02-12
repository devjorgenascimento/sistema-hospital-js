import { Prioridade } from "../enums/Prioridade.js";

export class Paciente {
  public nome: string;
  public dataNascimento: Date;
  public cpf: string;
  public endereco: string;
  public telefone: string;
  public cartao: string;
  public prioridade: Prioridade;

  public emAtendimento: boolean;
  public inicioAtendimento: Date | null = null;
  public fimAtendimento: Date | null = null;

  constructor(
    nome: string,
    dataNascimento: Date,
    cpf: string,
    endereco: string,
    telefone: string,
    cartao: string,
    prioridade: Prioridade
  ) {
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
    this.endereco = endereco;
    this.telefone = telefone;
    this.cartao = cartao;
    this.prioridade = prioridade;
    this.emAtendimento = false;
  }

  // 🧠 Idade calculada automaticamente
  get idade(): number {
    const hoje = new Date();
    let idade = hoje.getFullYear() - this.dataNascimento.getFullYear();
    const mes = hoje.getMonth() - this.dataNascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < this.dataNascimento.getDate())) {
      idade--;
    }

    return idade;
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
    if (!this.inicioAtendimento || !this.fimAtendimento) return null;
    return Math.floor((this.fimAtendimento.getTime() - this.inicioAtendimento.getTime()) / 1000);
  }

  get tempoFormatado(): string {
    const tempo = this.tempoAtendimento;
    if (tempo === null) return "--:--";

    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;

    return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
  }
}

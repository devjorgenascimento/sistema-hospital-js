import { Paciente } from "../models/Paciente.js";
import { Prioridade } from "../enums/Prioridade.js";

export class AtendimentoService {
  private fila: Paciente[] = [];
  private historico: Paciente[] = [];
  private pacienteAtual: Paciente | null = null;

  private pesoPrioridade: Record<Prioridade, number> = {
    [Prioridade.VERMELHO]: 1,
    [Prioridade.AMARELO]: 2,
    [Prioridade.VERDE]: 3,
  };

  adicionarPaciente(paciente: Paciente): void {
    this.fila.push(paciente);
    this.fila.sort(
      (a, b) =>
        this.pesoPrioridade[a.prioridade] -
        this.pesoPrioridade[b.prioridade]
    );
  }

  chamarProximo(): Paciente | null {
    if (this.pacienteAtual || this.fila.length === 0) return null;

    this.pacienteAtual = this.fila.shift()!;
    this.pacienteAtual.iniciarAtendimento();
    return this.pacienteAtual;
  }

  finalizarAtendimento(): Paciente | null {
    if (!this.pacienteAtual) return null;

    this.pacienteAtual.finalizarAtendimento();
    this.historico.push(this.pacienteAtual);

    const finalizado = this.pacienteAtual;
    this.pacienteAtual = null;

    return finalizado;
  }

  getFila(): Paciente[] {
    return this.fila;
  }

  getHistorico(): Paciente[] {
    return this.historico;
  }

  getPacienteAtual(): Paciente | null {
    return this.pacienteAtual;
  }
}

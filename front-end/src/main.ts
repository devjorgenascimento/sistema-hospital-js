import { Paciente } from "./models/Paciente.js";
import { Prioridade } from "./enums/Prioridade.js";
import { AtendimentoService } from "./services/AtendimentoService.js";

// ---------------- ESTADO ----------------
const historico: Paciente[] = [];
let pacienteEmAtendimento: Paciente | null = null;
const atendimento = new AtendimentoService();

const pesoPrioridade: Record<Prioridade, number> = {
  [Prioridade.VERMELHO]: 1,
  [Prioridade.AMARELO]: 2,
  [Prioridade.VERDE]: 3,
};

// ---------------- ELEMENTOS ----------------
const btn = document.getElementById("btnAdcionar");
const btnChamar = document.getElementById("btnChamar");
const btnFinalizar = document.getElementById("btnFinalizar");

// ---------------- EVENTOS ----------------
btn?.addEventListener("click", () => {
  const nomeInput = document.getElementById("nome") as HTMLInputElement;
  const idadeInput = document.getElementById("idade") as HTMLInputElement;
  const prioridadeSelect = document.getElementById("prioridade") as HTMLSelectElement;

  const nome = nomeInput.value.trim();
  const idade = Number(idadeInput.value);
  const prioridade = prioridadeSelect.value as Prioridade;

  if (!nome || !idade) return;

  const novoPaciente = new Paciente(nome, idade, prioridade);
  atendimento.adicionarPaciente(novoPaciente);

  renderizarFila();

  nomeInput.value = "";
  idadeInput.value = "";
});

btnChamar?.addEventListener("click", chamarProximo);
btnFinalizar?.addEventListener("click", finalizarAtendimento);

// ---------------- FUNÇÕES ----------------
function renderizarFila(): void {
  const lista = document.getElementById("lista-pacientes");
  if (!lista) return;

  lista.innerHTML = "";

  const fila = atendimento.getFila();

  fila
    .sort((a, b) => pesoPrioridade[a.prioridade] - pesoPrioridade[b.prioridade])
    .forEach((paciente) => {
      const li = document.createElement("li");
      li.textContent = `${paciente.nome} - ${paciente.prioridade}`;
      li.classList.add(paciente.prioridade);
      lista.appendChild(li);
    });
}

function chamarProximo(): void {
  if (pacienteEmAtendimento) return;

  pacienteEmAtendimento = atendimento.chamarProximo();
  if (!pacienteEmAtendimento) return;

  pacienteEmAtendimento.iniciarAtendimento();

  renderizarFila();
  renderizarAtendimento();
}

function renderizarAtendimento(): void {
  const area = document.getElementById("atendimento");
  if (!area) return;

  area.innerHTML = "";

  if (!pacienteEmAtendimento) {
    area.textContent = "Nenhum paciente em atendimento";
    return;
  }

  const p = document.createElement("p");
  p.textContent = `${pacienteEmAtendimento.nome} - ${pacienteEmAtendimento.prioridade}`;
  p.classList.add(pacienteEmAtendimento.prioridade);

  area.appendChild(p);
}

function finalizarAtendimento(): void {
  if (!pacienteEmAtendimento) return;

  pacienteEmAtendimento.finalizarAtendimento();
  historico.push(pacienteEmAtendimento);

  pacienteEmAtendimento = null;

  renderizarAtendimento();
  renderizarHistorico();
}

function renderizarHistorico(): void {
  const lista = document.getElementById("historico");
  if (!lista) return;

  lista.innerHTML = "";

  historico.forEach((paciente) => {
    const li = document.createElement("li");
    li.textContent = `${paciente.nome} - ${paciente.idade} anos - ${paciente.prioridade} - ${paciente.tempoFormatado}s`;
    li.classList.add(paciente.prioridade);
    lista.appendChild(li);
  });
}

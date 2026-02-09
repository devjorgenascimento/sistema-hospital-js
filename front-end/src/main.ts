import { Paciente } from "./models/Paciente.js";
import { Prioridade } from "./enums/Prioridade.js";

// ---------------- ESTADO ----------------
const fila: Paciente[] = [];
let pacienteEmAtendimento: Paciente | null = null;

const pesoPrioridade: Record<Prioridade, number> = {
  [Prioridade.VERMELHO]: 1,
  [Prioridade.AMARELO]: 2,
  [Prioridade.VERDE]: 3,
};

// ---------------- ELEMENTOS ----------------
const btn = document.getElementById("btnAdcionar");
const btnChamar = document.getElementById("btnChamar");

// ---------------- EVENTOS ----------------
btn?.addEventListener("click", () => {
  const nomeInput = document.getElementById("nome") as HTMLInputElement;
  const idadeInput = document.getElementById("idade") as HTMLInputElement;
  const prioridadeSelect = document.getElementById("prioridade") as HTMLSelectElement;

  const nome = nomeInput.value;
  const idade = Number(idadeInput.value);
  const prioridade = prioridadeSelect.value as Prioridade;

  if (!nome || !idade) return;

  adicionarPaciente(new Paciente(nome, idade, prioridade));

  nomeInput.value = "";
  idadeInput.value = "";
});

btnChamar?.addEventListener("click", chamarProximo);

// ---------------- FUNÇÕES ----------------
function adicionarPaciente(paciente: Paciente): void {
  fila.push(paciente);
  fila.sort((a, b) => pesoPrioridade[a.prioridade] - pesoPrioridade[b.prioridade]);
  renderizarFila();
}

function chamarProximo(): void {
  if (pacienteEmAtendimento || fila.length === 0) return;

  pacienteEmAtendimento = fila.shift()!;
  pacienteEmAtendimento.iniciarAtendimento();

  renderizarFila();
  renderizarAtendimento();
}

function renderizarFila(): void {
  const lista = document.getElementById("lista-pacientes");
  if (!lista) return;

  lista.innerHTML = "";

  fila.forEach((paciente) => {
    const li = document.createElement("li");
    li.textContent = `${paciente.nome} - ${paciente.prioridade}`;
    li.classList.add(paciente.prioridade);
    lista.appendChild(li);
  });
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

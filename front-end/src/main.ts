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
const btnChamar = document.getElementById("btnChamar");
const btnFinalizar = document.getElementById("btnFinalizar");
document.getElementById("irMedico")
  ?.addEventListener("click", () => mostrarTela("medico"));

document.getElementById("irMetricas")
  ?.addEventListener("click", () => mostrarTela("metricas"));


// ---------------- EVENTOS ----------------
const form = document.getElementById("formPaciente") as HTMLFormElement | null;

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = (document.getElementById("nome") as HTMLInputElement).value;
  const dataNascimento = (document.getElementById("dataNascimento") as HTMLInputElement).value;
  const cpf = (document.getElementById("cpf") as HTMLInputElement).value;
  const endereco = (document.getElementById("endereco") as HTMLInputElement).value;
  const telefone = (document.getElementById("telefone") as HTMLInputElement).value;
  const cartao = (document.getElementById("cartao") as HTMLInputElement).value;
  const prioridade = (document.getElementById("prioridade") as HTMLSelectElement).value as Prioridade;

  if (!nome || !cpf) return;

  const novoPaciente = new Paciente(
    nome,
    new Date(dataNascimento),
    cpf,
    endereco,
    telefone,
    cartao,
    prioridade
  );
  atendimento.adicionarPaciente(novoPaciente);

  renderizarFila();
  form.reset();
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

type Tela = "login" | "recepcao" | "medico" | "metricas";

function mostrarTela(tela: Tela): void {
  const telas = document.querySelectorAll<HTMLElement>(".tela");

  telas.forEach((t) => {
    t.classList.add("hidden");
  });
  
  const telaAtiva = document.getElementById(`tela-${tela}`);
  telaAtiva?.classList.remove("hidden")
};
    const btnLogin = document.getElementById("btnLogin");
    const mensagemErro = document.getElementById("mensagemErro");

    btnLogin?.addEventListener("click", () => {
      const usuario = (document.getElementById("usuario") as HTMLInputElement).value;
      const senha = (document.getElementById("senha") as HTMLInputElement).value;

      if (usuario === "admin" && senha === "123") {
          mensagemErro?.classList.add("hidden");
          mostrarTela("recepcao"); // <- agora entra no sistema
      } else {
        mensagemErro?.classList.remove("hidden");
      }
});

 document.addEventListener("DOMContentLoaded", () => {
  mostrarTela("login");
});

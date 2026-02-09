import { Paciente } from "./models/Paciente.js"
import { Prioridade } from "./enums/Prioridade.js"

const btn = document.getElementById("btnAdcionar");
const pesoPrioridade : Record<Prioridade, number> = {
    [Prioridade.VERMELHO]: 1,
    [Prioridade.AMARELO]: 2,
    [Prioridade.VERDE]: 3
};

const fila: Paciente[] = [];

const paciente1 = new Paciente("João" , 45, Prioridade.VERMELHO);

console.log(paciente1);

paciente1.iniciarAtendimento();
console.log("Em atendimento: ", paciente1.emAtendimento);

btn?.addEventListener("click", () => {
    const nomeInput = document.getElementById("nome") as HTMLInputElement;
    const idadeInput = document.getElementById("idade") as  HTMLInputElement;
    const prioridadeSelect = document.getElementById("prioridade") as HTMLInputElement;

    const nome = nomeInput.value;
    const idade = Number(idadeInput.value);
    const prioridade = prioridadeSelect.value as Prioridade;

    if(!nome || !idade) return;

    adcionarPaciente(new Paciente(nome, idade, prioridade ));

    nomeInput.value = "";
    idadeInput.value = "";
})

function adcionarPaciente(paciente: Paciente): void {
    fila.push(paciente);
    fila.sort((a,b) => {
        return pesoPrioridade[a.prioridade] - pesoPrioridade[b.prioridade]
    });

    renderizarFila()
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

//adcionarPaciente(new Paciente("João", 20, Prioridade.VERDE));
//adcionarPaciente(new Paciente("Maria", 30, Prioridade.AMARELO));
//adcionarPaciente(new Paciente("José", 60, Prioridade.VERMELHO));

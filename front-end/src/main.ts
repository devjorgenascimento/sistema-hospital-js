import { Paciente } from "./models/Paciente.js"
import { Prioridade } from "./enums/Prioridade.js"

const paciente1 = new Paciente("João" , 45, Prioridade.VERMELHO);

console.log(paciente1);

paciente1.iniciarAtendimento();
console.log("Em atendimento: ", paciente1.emAtendimento);

function renderizarPacientes(paciente: Paciente): void {
    const lista = document.getElementById("lista-pacientes")

    if (!lista) return

    const li = document.createElement("li")
    li.textContent = `${paciente.nome} - ${paciente.prioridade}`

    lista.appendChild(li)
}

renderizarPacientes(paciente1)
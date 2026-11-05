"use strict";

// A simulação ensina as condições do fluxo. Ela não chama o GitHub.
const eventSelect = document.querySelector("#evento");
const failureInput = document.querySelector("#falha");
const runButton = document.querySelector("#executar");
const result = document.querySelector("#resultado");
const log = document.querySelector("#log");
const stages = [...document.querySelectorAll("#etapas li")];
const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function setStage(index, state, message) {
  stages[index].dataset.state = state;
  stages[index].querySelector(".stage-status").textContent = message;
}

runButton.addEventListener("click", async () => {
  const event = eventSelect.value;
  const shouldFail = failureInput.checked;
  runButton.disabled = true;
  eventSelect.disabled = true;
  failureInput.disabled = true;
  runButton.textContent = "Simulando…";
  result.textContent = "Execução simulada em andamento.";
  log.textContent = event === "push" ? "Evento: push na main\n" : "Evento: pull request para main\n";
  stages.forEach((_, index) => setStage(index, "waiting", "Aguardando"));

  try {
    const messages = [
      "Checkout concluído: código disponível no runner.",
      "Ambiente preparado para as verificações do projeto.",
      "Validação aprovada: as verificações simuladas passaram.",
      "Deployment simulado concluído: nova versão publicada."
    ];

    for (let index = 0; index < stages.length; index += 1) {
      if (index === 3 && event === "pr") {
        setStage(index, "skipped", "Não executado");
        log.textContent += "CD não executado: pull requests fazem apenas CI neste laboratório.\n";
        result.textContent = "CI aprovada. O pull request foi verificado, sem publicação.";
        break;
      }
      setStage(index, "running", "Em execução…");
      await pause(450);
      if (index === 2 && shouldFail) {
        setStage(index, "failed", "Falhou");
        setStage(3, "skipped", "Bloqueado");
        log.textContent += "ERRO simulado: validação reprovada. Corrija o problema e execute novamente.\nCD bloqueado: a CI não foi concluída com sucesso.\n";
        result.textContent = "CI reprovada. Nenhuma nova versão foi publicada nesta simulação.";
        break;
      }
      setStage(index, "success", "Concluído");
      log.textContent += messages[index] + "\n";
      if (index === 3) result.textContent = "CI e CD concluídos na simulação. A alteração chegou à publicação.";
    }
  } finally {
    runButton.disabled = false;
    eventSelect.disabled = false;
    failureInput.disabled = false;
    runButton.textContent = "Simular novamente →";
  }
});

document.querySelector("#quiz-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const answer = new FormData(event.currentTarget).get("resposta");
  document.querySelector("#quiz-feedback").textContent = answer === "aguardar"
    ? "Correto! Neste laboratório, o CD ocorre após push na main e somente se a CI passar."
    : "Tente novamente: pull requests para a main precisam de CI, mas o CD fica reservado ao push na main com CI aprovada.";
});

// O armazenamento local é opcional: o guia funciona mesmo se o navegador o bloquear.
const storageKey = "percurso-cicd-v1";
const checklist = [...document.querySelectorAll("#checklist input")];
const notes = document.querySelector("#anotacoes");
const storageStatus = document.querySelector("#storage-status");

function updateProgress() {
  const total = checklist.filter((input) => input.checked).length;
  document.querySelector("#progresso").textContent = `${total} de ${checklist.length} itens conferidos`;
  document.querySelector("#barra-progresso").value = total;
  document.querySelector("#barra-progresso").textContent = `${total} de ${checklist.length}`;
}

function saveProgress() {
  updateProgress();
  try {
    localStorage.setItem(storageKey, JSON.stringify({
      completed: checklist.filter((input) => input.checked).map((input) => input.dataset.item),
      notes: notes.value
    }));
  } catch {
    storageStatus.textContent = "O navegador não permitiu salvar o progresso. Baixe suas anotações para guardar uma cópia.";
  }
}

try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (saved && typeof saved === "object") {
    if (Array.isArray(saved.completed)) {
      checklist.forEach((input) => { input.checked = saved.completed.includes(input.dataset.item); });
    }
    if (typeof saved.notes === "string") notes.value = saved.notes;
  }
} catch {
  storageStatus.textContent = "Não foi possível recuperar o progresso salvo. Você pode preencher o roteiro e baixar suas anotações.";
}
updateProgress();
checklist.forEach((input) => input.addEventListener("change", saveProgress));
notes.addEventListener("input", saveProgress);

document.querySelector("#baixar").addEventListener("click", () => {
  const blob = new Blob([notes.value], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "registro-interacao-cicd.md";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

const erroDeTeste = ;
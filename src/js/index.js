const api = "http://localhost:3000";

/* =========================
CARREGAR SERVIÇOS
========================= */

async function carregarServicos() {

  try {

    const response = await fetch(`${api}/servicos`);
    const servicos = await response.json();

    const select = document.getElementById("servico");

    select.innerHTML = "";

    servicos.forEach(servico => {

      const option = document.createElement("option");

      option.value = servico.nome_servico;
      option.textContent = servico.nome_servico;

      select.appendChild(option);

    });

  } catch (erro) {

    console.error("Erro ao carregar serviços:", erro);

  }

}


/* =========================
ENVIAR AGENDAMENTO
========================= */

document
.getElementById("formAgendamento")
.addEventListener("submit", async function (e) {

  e.preventDefault();

  const dados = {

    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    veiculo: document.getElementById("veiculo").value,
    servico: document.getElementById("servico").value,
    data: document.getElementById("data").value,
    horario: document.getElementById("horario").value

  };

  try {

    const response = await fetch(`${api}/agendar`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)

    });

    const mensagem = await response.text();

    alert(mensagem);

    document.getElementById("formAgendamento").reset();

    listarAgendamentos();

  } catch (erro) {

    console.error("Erro ao enviar agendamento:", erro);

  }

});


/* =========================
LISTAR AGENDAMENTOS
========================= */

async function listarAgendamentos() {

  try {

    const response = await fetch(`${api}/agendamentos`);
    const agendamentos = await response.json();

    const lista = document.getElementById("listaAgendamentos");

    lista.innerHTML = "";

    agendamentos.forEach(a => {

      const item = document.createElement("li");

      item.textContent =
        `${a.nome} | ${a.servico} | ${a.data} | ${a.horario}`;

      lista.appendChild(item);

    });

  } catch (erro) {

    console.error("Erro ao carregar agendamentos:", erro);

  }

}


/* =========================
INICIAR SISTEMA
========================= */

carregarServicos();
listarAgendamentos();
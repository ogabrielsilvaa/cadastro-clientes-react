"use client";

import { ClienteForm } from "@/types/clientForm";
import { ChangeEvent, FormEvent, useState } from "react";

type ClienteErros = Partial<Record<keyof ClienteForm, string>>;

const estadoInicial: ClienteForm = {
  nome: "",
  email: "",
  senha: "",
  telefone: "",
  dataNascimento: "",
  cpf: "",
};

export default function FormularioCliente() {
  const [form, setForm] = useState<ClienteForm>(estadoInicial);
  const [erros, setErros] = useState<ClienteErros>({});
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  function atualizarCampo(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  function validarFormulario() {
    const novosErros: ClienteErros = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cpfSomenteNumeros = form.cpf.replace(/\D/g, "");
    const senhaTemMaiuscula = /[A-Z]/.test(form.senha);
    const senhaTemMinuscula = /[a-z]/.test(form.senha);
    const senhaTemNumero = /\d/.test(form.senha);
    const senhaTemEspecial = /[^A-Za-z0-9]/.test(form.senha);
    const senhaTamanhoValido = form.senha.length >= 8 && form.senha.length <= 16;

    if (!form.nome.trim()) {
      novosErros.nome = "Informe o nome do cliente.";
    }

    if (!form.email.trim()) {
      novosErros.email = "Informe o e-mail do cliente.";
    } else if (!emailRegex.test(form.email)) {
      novosErros.email = "Informe um e-mail válido.";
    }

    if (!form.senha) {
      novosErros.senha = "Informe uma senha.";
    } else if (!senhaTemMaiuscula || !senhaTemMinuscula) {
      novosErros.senha = "A senha deve ter ao menos uma letra maiúscula e uma minúscula.";
    } else if (!senhaTamanhoValido) {
      novosErros.senha = "A senha deve ter entre 8 e 16 caracteres.";
    } else if (!senhaTemNumero) {
      novosErros.senha = "A senha deve ter ao menos um número.";
    } else if (!senhaTemEspecial) {
      novosErros.senha = "A senha deve ter ao menos um caractere especial.";
    }

    if (!form.telefone.trim()) {
      novosErros.telefone = "Informe o telefone.";
    }

    if (!form.dataNascimento) {
      novosErros.dataNascimento = "Informe a data de nascimento.";
    }

    if (!form.cpf.trim()) {
      novosErros.cpf = "Informe o CPF.";
    } else if (cpfSomenteNumeros.length !== 11) {
      novosErros.cpf = "O CPF deve conter 11 números.";
    }

    return novosErros;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errosValidacao = validarFormulario();
    setErros(errosValidacao);

    if (Object.keys(errosValidacao).length === 0) {
      setMensagemSucesso("Cliente cadastrado com sucesso!");
      console.log("Dados do cliente: ", form);
    }
  }

  function limparFormulario() {
    setForm(estadoInicial);
    setErros({});
    setMensagemSucesso("");
  }

  return (
  <form
    onSubmit={handleSubmit}
    className="rounded-2xl bg-white p-6 shadow-lg"
  >
    <div>
      <label className="mb-1 block font-medium text-slate-700">
        Nome
      </label>
      <input
        type="text"
        name="nome"
        value={form.nome}
        onChange={atualizarCampo}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
      />
      {erros.nome && <p className="mt-1 text-sm text-red-600">{erros.nome}</p>}
    </div>

    <div>
      <label className="mb-1 block font-medium text-slate-700">
        Email
      </label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={atualizarCampo}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
        placeholder="cliente@gmail.com"
      />
      {erros.email && <p className="mt-1 text-sm text-red-600">{erros.email}</p>}
    </div>

    <div>
      <label className="mb-1 block font-medium text-slate-700">
        Senha
      </label>
      <input
        type="password"
        name="senha"
        value={form.senha}
        onChange={atualizarCampo}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
        placeholder="Digite uma senha segura"
      />
      {erros.senha && <p className="mt-1 text-sm text-red-600">{erros.senha}</p>}
      <p className="mt-1 text-xs text-slate-500">
        Use 8 a 16 caracteres, letras maiúsculas e minúsculas,
        número e caractere especial.
      </p>
    </div>

    <div>
      <label className="mb-1 block font-medium text-slate-700">
        Telefone
      </label>
      <input
        type="tel"
        name="telefone"
        value={form.telefone}
        onChange={atualizarCampo}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
        placeholder="(21) 99999-9999"
      />
       {erros.telefone && <p className="mt-1 text-sm text-red-600">{erros.telefone}</p>}
    </div>

    <div>
      <label className="mb-1 block font-medium text-slate-700">
        Data de Nascimento
      </label>
      <input
        type="date"
        name="dataNascimento"
        value={form.dataNascimento}
        onChange={atualizarCampo}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
      />
        {erros.dataNascimento && (<p className="mt-1 text-sm text-red-600">{erros.dataNascimento}</p>)}
    </div>

    <div>
      <label className="mb-1 block font-medium text-slate-700">
        CPF
      </label>
      <input
        type="text"
        name="cpf"
        value={form.cpf}
        onChange={atualizarCampo}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
        placeholder="Somente números ou com pontuação"
      />
        {erros.cpf && <p className="mt-1 text-sm text-red-600">{erros.cpf}</p>}
    </div>

    {mensagemSucesso && (
      <div className="mt-5 rounded-lg border border-green-300 bg-green-50 p-3 text-green-700">
        {mensagemSucesso}
      </div>
    )}

    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={limparFormulario}
        className="rounded-lg border border-slate-300 px-5 py-2 font-medium text-slate-700 hover:bg-slate-100"
      >
        Limpar
      </button>

      <button
        type="submit"
        className="rounded-lg bg-blue-700 px-5 py-2 font-medium text-white hover:bg-blue-800"
      >
        Cadastrar
      </button>
    </div>
  </form>
)
}

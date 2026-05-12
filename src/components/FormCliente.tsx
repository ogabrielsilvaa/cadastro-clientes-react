"use client";

import { useCadastrarCliente } from "@/hooks/useCadastrarCliente";
import { ClienteForm } from "@/types/clientForm";
import {
  validarCPF,
  validarDataNascimento,
  validarEmail,
  validarNome,
  validarSenha,
  validarTelefone,
} from "@/utils/validacoes";
import { ChangeEvent, FormEvent, useState } from "react";
import { isAxiosError } from "axios";

type ClienteErros = Partial<Record<keyof ClienteForm, string>>;

const estadoInicial: ClienteForm = {
  nome: "",
  email: "",
  senha: "",
  telefone: "",
  dataNascimento: "",
  cpf: "",
};

export default function FormCliente() {
  const [form, setForm] = useState<ClienteForm>(estadoInicial);
  const [erros, setErros] = useState<ClienteErros>({});

  const { mutate, isPending, isSuccess, isError, error, reset } = useCadastrarCliente();

  function atualizarCampo(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((dadosAtuais) => ({ ...dadosAtuais, [name]: value }));
  }

  function handleTelefone(event: ChangeEvent<HTMLInputElement>) {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 11);
    let formatted = digits;
    if (digits.length > 7) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    } else if (digits.length > 2) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length > 0) {
      formatted = `(${digits}`;
    }
    setForm((dadosAtuais) => ({ ...dadosAtuais, telefone: formatted }));
  }

  function validarFormulario() {
    const novosErros: ClienteErros = {};

    const erroNome = validarNome(form.nome);
    if (erroNome) novosErros.nome = erroNome;

    const erroEmail = validarEmail(form.email);
    if (erroEmail) novosErros.email = erroEmail;

    const erroSenha = validarSenha(form.senha);
    if (erroSenha) novosErros.senha = erroSenha;

    const erroTelefone = validarTelefone(form.telefone);
    if (erroTelefone) novosErros.telefone = erroTelefone;

    const erroData = validarDataNascimento(form.dataNascimento);
    if (erroData) novosErros.dataNascimento = erroData;

    const erroCpf = validarCPF(form.cpf);
    if (erroCpf) novosErros.cpf = erroCpf;

    return novosErros;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    reset();

    const errosValidacao = validarFormulario();
    setErros(errosValidacao);

    if (Object.keys(errosValidacao).length > 0) return;

    mutate({
      full_name: form.nome,
      email: form.email,
      password_hash: form.senha,
      phone: form.telefone,
    });
  }

  function limparFormulario() {
    setForm(estadoInicial);
    setErros({});
    reset();
  }

  function getMensagemErroApi() {
    if (!isError || !error) return null;
    if (isAxiosError(error)) {
      return error.response?.data?.message ?? "Erro ao cadastrar cliente. Tente novamente.";
    }
    return "Erro ao cadastrar cliente. Tente novamente.";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-lg"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1 block font-medium text-slate-700">Nome</label>
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
          <label className="mb-1 block font-medium text-slate-700">Email</label>
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
          <label className="mb-1 block font-medium text-slate-700">Senha</label>
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
            Use 8 a 16 caracteres, letras maiúsculas e minúsculas, número e caractere especial.
          </p>
        </div>

        <div>
          <label className="mb-1 block font-medium text-slate-700">Telefone</label>
          <input
            type="tel"
            name="telefone"
            value={form.telefone}
            onChange={handleTelefone}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
            placeholder="(21) 99999-9999"
            maxLength={15}
          />
          {erros.telefone && <p className="mt-1 text-sm text-red-600">{erros.telefone}</p>}
        </div>

        <div>
          <label className="mb-1 block font-medium text-slate-700">Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            value={form.dataNascimento}
            onChange={atualizarCampo}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
          />
          {erros.dataNascimento && <p className="mt-1 text-sm text-red-600">{erros.dataNascimento}</p>}
        </div>

        <div>
          <label className="mb-1 block font-medium text-slate-700">CPF</label>
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
      </div>

      {isSuccess && (
        <div className="mt-5 rounded-lg border border-green-300 bg-green-50 p-3 text-green-700">
          Cliente cadastrado com sucesso!
        </div>
      )}

      {isError && (
        <div className="mt-5 rounded-lg border border-red-300 bg-red-50 p-3 text-red-700">
          {getMensagemErroApi()}
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
          disabled={isPending}
          className="rounded-lg bg-blue-700 px-5 py-2 font-medium text-white hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? "Cadastrando..." : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}

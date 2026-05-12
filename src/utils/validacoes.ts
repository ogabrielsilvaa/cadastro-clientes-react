export function validarNome(nome: string): string | null {
  if (!nome.trim()) return "Informe o nome do cliente.";
  const palavras = nome.trim().split(/\s+/).filter(Boolean);
  if (palavras.length < 2) return "Informe o nome completo (mínimo de duas palavras).";
  return null;
}

export function validarEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return "Informe o e-mail do cliente.";
  if (!emailRegex.test(email)) return "Informe um e-mail válido.";
  return null;
}

export function validarSenha(senha: string): string | null {
  if (!senha) return "Informe uma senha.";
  if (!/[A-Z]/.test(senha) || !/[a-z]/.test(senha))
    return "A senha deve ter ao menos uma letra maiúscula e uma minúscula.";
  if (senha.length < 8 || senha.length > 16)
    return "A senha deve ter entre 8 e 16 caracteres.";
  if (!/\d/.test(senha)) return "A senha deve ter ao menos um número.";
  if (!/[^A-Za-z0-9]/.test(senha))
    return "A senha deve ter ao menos um caractere especial.";
  return null;
}

export function validarTelefone(telefone: string): string | null {
  const digits = telefone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11)
    return "Informe um telefone válido.";
  return null;
}

export function validarDataNascimento(dataNascimento: string): string | null {
  if (!dataNascimento) return "Informe a data de nascimento.";
  const dataNasc = new Date(dataNascimento);
  if (isNaN(dataNasc.getTime())) return "Data de nascimento inválida.";
  const threshold = new Date();
  threshold.setFullYear(threshold.getFullYear() - 18);
  if (dataNasc > threshold)
    return "O cadastro só é permitido para maiores de 18 anos.";
  return null;
}

export function validarCPF(cpf: string): string | null {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return "O CPF deve conter 11 dígitos.";
  if (digits.split("").every((d) => d === digits[0])) return "CPF inválido.";

  const calcDigito = (base: string, pesoInicial: number): number => {
    const soma = base
      .split("")
      .reduce((acc, d, i) => acc + Number(d) * (pesoInicial - i), 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  if (calcDigito(digits.slice(0, 9), 10) !== Number(digits[9]))
    return "CPF inválido.";
  if (calcDigito(digits.slice(0, 10), 11) !== Number(digits[10]))
    return "CPF inválido.";

  return null;
}

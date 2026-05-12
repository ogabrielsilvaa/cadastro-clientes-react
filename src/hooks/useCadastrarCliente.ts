import { useMutation } from "@tanstack/react-query";
import api from "@/services/api";

export type CadastrarClientePayload = {
  full_name: string;
  email: string;
  password_hash: string;
  phone: string;
};

async function cadastrarCliente(payload: CadastrarClientePayload) {
  const { data } = await api.post("/users", payload);
  return data;
}

export function useCadastrarCliente() {
  return useMutation({ mutationFn: cadastrarCliente });
}

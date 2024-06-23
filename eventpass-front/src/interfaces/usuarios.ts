export interface Usuario {
  id: number
  tipo: number
  nomeUsuario: string
  email: string
  senha: string
  confirmarSenha: string
  cpf: string
  tokenRedefinicaoSenha: string
}

export interface UpdateUsuario {
  nome: string,
  email: string,
  senha: string,
  confirmarSenha: string
}

export interface LoginUsuario {
  username: string,
  password: string
}
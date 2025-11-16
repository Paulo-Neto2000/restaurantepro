"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, User, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro("")
    setCarregando(true)

    // Simulação de autenticação (substituir por integração real com Supabase)
    setTimeout(() => {
      if (email === "admin@restaurante.com" && senha === "admin123") {
        localStorage.setItem("authenticated", "true")
        localStorage.setItem("user", JSON.stringify({ email, nome: "Administrador" }))
        router.push("/")
      } else {
        setErro("Email ou senha incorretos")
        setCarregando(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Título */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#00FF00] to-[#009900] flex items-center justify-center">
            <Lock className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">RestaurantePro</h1>
          <p className="text-gray-400">Sistema de Gestão Premium</p>
        </div>

        {/* Card de Login */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Entrar</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-500 focus:border-[#00FF00] focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-500 focus:border-[#00FF00] focus:outline-none transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {mostrarSenha ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Erro */}
            {erro && (
              <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50">
                <p className="text-sm text-red-500">{erro}</p>
              </div>
            )}

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={carregando}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00FF00] to-[#009900] text-black font-bold hover:from-[#00FF00] hover:to-[#00FF00] transition-all duration-300 shadow-lg shadow-[#00FF00]/20 hover:shadow-[#00FF00]/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Links Adicionais */}
          <div className="mt-6 text-center">
            <button className="text-sm text-gray-400 hover:text-[#00FF00] transition-colors">
              Esqueceu sua senha?
            </button>
          </div>
        </div>

        {/* Credenciais de Teste */}
        <div className="mt-6 p-4 rounded-lg bg-[#1A1A1A]/50 border border-[#2A2A2A]">
          <p className="text-xs text-gray-500 text-center mb-2">Credenciais de teste:</p>
          <p className="text-xs text-gray-400 text-center">
            Email: <span className="text-[#00FF00]">admin@restaurante.com</span>
          </p>
          <p className="text-xs text-gray-400 text-center">
            Senha: <span className="text-[#00FF00]">admin123</span>
          </p>
        </div>
      </div>
    </div>
  )
}

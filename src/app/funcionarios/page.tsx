"use client"

import { Users, UserPlus, Clock, Award, TrendingUp, Calendar, Edit, Trash2, Eye } from "lucide-react"
import { useState } from "react"

type Funcionario = {
  id: string
  nome: string
  cargo: string
  foto: string
  status: "ativo" | "folga" | "ferias"
  horasTrabalhadas: number
  desempenho: number
  salario: string
  dataAdmissao: string
  telefone: string
  email: string
}

export default function FuncionariosPage() {
  const [filtroStatus, setFiltroStatus] = useState<"todos" | "ativo" | "folga" | "ferias">("todos")

  const funcionarios: Funcionario[] = [
    {
      id: "1",
      nome: "Carlos Silva",
      cargo: "Gerente",
      foto: "CS",
      status: "ativo",
      horasTrabalhadas: 168,
      desempenho: 95,
      salario: "R$ 4.500,00",
      dataAdmissao: "15/01/2022",
      telefone: "(11) 98765-4321",
      email: "carlos@restaurante.com"
    },
    {
      id: "2",
      nome: "Ana Paula",
      cargo: "Chefe de Cozinha",
      foto: "AP",
      status: "ativo",
      horasTrabalhadas: 160,
      desempenho: 92,
      salario: "R$ 3.800,00",
      dataAdmissao: "20/03/2022",
      telefone: "(11) 98765-4322",
      email: "ana@restaurante.com"
    },
    {
      id: "3",
      nome: "João Santos",
      cargo: "Garçom",
      foto: "JS",
      status: "ativo",
      horasTrabalhadas: 152,
      desempenho: 88,
      salario: "R$ 2.200,00",
      dataAdmissao: "10/05/2023",
      telefone: "(11) 98765-4323",
      email: "joao@restaurante.com"
    },
    {
      id: "4",
      nome: "Maria Oliveira",
      cargo: "Garçonete",
      foto: "MO",
      status: "folga",
      horasTrabalhadas: 144,
      desempenho: 90,
      salario: "R$ 2.200,00",
      dataAdmissao: "05/06/2023",
      telefone: "(11) 98765-4324",
      email: "maria@restaurante.com"
    },
    {
      id: "5",
      nome: "Pedro Costa",
      cargo: "Auxiliar de Cozinha",
      foto: "PC",
      status: "ativo",
      horasTrabalhadas: 156,
      desempenho: 85,
      salario: "R$ 1.800,00",
      dataAdmissao: "12/08/2023",
      telefone: "(11) 98765-4325",
      email: "pedro@restaurante.com"
    },
    {
      id: "6",
      nome: "Juliana Lima",
      cargo: "Caixa",
      foto: "JL",
      status: "ferias",
      horasTrabalhadas: 0,
      desempenho: 93,
      salario: "R$ 2.500,00",
      dataAdmissao: "18/02/2023",
      telefone: "(11) 98765-4326",
      email: "juliana@restaurante.com"
    },
  ]

  const funcionariosFiltrados = filtroStatus === "todos" 
    ? funcionarios 
    : funcionarios.filter(f => f.status === filtroStatus)

  const totalFuncionarios = funcionarios.length
  const funcionariosAtivos = funcionarios.filter(f => f.status === "ativo").length
  const mediaTrabalhadas = Math.round(funcionarios.reduce((acc, f) => acc + f.horasTrabalhadas, 0) / funcionarios.length)
  const mediaDesempenho = Math.round(funcionarios.reduce((acc, f) => acc + f.desempenho, 0) / funcionarios.length)

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestão de Funcionários</h1>
          <p className="text-gray-400">Controle de escalas, permissões e desempenho</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00FF00] to-[#009900] text-black font-bold rounded-lg hover:from-[#00FF00] hover:to-[#00FF00] transition-all duration-300 shadow-lg shadow-[#00FF00]/20 hover:shadow-[#00FF00]/40">
          <UserPlus className="w-5 h-5" />
          Adicionar Funcionário
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6 hover:border-[#00FF00]/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#00FF00]/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-[#00FF00]" />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total de Funcionários</p>
          <p className="text-3xl font-bold text-white">{totalFuncionarios}</p>
        </div>

        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6 hover:border-[#00FF00]/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#00FF00]/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#00FF00]" />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Funcionários Ativos</p>
          <p className="text-3xl font-bold text-white">{funcionariosAtivos}</p>
        </div>

        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6 hover:border-[#00FF00]/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#00FF00]/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#00FF00]" />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Média de Horas/Mês</p>
          <p className="text-3xl font-bold text-white">{mediaTrabalhadas}h</p>
        </div>

        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6 hover:border-[#00FF00]/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#00FF00]/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-[#00FF00]" />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Desempenho Médio</p>
          <p className="text-3xl font-bold text-white">{mediaDesempenho}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "Todos", value: "todos" },
          { label: "Ativos", value: "ativo" },
          { label: "Em Folga", value: "folga" },
          { label: "Férias", value: "ferias" },
        ].map((filtro) => (
          <button
            key={filtro.value}
            onClick={() => setFiltroStatus(filtro.value as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              filtroStatus === filtro.value
                ? "bg-gradient-to-r from-[#00FF00] to-[#009900] text-black"
                : "bg-[#1A1A1A] text-gray-400 hover:bg-[#2A2A2A] hover:text-white border border-[#2A2A2A]"
            }`}
          >
            {filtro.label}
          </button>
        ))}
      </div>

      {/* Funcionários Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {funcionariosFiltrados.map((funcionario) => (
          <div
            key={funcionario.id}
            className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6 hover:border-[#00FF00]/30 transition-all duration-300 group"
          >
            {/* Header do Card */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00FF00] to-[#009900] flex items-center justify-center">
                  <span className="text-black font-bold text-lg">{funcionario.foto}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{funcionario.nome}</h3>
                  <p className="text-sm text-gray-400">{funcionario.cargo}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  funcionario.status === "ativo"
                    ? "bg-[#00FF00]/20 text-[#00FF00] border border-[#00FF00]/50"
                    : funcionario.status === "folga"
                    ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/50"
                    : "bg-blue-500/20 text-blue-500 border border-blue-500/50"
                }`}
              >
                {funcionario.status === "ativo" ? "Ativo" : funcionario.status === "folga" ? "Folga" : "Férias"}
              </span>
            </div>

            {/* Informações */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Salário:</span>
                <span className="text-white font-medium">{funcionario.salario}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Admissão:</span>
                <span className="text-white font-medium">{funcionario.dataAdmissao}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Horas/Mês:</span>
                <span className="text-white font-medium">{funcionario.horasTrabalhadas}h</span>
              </div>
            </div>

            {/* Desempenho */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">Desempenho</span>
                <span className="text-[#00FF00] font-bold">{funcionario.desempenho}%</span>
              </div>
              <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00FF00] to-[#009900] transition-all duration-500"
                  style={{ width: `${funcionario.desempenho}%` }}
                />
              </div>
            </div>

            {/* Ações */}
            <div className="flex items-center gap-2 pt-4 border-t border-[#1A1A1A]">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#1A1A1A] text-gray-400 rounded-lg hover:bg-[#2A2A2A] hover:text-white transition-all duration-300">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Ver</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#1A1A1A] text-gray-400 rounded-lg hover:bg-[#2A2A2A] hover:text-[#00FF00] transition-all duration-300">
                <Edit className="w-4 h-4" />
                <span className="text-sm font-medium">Editar</span>
              </button>
              <button className="flex items-center justify-center px-3 py-2 bg-[#1A1A1A] text-gray-400 rounded-lg hover:bg-red-500/20 hover:text-red-500 transition-all duration-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Escala Semanal */}
      <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[#00FF00]" />
            <h2 className="text-xl font-bold text-white">Escala Semanal</h2>
          </div>
          <button className="text-sm text-[#00FF00] hover:text-[#00FF00]/80 transition-colors">
            Editar Escala
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1A1A1A]">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Funcionário</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Seg</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Ter</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Qua</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Qui</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Sex</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Sáb</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Dom</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.slice(0, 4).map((funcionario) => (
                <tr key={funcionario.id} className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A]/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF00] to-[#009900] flex items-center justify-center">
                        <span className="text-black font-bold text-xs">{funcionario.foto}</span>
                      </div>
                      <span className="text-sm text-white font-medium">{funcionario.nome}</span>
                    </div>
                  </td>
                  {["08-16", "08-16", "OFF", "08-16", "08-16", "12-20", "OFF"].map((turno, idx) => (
                    <td key={idx} className="text-center py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          turno === "OFF"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-[#00FF00]/20 text-[#00FF00]"
                        }`}
                      >
                        {turno}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

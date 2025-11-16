"use client"

import { StatCard } from "@/components/custom/stat-card"
import { DollarSign, TrendingUp, ShoppingBag, Users, Calendar, Download, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useState } from "react"

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState("mensal")
  const [tipoRelatorio, setTipoRelatorio] = useState("vendas")

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Relatórios</h1>
          <p className="text-gray-400">Análises detalhadas de vendas, estoque e desempenho</p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00FF00] to-[#009900] text-black font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-[#00FF00]/20">
          <Download className="w-5 h-5" />
          Exportar Relatório
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-2">Tipo de Relatório</label>
          <select
            value={tipoRelatorio}
            onChange={(e) => setTipoRelatorio(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-white focus:border-[#00FF00] focus:outline-none transition-all duration-300"
          >
            <option value="vendas">Vendas</option>
            <option value="estoque">Estoque</option>
            <option value="financeiro">Financeiro</option>
            <option value="funcionarios">Funcionários</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-2">Período</label>
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-white focus:border-[#00FF00] focus:outline-none transition-all duration-300"
          >
            <option value="diario">Diário</option>
            <option value="semanal">Semanal</option>
            <option value="mensal">Mensal</option>
            <option value="anual">Anual</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-2">Data Específica</label>
          <input
            type="date"
            className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-white focus:border-[#00FF00] focus:outline-none transition-all duration-300"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Faturamento Total"
          value="R$ 145.890"
          change="+18.2%"
          changeType="positive"
          icon={<DollarSign className="w-6 h-6 text-[#00FF00]" />}
        />
        <StatCard
          title="Pedidos Realizados"
          value="1.248"
          change="+12.5%"
          changeType="positive"
          icon={<ShoppingBag className="w-6 h-6 text-[#00FF00]" />}
        />
        <StatCard
          title="Ticket Médio"
          value="R$ 116,90"
          change="+5.8%"
          changeType="positive"
          icon={<TrendingUp className="w-6 h-6 text-[#00FF00]" />}
        />
        <StatCard
          title="Clientes Atendidos"
          value="3.542"
          change="+8.3%"
          changeType="positive"
          icon={<Users className="w-6 h-6 text-[#00FF00]" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Vendas */}
        <div className="lg:col-span-2 bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Evolução de Vendas</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Período: {periodo}</span>
            </div>
          </div>

          <div className="h-80 flex items-end justify-between gap-3">
            {[
              { label: "Jan", vendas: 85, meta: 90 },
              { label: "Fev", vendas: 92, meta: 90 },
              { label: "Mar", vendas: 78, meta: 90 },
              { label: "Abr", vendas: 95, meta: 90 },
              { label: "Mai", vendas: 88, meta: 90 },
              { label: "Jun", vendas: 100, meta: 90 },
              { label: "Jul", vendas: 96, meta: 90 },
              { label: "Ago", vendas: 89, meta: 90 },
              { label: "Set", vendas: 94, meta: 90 },
              { label: "Out", vendas: 98, meta: 90 },
              { label: "Nov", vendas: 92, meta: 90 },
              { label: "Dez", vendas: 105, meta: 90 },
            ].map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative group">
                  <div
                    className="w-full bg-gradient-to-t from-[#00FF00] to-[#009900] rounded-t-lg transition-all duration-500 hover:from-[#00FF00] hover:to-[#00FF00] cursor-pointer"
                    style={{ height: `${data.vendas * 2.5}px` }}
                  >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1A1A1A] px-3 py-2 rounded-lg text-xs text-white whitespace-nowrap border border-[#2A2A2A]">
                      <p className="font-bold">R$ {(data.vendas * 1000).toFixed(0)}</p>
                      <p className="text-gray-400">Meta: R$ {(data.meta * 1000).toFixed(0)}</p>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{data.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-[#1A1A1A] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#00FF00] to-[#009900]"></div>
                <span className="text-sm text-gray-400">Vendas Realizadas</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">R$ 1.245.890</p>
              <p className="text-sm text-gray-400">Total no período</p>
            </div>
          </div>
        </div>

        {/* Top Produtos */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Produtos Mais Vendidos</h2>
          
          <div className="space-y-4">
            {[
              { nome: "Pizza Margherita", vendas: 342, receita: "R$ 17.100", crescimento: 12 },
              { nome: "Hambúrguer Artesanal", vendas: 298, receita: "R$ 14.900", crescimento: 8 },
              { nome: "Risoto de Camarão", vendas: 256, receita: "R$ 19.200", crescimento: 15 },
              { nome: "Filé Mignon", vendas: 234, receita: "R$ 23.400", crescimento: -3 },
              { nome: "Salmão Grelhado", vendas: 198, receita: "R$ 15.840", crescimento: 5 },
            ].map((produto, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#00FF00]/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-white mb-1">{produto.nome}</p>
                    <p className="text-sm text-gray-400">{produto.vendas} unidades</p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                    produto.crescimento > 0 
                      ? "bg-[#00FF00]/20 text-[#00FF00]" 
                      : "bg-red-500/20 text-red-500"
                  }`}>
                    {produto.crescimento > 0 ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(produto.crescimento)}%
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-white">{produto.receita}</span>
                  <div className="w-24 h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00FF00] to-[#009900] rounded-full"
                      style={{ width: `${(produto.vendas / 342) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Análise Detalhada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Horários de Pico */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Horários de Pico</h2>
          
          <div className="space-y-4">
            {[
              { horario: "12:00 - 14:00", pedidos: 145, ocupacao: 95 },
              { horario: "19:00 - 21:00", pedidos: 198, ocupacao: 100 },
              { horario: "14:00 - 16:00", pedidos: 67, ocupacao: 45 },
              { horario: "21:00 - 23:00", pedidos: 89, ocupacao: 60 },
            ].map((horario, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{horario.horario}</span>
                  <span className="text-sm text-gray-400">{horario.pedidos} pedidos</span>
                </div>
                <div className="relative h-3 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00FF00] to-[#009900] rounded-full transition-all duration-500"
                    style={{ width: `${horario.ocupacao}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Ocupação</span>
                  <span className="text-xs font-medium text-[#00FF00]">{horario.ocupacao}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Métodos de Pagamento */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Métodos de Pagamento</h2>
          
          <div className="space-y-4">
            {[
              { metodo: "Cartão de Crédito", valor: "R$ 89.450", percentual: 61, cor: "from-[#00FF00] to-[#009900]" },
              { metodo: "Cartão de Débito", valor: "R$ 32.890", percentual: 23, cor: "from-blue-500 to-blue-600" },
              { metodo: "PIX", valor: "R$ 18.650", percentual: 13, cor: "from-purple-500 to-purple-600" },
              { metodo: "Dinheiro", valor: "R$ 4.900", percentual: 3, cor: "from-yellow-500 to-yellow-600" },
            ].map((pagamento, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{pagamento.metodo}</span>
                  <span className="text-sm font-bold text-white">{pagamento.valor}</span>
                </div>
                <div className="relative h-3 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${pagamento.cor} rounded-full transition-all duration-500`}
                    style={{ width: `${pagamento.percentual}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Participação</span>
                  <span className="text-xs font-medium text-gray-400">{pagamento.percentual}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-[#1A1A1A]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Total Processado</span>
              <span className="text-2xl font-bold text-white">R$ 145.890</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resumo Financeiro */}
      <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Resumo Financeiro</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A]">
              <span className="text-sm text-gray-400">Receita Bruta</span>
              <span className="text-lg font-bold text-[#00FF00]">R$ 145.890</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A]">
              <span className="text-sm text-gray-400">Custos Operacionais</span>
              <span className="text-lg font-bold text-red-500">R$ 52.340</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A]">
              <span className="text-sm text-gray-400">Impostos</span>
              <span className="text-lg font-bold text-yellow-500">R$ 18.230</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A]">
              <span className="text-sm text-gray-400">Folha de Pagamento</span>
              <span className="text-lg font-bold text-orange-500">R$ 28.900</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A]">
              <span className="text-sm text-gray-400">Despesas Gerais</span>
              <span className="text-lg font-bold text-purple-500">R$ 12.450</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A]">
              <span className="text-sm text-gray-400">Manutenção</span>
              <span className="text-lg font-bold text-blue-500">R$ 5.670</span>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center p-6 rounded-lg bg-gradient-to-br from-[#00FF00]/10 to-[#009900]/10 border border-[#00FF00]/30">
            <span className="text-sm text-gray-400 mb-2">Lucro Líquido</span>
            <span className="text-4xl font-bold text-[#00FF00] mb-2">R$ 28.300</span>
            <div className="flex items-center gap-1 text-sm text-[#00FF00]">
              <ArrowUpRight className="w-4 h-4" />
              <span>+19.4% vs mês anterior</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

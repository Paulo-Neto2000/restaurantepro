"use client"

import { useEffect, useState } from "react"
import { StatCard } from "@/components/custom/stat-card"
import { DollarSign, ShoppingCart, Users, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Pedido {
  id: number
  numero_pedido: string
  mesa_id: number
  items: any
  valor_total: number
  status: string
  created_at: string
}

interface Mesa {
  id: number
  numero: number
  status: string
  cliente: string | null
  tempo: string | null
  valor: number | null
}

interface EstoqueItem {
  id: number
  nome: string
  quantidade: number
  nivel_minimo: number
  unidade: string
}

export default function Dashboard() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [mesas, setMesas] = useState<Mesa[]>([])
  const [estoque, setEstoque] = useState<EstoqueItem[]>([])
  const [stats, setStats] = useState({
    faturamento: 0,
    pedidosAtivos: 0,
    mesasOcupadas: 0,
    totalMesas: 0,
    ticketMedio: 0
  })

  useEffect(() => {
    carregarDados()
    
    // Atualizar dados a cada 30 segundos
    const interval = setInterval(carregarDados, 30000)
    return () => clearInterval(interval)
  }, [])

  async function carregarDados() {
    try {
      // Buscar pedidos
      const { data: pedidosData } = await supabase
        .from('pedidos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4)
      
      if (pedidosData) setPedidos(pedidosData)

      // Buscar mesas
      const { data: mesasData } = await supabase
        .from('mesas')
        .select('*')
        .order('numero', { ascending: true })
      
      if (mesasData) {
        setMesas(mesasData)
        
        // Calcular estatísticas
        const ocupadas = mesasData.filter(m => m.status === 'ocupada').length
        const total = mesasData.length
        const faturamentoHoje = mesasData.reduce((acc, m) => acc + (m.valor || 0), 0)
        
        setStats({
          faturamento: faturamentoHoje,
          pedidosAtivos: pedidosData?.filter(p => p.status !== 'entregue').length || 0,
          mesasOcupadas: ocupadas,
          totalMesas: total,
          ticketMedio: ocupadas > 0 ? faturamentoHoje / ocupadas : 0
        })
      }

      // Buscar alertas de estoque
      const { data: estoqueData } = await supabase
        .from('estoque')
        .select('*')
        .order('quantidade', { ascending: true })
        .limit(3)
      
      if (estoqueData) {
        const alertas = estoqueData.filter(item => item.quantidade <= item.nivel_minimo)
        setEstoque(alertas)
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    }
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case 'preparando':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'pronto':
        return <CheckCircle className="w-5 h-5 text-[#00FF00]" />
      case 'entregue':
        return <CheckCircle className="w-5 h-5 text-gray-500" />
      default:
        return <Clock className="w-5 h-5 text-blue-500" />
    }
  }

  function getStatusBg(status: string) {
    switch (status) {
      case 'preparando':
        return 'bg-yellow-500/20'
      case 'pronto':
        return 'bg-[#00FF00]/20'
      case 'entregue':
        return 'bg-gray-500/20'
      default:
        return 'bg-blue-500/20'
    }
  }

  function formatTempo(created_at: string) {
    const diff = Date.now() - new Date(created_at).getTime()
    const minutes = Math.floor(diff / 60000)
    return `${minutes} min`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Visão geral das operações em tempo real</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Faturamento Hoje"
          value={`R$ ${stats.faturamento.toFixed(2)}`}
          change="+12.5%"
          changeType="positive"
          icon={<DollarSign className="w-6 h-6 text-[#00FF00]" />}
        />
        <StatCard
          title="Pedidos Ativos"
          value={stats.pedidosAtivos.toString()}
          change={`+${stats.pedidosAtivos}`}
          changeType="positive"
          icon={<ShoppingCart className="w-6 h-6 text-[#00FF00]" />}
        />
        <StatCard
          title="Mesas Ocupadas"
          value={`${stats.mesasOcupadas}/${stats.totalMesas}`}
          change={`${Math.round((stats.mesasOcupadas / stats.totalMesas) * 100)}%`}
          changeType="neutral"
          icon={<Users className="w-6 h-6 text-[#00FF00]" />}
        />
        <StatCard
          title="Ticket Médio"
          value={`R$ ${stats.ticketMedio.toFixed(2)}`}
          change="+5.2%"
          changeType="positive"
          icon={<TrendingUp className="w-6 h-6 text-[#00FF00]" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pedidos Recentes */}
        <div className="lg:col-span-2 bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Pedidos Recentes</h2>
            <button className="text-sm text-[#00FF00] hover:text-[#00FF00]/80 transition-colors">
              Ver todos
            </button>
          </div>

          <div className="space-y-4">
            {pedidos.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Nenhum pedido encontrado</p>
            ) : (
              pedidos.map((pedido) => {
                const items = Array.isArray(pedido.items) ? pedido.items : []
                const itemCount = items.length
                
                return (
                  <div
                    key={pedido.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#00FF00]/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusBg(pedido.status)}`}>
                        {getStatusIcon(pedido.status)}
                      </div>
                      <div>
                        <p className="font-medium text-white">{pedido.numero_pedido} - Mesa {pedido.mesa_id}</p>
                        <p className="text-sm text-gray-400">{itemCount} {itemCount === 1 ? 'item' : 'itens'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">R$ {pedido.valor_total.toFixed(2)}</p>
                      <p className="text-sm text-gray-400">{formatTempo(pedido.created_at)}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Alertas e Status */}
        <div className="space-y-6">
          {/* Alertas de Estoque */}
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Alertas de Estoque</h2>
            <div className="space-y-3">
              {estoque.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">Nenhum alerta</p>
              ) : (
                estoque.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#1A1A1A] border border-red-500/30"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.nome}</p>
                      <p className="text-xs text-gray-400">{item.quantidade}{item.unidade} restantes</p>
                    </div>
                    <span className="text-xs text-red-500 font-medium">
                      {item.quantidade <= item.nivel_minimo / 2 ? 'Crítico' : 'Baixo'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Mesas Disponíveis */}
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Status das Mesas</h2>
            <div className="grid grid-cols-5 gap-2">
              {mesas.map((mesa) => {
                const ocupada = mesa.status === 'ocupada'
                const reservada = mesa.status === 'reservada'
                
                return (
                  <div
                    key={mesa.id}
                    className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      ocupada
                        ? "bg-red-500/20 border border-red-500/50 text-red-500"
                        : reservada
                        ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-500"
                        : "bg-[#00FF00]/20 border border-[#00FF00]/50 text-[#00FF00] hover:bg-[#00FF00]/30 cursor-pointer"
                    }`}
                  >
                    {mesa.numero}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Vendas da Semana</h2>
        <div className="h-64 flex items-end justify-between gap-4">
          {[
            { day: "Seg", value: 65 },
            { day: "Ter", value: 78 },
            { day: "Qua", value: 82 },
            { day: "Qui", value: 90 },
            { day: "Sex", value: 95 },
            { day: "Sáb", value: 100 },
            { day: "Dom", value: 88 },
          ].map((data, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full relative group">
                <div
                  className="w-full bg-gradient-to-t from-[#00FF00] to-[#009900] rounded-t-lg transition-all duration-500 hover:from-[#00FF00] hover:to-[#00FF00] cursor-pointer"
                  style={{ height: `${data.value * 2}px` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1A1A1A] px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                    R$ {(data.value * 100).toFixed(0)}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-400">{data.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import { Clock, CheckCircle, XCircle, Printer, Eye } from "lucide-react"
import { useState } from "react"

type PedidoStatus = "pending" | "preparing" | "ready" | "delivered" | "cancelled"

interface Pedido {
  id: string
  mesa: string
  items: string[]
  valor: number
  status: PedidoStatus
  time: string
  cliente?: string
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([
    { id: "#1234", mesa: "Mesa 12", items: ["Pizza Margherita", "Refrigerante 2L", "Batata Frita"], valor: 145.00, status: "preparing", time: "5 min", cliente: "João Silva" },
    { id: "#1233", mesa: "Mesa 08", items: ["Hambúrguer Artesanal", "Suco Natural"], valor: 89.00, status: "ready", time: "2 min", cliente: "Maria Santos" },
    { id: "#1232", mesa: "Mesa 15", items: ["Filé Mignon", "Vinho Tinto", "Salada Caesar", "Sobremesa"], valor: 210.00, status: "preparing", time: "8 min", cliente: "Carlos Oliveira" },
    { id: "#1231", mesa: "Mesa 03", items: ["Espaguete à Carbonara"], valor: 45.00, status: "delivered", time: "Entregue", cliente: "Ana Costa" },
    { id: "#1230", mesa: "Mesa 20", items: ["Sushi Combo", "Chá Gelado"], valor: 120.00, status: "pending", time: "Aguardando", cliente: "Pedro Alves" },
    { id: "#1229", mesa: "Mesa 07", items: ["Lasanha", "Refrigerante"], valor: 65.00, status: "preparing", time: "10 min", cliente: "Juliana Lima" },
  ])

  const [filtroStatus, setFiltroStatus] = useState<PedidoStatus | "all">("all")
  const [pedidoSelecionado, setPedidoSelecionado] = useState<Pedido | null>(null)

  const getStatusConfig = (status: PedidoStatus) => {
    const configs = {
      pending: { label: "Pendente", color: "text-yellow-500", bg: "bg-yellow-500/20", icon: Clock },
      preparing: { label: "Preparando", color: "text-blue-500", bg: "bg-blue-500/20", icon: Clock },
      ready: { label: "Pronto", color: "text-[#00FF00]", bg: "bg-[#00FF00]/20", icon: CheckCircle },
      delivered: { label: "Entregue", color: "text-gray-500", bg: "bg-gray-500/20", icon: CheckCircle },
      cancelled: { label: "Cancelado", color: "text-red-500", bg: "bg-red-500/20", icon: XCircle },
    }
    return configs[status]
  }

  const atualizarStatus = (pedidoId: string, novoStatus: PedidoStatus) => {
    setPedidos(pedidos.map(p => 
      p.id === pedidoId ? { ...p, status: novoStatus } : p
    ))
  }

  const imprimirPedido = (pedido: Pedido) => {
    alert(`Imprimindo pedido ${pedido.id} para ${pedido.mesa}`)
  }

  const pedidosFiltrados = filtroStatus === "all" 
    ? pedidos 
    : pedidos.filter(p => p.status === filtroStatus)

  const stats = {
    total: pedidos.length,
    pending: pedidos.filter(p => p.status === "pending").length,
    preparing: pedidos.filter(p => p.status === "preparing").length,
    ready: pedidos.filter(p => p.status === "ready").length,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Pedidos</h1>
        <p className="text-gray-400">Gerencie todos os pedidos em tempo real</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Total</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-[#0D0D0D] border border-yellow-500/30 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Pendentes</p>
          <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
        </div>
        <div className="bg-[#0D0D0D] border border-blue-500/30 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Preparando</p>
          <p className="text-2xl font-bold text-blue-500">{stats.preparing}</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#00FF00]/30 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Prontos</p>
          <p className="text-2xl font-bold text-[#00FF00]">{stats.ready}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {[
          { value: "all", label: "Todos" },
          { value: "pending", label: "Pendentes" },
          { value: "preparing", label: "Preparando" },
          { value: "ready", label: "Prontos" },
          { value: "delivered", label: "Entregues" },
        ].map((filtro) => (
          <button
            key={filtro.value}
            onClick={() => setFiltroStatus(filtro.value as PedidoStatus | "all")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              filtroStatus === filtro.value
                ? "bg-gradient-to-r from-[#00FF00] to-[#009900] text-black"
                : "bg-[#1A1A1A] text-gray-400 hover:text-white border border-[#2A2A2A] hover:border-[#00FF00]/30"
            }`}
          >
            {filtro.label}
          </button>
        ))}
      </div>

      {/* Lista de Pedidos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {pedidosFiltrados.map((pedido) => {
          const statusConfig = getStatusConfig(pedido.status)
          const StatusIcon = statusConfig.icon

          return (
            <div
              key={pedido.id}
              className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6 hover:border-[#00FF00]/30 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${statusConfig.bg} flex items-center justify-center`}>
                    <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                  </div>
                  <div>
                    <p className="font-bold text-white">{pedido.id}</p>
                    <p className="text-sm text-gray-400">{pedido.mesa}</p>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${statusConfig.bg} ${statusConfig.color} font-medium`}>
                  {statusConfig.label}
                </span>
              </div>

              {/* Cliente */}
              {pedido.cliente && (
                <p className="text-sm text-gray-400 mb-3">Cliente: {pedido.cliente}</p>
              )}

              {/* Items */}
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Itens:</p>
                <ul className="space-y-1">
                  {pedido.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1A1A1A]">
                <div>
                  <p className="text-lg font-bold text-white">R$ {pedido.valor.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">{pedido.time}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPedidoSelecionado(pedido)}
                    className="p-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#00FF00] transition-all"
                  >
                    <Eye className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => imprimirPedido(pedido)}
                    className="p-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#00FF00] transition-all"
                  >
                    <Printer className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Ações de Status */}
              <div className="flex gap-2 mt-4">
                {pedido.status === "pending" && (
                  <button
                    onClick={() => atualizarStatus(pedido.id, "preparing")}
                    className="flex-1 px-3 py-2 rounded-lg bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 transition-all text-sm font-medium"
                  >
                    Iniciar Preparo
                  </button>
                )}
                {pedido.status === "preparing" && (
                  <button
                    onClick={() => atualizarStatus(pedido.id, "ready")}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#00FF00]/20 text-[#00FF00] hover:bg-[#00FF00]/30 transition-all text-sm font-medium"
                  >
                    Marcar como Pronto
                  </button>
                )}
                {pedido.status === "ready" && (
                  <button
                    onClick={() => atualizarStatus(pedido.id, "delivered")}
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 transition-all text-sm font-medium"
                  >
                    Marcar como Entregue
                  </button>
                )}
                {pedido.status !== "cancelled" && pedido.status !== "delivered" && (
                  <button
                    onClick={() => atualizarStatus(pedido.id, "cancelled")}
                    className="px-3 py-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-all text-sm font-medium"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {pedidosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">Nenhum pedido encontrado com este filtro</p>
        </div>
      )}

      {/* Modal de Detalhes */}
      {pedidoSelecionado && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPedidoSelecionado(null)}
        >
          <div
            className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-4">Detalhes do Pedido</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Pedido</p>
                <p className="text-white font-medium">{pedidoSelecionado.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Mesa</p>
                <p className="text-white font-medium">{pedidoSelecionado.mesa}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Cliente</p>
                <p className="text-white font-medium">{pedidoSelecionado.cliente || "Não informado"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Valor Total</p>
                <p className="text-white font-medium">R$ {pedidoSelecionado.valor.toFixed(2)}</p>
              </div>
            </div>
            <button
              onClick={() => setPedidoSelecionado(null)}
              className="w-full mt-6 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00FF00] to-[#009900] text-black font-medium hover:from-[#00FF00] hover:to-[#00FF00] transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

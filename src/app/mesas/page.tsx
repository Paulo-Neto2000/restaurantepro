"use client"

import { Users, Clock, DollarSign, Plus, X, QrCode, FileText, Download } from "lucide-react"
import { useState } from "react"

type MesaStatus = "disponivel" | "ocupada" | "reservada"

interface Mesa {
  id: number
  capacidade: number
  status: MesaStatus
  cliente?: string
  tempo?: string
  valor?: number
}

export default function MesasPage() {
  const [mesas, setMesas] = useState<Mesa[]>([
    { id: 1, capacidade: 4, status: "ocupada", cliente: "João Silva", tempo: "45 min", valor: 120.50 },
    { id: 2, capacidade: 2, status: "disponivel" },
    { id: 3, capacidade: 6, status: "ocupada", cliente: "Maria Santos", tempo: "1h 20min", valor: 340.00 },
    { id: 4, capacidade: 4, status: "disponivel" },
    { id: 5, capacidade: 2, status: "reservada", cliente: "Carlos Oliveira", tempo: "18:30" },
    { id: 6, capacidade: 4, status: "ocupada", cliente: "Ana Costa", tempo: "30 min", valor: 85.00 },
    { id: 7, capacidade: 8, status: "disponivel" },
    { id: 8, capacidade: 2, status: "ocupada", cliente: "Pedro Alves", tempo: "15 min", valor: 45.00 },
    { id: 9, capacidade: 4, status: "disponivel" },
    { id: 10, capacidade: 6, status: "reservada", cliente: "Juliana Lima", tempo: "19:00" },
    { id: 11, capacidade: 2, status: "disponivel" },
    { id: 12, capacidade: 4, status: "ocupada", cliente: "Roberto Costa", tempo: "2h 10min", valor: 450.00 },
    { id: 13, capacidade: 4, status: "disponivel" },
    { id: 14, capacidade: 2, status: "disponivel" },
    { id: 15, capacidade: 6, status: "ocupada", cliente: "Fernanda Souza", tempo: "55 min", valor: 210.00 },
    { id: 16, capacidade: 4, status: "disponivel" },
    { id: 17, capacidade: 2, status: "disponivel" },
    { id: 18, capacidade: 4, status: "ocupada", cliente: "Lucas Martins", tempo: "1h 05min", valor: 180.00 },
    { id: 19, capacidade: 8, status: "disponivel" },
    { id: 20, capacidade: 4, status: "ocupada", cliente: "Beatriz Rocha", tempo: "40 min", valor: 95.00 },
    { id: 21, capacidade: 2, status: "disponivel" },
    { id: 22, capacidade: 4, status: "disponivel" },
    { id: 23, capacidade: 6, status: "disponivel" },
    { id: 24, capacidade: 2, status: "disponivel" },
    { id: 25, capacidade: 4, status: "disponivel" },
  ])

  const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [mostrarQRCode, setMostrarQRCode] = useState(false)
  const [mostrarComanda, setMostrarComanda] = useState(false)
  const [filtroStatus, setFiltroStatus] = useState<MesaStatus | "all">("all")

  const getStatusConfig = (status: MesaStatus) => {
    const configs = {
      disponivel: { label: "Disponível", color: "text-[#00FF00]", bg: "bg-[#00FF00]/20", border: "border-[#00FF00]/50" },
      ocupada: { label: "Ocupada", color: "text-red-500", bg: "bg-red-500/20", border: "border-red-500/50" },
      reservada: { label: "Reservada", color: "text-yellow-500", bg: "bg-yellow-500/20", border: "border-yellow-500/50" },
    }
    return configs[status]
  }

  const alterarStatusMesa = (mesaId: number, novoStatus: MesaStatus) => {
    setMesas(mesas.map(m => 
      m.id === mesaId ? { ...m, status: novoStatus, cliente: novoStatus === "disponivel" ? undefined : m.cliente } : m
    ))
    setMostrarModal(false)
    setMesaSelecionada(null)
  }

  const ocuparMesa = (mesaId: number, cliente: string) => {
    setMesas(mesas.map(m => 
      m.id === mesaId ? { ...m, status: "ocupada", cliente, tempo: "0 min", valor: 0 } : m
    ))
    setMostrarModal(false)
    setMesaSelecionada(null)
  }

  const liberarMesa = (mesaId: number) => {
    const mesa = mesas.find(m => m.id === mesaId)
    if (mesa && mesa.valor) {
      alert(`Mesa ${mesaId} liberada! Valor total: R$ ${mesa.valor.toFixed(2)}`)
    }
    alterarStatusMesa(mesaId, "disponivel")
  }

  const gerarQRCode = (mesaId: number) => {
    setMostrarQRCode(true)
  }

  const gerarComanda = (mesaId: number) => {
    setMostrarComanda(true)
  }

  const mesasFiltradas = filtroStatus === "all" 
    ? mesas 
    : mesas.filter(m => m.status === filtroStatus)

  const stats = {
    total: mesas.length,
    disponiveis: mesas.filter(m => m.status === "disponivel").length,
    ocupadas: mesas.filter(m => m.status === "ocupada").length,
    reservadas: mesas.filter(m => m.status === "reservada").length,
    faturamento: mesas.filter(m => m.status === "ocupada").reduce((acc, m) => acc + (m.valor || 0), 0),
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Mesas</h1>
        <p className="text-gray-400">Gerencie a ocupação das mesas em tempo real</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Total</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#00FF00]/30 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Disponíveis</p>
          <p className="text-2xl font-bold text-[#00FF00]">{stats.disponiveis}</p>
        </div>
        <div className="bg-[#0D0D0D] border border-red-500/30 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Ocupadas</p>
          <p className="text-2xl font-bold text-red-500">{stats.ocupadas}</p>
        </div>
        <div className="bg-[#0D0D0D] border border-yellow-500/30 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Reservadas</p>
          <p className="text-2xl font-bold text-yellow-500">{stats.reservadas}</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Faturamento</p>
          <p className="text-2xl font-bold text-white">R$ {stats.faturamento.toFixed(0)}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {[
          { value: "all", label: "Todas" },
          { value: "disponivel", label: "Disponíveis" },
          { value: "ocupada", label: "Ocupadas" },
          { value: "reservada", label: "Reservadas" },
        ].map((filtro) => (
          <button
            key={filtro.value}
            onClick={() => setFiltroStatus(filtro.value as MesaStatus | "all")}
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

      {/* Grid de Mesas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {mesasFiltradas.map((mesa) => {
          const statusConfig = getStatusConfig(mesa.status)

          return (
            <button
              key={mesa.id}
              onClick={() => {
                setMesaSelecionada(mesa)
                setMostrarModal(true)
              }}
              className={`aspect-square rounded-xl p-4 border-2 ${statusConfig.border} ${statusConfig.bg} hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-2`}
            >
              <span className="text-2xl font-bold text-white">Mesa {mesa.id}</span>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>{mesa.capacidade}</span>
              </div>
              <span className={`text-xs font-medium ${statusConfig.color}`}>
                {statusConfig.label}
              </span>
              {mesa.status === "ocupada" && mesa.tempo && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{mesa.tempo}</span>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Modal de Detalhes */}
      {mostrarModal && mesaSelecionada && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setMostrarModal(false)
            setMesaSelecionada(null)
          }}
        >
          <div
            className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Mesa {mesaSelecionada.id}</h3>
              <button
                onClick={() => {
                  setMostrarModal(false)
                  setMesaSelecionada(null)
                }}
                className="p-2 rounded-lg bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-all"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A]">
                <span className="text-gray-400">Status</span>
                <span className={`font-medium ${getStatusConfig(mesaSelecionada.status).color}`}>
                  {getStatusConfig(mesaSelecionada.status).label}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A]">
                <span className="text-gray-400">Capacidade</span>
                <span className="font-medium text-white">{mesaSelecionada.capacidade} pessoas</span>
              </div>

              {mesaSelecionada.cliente && (
                <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A]">
                  <span className="text-gray-400">Cliente</span>
                  <span className="font-medium text-white">{mesaSelecionada.cliente}</span>
                </div>
              )}

              {mesaSelecionada.tempo && (
                <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A]">
                  <span className="text-gray-400">Tempo</span>
                  <span className="font-medium text-white">{mesaSelecionada.tempo}</span>
                </div>
              )}

              {mesaSelecionada.valor !== undefined && (
                <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A]">
                  <span className="text-gray-400">Valor Atual</span>
                  <span className="font-medium text-white">R$ {mesaSelecionada.valor.toFixed(2)}</span>
                </div>
              )}

              {/* Ações */}
              <div className="space-y-2 pt-4">
                {/* Botões QR Code e Comanda */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => gerarQRCode(mesaSelecionada.id)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#1A1A1A] text-white font-medium hover:bg-[#2A2A2A] transition-all border border-[#2A2A2A] hover:border-[#00FF00]/30"
                  >
                    <QrCode className="w-4 h-4" />
                    QR Code
                  </button>
                  <button
                    onClick={() => gerarComanda(mesaSelecionada.id)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#1A1A1A] text-white font-medium hover:bg-[#2A2A2A] transition-all border border-[#2A2A2A] hover:border-[#00FF00]/30"
                  >
                    <FileText className="w-4 h-4" />
                    Comanda
                  </button>
                </div>

                {mesaSelecionada.status === "disponivel" && (
                  <button
                    onClick={() => {
                      const cliente = prompt("Nome do cliente:")
                      if (cliente) ocuparMesa(mesaSelecionada.id, cliente)
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#00FF00] to-[#009900] text-black font-medium hover:from-[#00FF00] hover:to-[#00FF00] transition-all"
                  >
                    Ocupar Mesa
                  </button>
                )}

                {mesaSelecionada.status === "ocupada" && (
                  <>
                    <button
                      onClick={() => liberarMesa(mesaSelecionada.id)}
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#00FF00] to-[#009900] text-black font-medium hover:from-[#00FF00] hover:to-[#00FF00] transition-all"
                    >
                      Liberar Mesa
                    </button>
                    <button
                      onClick={() => alert("Adicionar itens ao pedido")}
                      className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] text-white font-medium hover:bg-[#2A2A2A] transition-all border border-[#2A2A2A] hover:border-[#00FF00]/30"
                    >
                      Adicionar Pedido
                    </button>
                  </>
                )}

                {mesaSelecionada.status === "reservada" && (
                  <>
                    <button
                      onClick={() => alterarStatusMesa(mesaSelecionada.id, "ocupada")}
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#00FF00] to-[#009900] text-black font-medium hover:from-[#00FF00] hover:to-[#00FF00] transition-all"
                    >
                      Confirmar Chegada
                    </button>
                    <button
                      onClick={() => alterarStatusMesa(mesaSelecionada.id, "disponivel")}
                      className="w-full px-4 py-3 rounded-lg bg-red-500/20 text-red-500 font-medium hover:bg-red-500/30 transition-all"
                    >
                      Cancelar Reserva
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal QR Code */}
      {mostrarQRCode && mesaSelecionada && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setMostrarQRCode(false)}
        >
          <div
            className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-8 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">QR Code - Mesa {mesaSelecionada.id}</h3>
              <button
                onClick={() => setMostrarQRCode(false)}
                className="p-2 rounded-lg bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-all"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* QR Code Placeholder */}
            <div className="bg-white p-8 rounded-xl mb-6">
              <div className="aspect-square bg-gradient-to-br from-[#00FF00] to-[#009900] rounded-lg flex items-center justify-center">
                <QrCode className="w-32 h-32 text-black" />
              </div>
            </div>

            <p className="text-center text-gray-400 text-sm mb-6">
              Escaneie este código para acessar o cardápio digital da Mesa {mesaSelecionada.id}
            </p>

            <button
              onClick={() => alert("QR Code baixado!")}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#00FF00] to-[#009900] text-black font-medium hover:from-[#00FF00] hover:to-[#00FF00] transition-all"
            >
              <Download className="w-5 h-5" />
              Baixar QR Code
            </button>
          </div>
        </div>
      )}

      {/* Modal Comanda */}
      {mostrarComanda && mesaSelecionada && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setMostrarComanda(false)}
        >
          <div
            className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Comanda - Mesa {mesaSelecionada.id}</h3>
              <button
                onClick={() => setMostrarComanda(false)}
                className="p-2 rounded-lg bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-all"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Comanda Content */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6 space-y-4">
              <div className="text-center border-b border-[#2A2A2A] pb-4">
                <h4 className="text-2xl font-bold text-white mb-1">RestaurantePro</h4>
                <p className="text-sm text-gray-400">Comanda #{mesaSelecionada.id.toString().padStart(4, '0')}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Mesa:</span>
                  <span className="text-white font-medium">{mesaSelecionada.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Cliente:</span>
                  <span className="text-white font-medium">{mesaSelecionada.cliente || "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Data/Hora:</span>
                  <span className="text-white font-medium">{new Date().toLocaleString('pt-BR')}</span>
                </div>
              </div>

              <div className="border-t border-[#2A2A2A] pt-4">
                <p className="text-xs text-gray-500 text-center">
                  Pedidos serão adicionados a esta comanda
                </p>
              </div>
            </div>

            <button
              onClick={() => alert("Comanda impressa!")}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#00FF00] to-[#009900] text-black font-medium hover:from-[#00FF00] hover:to-[#00FF00] transition-all"
            >
              <Download className="w-5 h-5" />
              Imprimir Comanda
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

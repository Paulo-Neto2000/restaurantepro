"use client"

import { Bell, Lock, Palette, Database, Printer, CreditCard, Users, Globe, Shield, Zap } from "lucide-react"
import { useState } from "react"

export default function ConfiguracoesPage() {
  const [notificacoes, setNotificacoes] = useState(true)
  const [modoEscuro, setModoEscuro] = useState(true)
  const [impressaoAutomatica, setImpressaoAutomatica] = useState(true)
  const [backupAutomatico, setBackupAutomatico] = useState(true)

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Configurações</h1>
        <p className="text-gray-400">Gerencie as configurações do sistema</p>
      </div>

      {/* Configurações Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notificações */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FF00]/20 to-[#009900]/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#00FF00]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Notificações</h2>
              <p className="text-sm text-gray-400">Gerencie alertas do sistema</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
              <div>
                <p className="text-sm font-medium text-white">Notificações Push</p>
                <p className="text-xs text-gray-400">Receba alertas em tempo real</p>
              </div>
              <button
                onClick={() => setNotificacoes(!notificacoes)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  notificacoes ? "bg-gradient-to-r from-[#00FF00] to-[#009900]" : "bg-[#2A2A2A]"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                    notificacoes ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
              <div>
                <p className="text-sm font-medium text-white">Alertas de Estoque</p>
                <p className="text-xs text-gray-400">Avisos de produtos em falta</p>
              </div>
              <button className="relative w-12 h-6 rounded-full bg-gradient-to-r from-[#00FF00] to-[#009900]">
                <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
              <div>
                <p className="text-sm font-medium text-white">Novos Pedidos</p>
                <p className="text-xs text-gray-400">Notificar sobre novos pedidos</p>
              </div>
              <button className="relative w-12 h-6 rounded-full bg-gradient-to-r from-[#00FF00] to-[#009900]">
                <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full" />
              </button>
            </div>
          </div>
        </div>

        {/* Aparência */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FF00]/20 to-[#009900]/20 flex items-center justify-center">
              <Palette className="w-5 h-5 text-[#00FF00]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Aparência</h2>
              <p className="text-sm text-gray-400">Personalize a interface</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
              <div>
                <p className="text-sm font-medium text-white">Modo Escuro</p>
                <p className="text-xs text-gray-400">Interface dark premium</p>
              </div>
              <button
                onClick={() => setModoEscuro(!modoEscuro)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  modoEscuro ? "bg-gradient-to-r from-[#00FF00] to-[#009900]" : "bg-[#2A2A2A]"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                    modoEscuro ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
              <p className="text-sm font-medium text-white mb-3">Cor de Destaque</p>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FF00] to-[#009900] border-2 border-white" />
                <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 hover:border-2 hover:border-white transition-all" />
                <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 hover:border-2 hover:border-white transition-all" />
                <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-700 hover:border-2 hover:border-white transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Impressoras */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FF00]/20 to-[#009900]/20 flex items-center justify-center">
              <Printer className="w-5 h-5 text-[#00FF00]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Impressoras</h2>
              <p className="text-sm text-gray-400">Configure impressoras térmicas</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
              <div>
                <p className="text-sm font-medium text-white">Impressão Automática</p>
                <p className="text-xs text-gray-400">Imprimir pedidos automaticamente</p>
              </div>
              <button
                onClick={() => setImpressaoAutomatica(!impressaoAutomatica)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  impressaoAutomatica ? "bg-gradient-to-r from-[#00FF00] to-[#009900]" : "bg-[#2A2A2A]"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                    impressaoAutomatica ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-white">Impressora Cozinha</p>
                <span className="text-xs px-2 py-1 rounded-full bg-[#00FF00]/20 text-[#00FF00]">Conectada</span>
              </div>
              <p className="text-xs text-gray-400">Epson TM-T20III</p>
            </div>

            <div className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-white">Impressora Bar</p>
                <span className="text-xs px-2 py-1 rounded-full bg-[#00FF00]/20 text-[#00FF00]">Conectada</span>
              </div>
              <p className="text-xs text-gray-400">Epson TM-T20III</p>
            </div>
          </div>
        </div>

        {/* Pagamentos */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FF00]/20 to-[#009900]/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-[#00FF00]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Pagamentos</h2>
              <p className="text-sm text-gray-400">Métodos de pagamento</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-white">Dinheiro</p>
                <button className="relative w-12 h-6 rounded-full bg-gradient-to-r from-[#00FF00] to-[#009900]">
                  <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-white">Cartão de Crédito/Débito</p>
                <button className="relative w-12 h-6 rounded-full bg-gradient-to-r from-[#00FF00] to-[#009900]">
                  <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-white">PIX</p>
                <button className="relative w-12 h-6 rounded-full bg-gradient-to-r from-[#00FF00] to-[#009900]">
                  <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-white">Vale Refeição</p>
                <button className="relative w-12 h-6 rounded-full bg-gradient-to-r from-[#00FF00] to-[#009900]">
                  <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Backup */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FF00]/20 to-[#009900]/20 flex items-center justify-center">
              <Database className="w-5 h-5 text-[#00FF00]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Backup</h2>
              <p className="text-sm text-gray-400">Segurança dos dados</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
              <div>
                <p className="text-sm font-medium text-white">Backup Automático</p>
                <p className="text-xs text-gray-400">Diariamente às 03:00</p>
              </div>
              <button
                onClick={() => setBackupAutomatico(!backupAutomatico)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  backupAutomatico ? "bg-gradient-to-r from-[#00FF00] to-[#009900]" : "bg-[#2A2A2A]"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                    backupAutomatico ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
              <p className="text-sm font-medium text-white mb-2">Último Backup</p>
              <p className="text-xs text-gray-400">Hoje às 03:00 - 2.4 GB</p>
            </div>

            <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#00FF00] to-[#009900] text-black font-medium hover:from-[#00FF00] hover:to-[#00FF00] transition-all duration-300">
              Fazer Backup Agora
            </button>
          </div>
        </div>

        {/* Segurança */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FF00]/20 to-[#009900]/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#00FF00]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Segurança</h2>
              <p className="text-sm text-gray-400">Proteção e privacidade</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#00FF00]/30 transition-all text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Alterar Senha</p>
                  <p className="text-xs text-gray-400">Última alteração há 30 dias</p>
                </div>
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button className="w-full p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#00FF00]/30 transition-all text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Autenticação em Dois Fatores</p>
                  <p className="text-xs text-gray-400">Adicionar camada extra de segurança</p>
                </div>
                <Zap className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button className="w-full p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#00FF00]/30 transition-all text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Gerenciar Permissões</p>
                  <p className="text-xs text-gray-400">Controle de acesso por usuário</p>
                </div>
                <Users className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Informações do Sistema */}
      <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FF00]/20 to-[#009900]/20 flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#00FF00]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Informações do Sistema</h2>
            <p className="text-sm text-gray-400">Detalhes da instalação</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
            <p className="text-xs text-gray-400 mb-1">Versão</p>
            <p className="text-lg font-bold text-white">2.5.0</p>
          </div>

          <div className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
            <p className="text-xs text-gray-400 mb-1">Licença</p>
            <p className="text-lg font-bold text-white">Premium</p>
          </div>

          <div className="p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
            <p className="text-xs text-gray-400 mb-1">Suporte</p>
            <p className="text-lg font-bold text-white">24/7</p>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingCart, Utensils, Package, BarChart3, Settings, Users, Menu, X } from "lucide-react"
import { useState } from "react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: ShoppingCart, label: "Pedidos", href: "/pedidos" },
  { icon: Utensils, label: "Mesas", href: "/mesas" },
  { icon: Package, label: "Estoque", href: "/estoque" },
  { icon: Users, label: "Funcionários", href: "/funcionarios" },
  { icon: BarChart3, label: "Relatórios", href: "/relatorios" },
  { icon: Settings, label: "Configurações", href: "/configuracoes" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button - Move junto com a sidebar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 z-50 lg:hidden p-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#00FF00] transition-all duration-300 ${
          isOpen ? "left-[272px]" : "left-4"
        }`}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0D0D0D] border-r border-[#1A1A1A] z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[#1A1A1A]">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00FF00] to-[#009900] bg-clip-text text-transparent">
              RestaurantePro
            </h1>
            <p className="text-xs text-gray-500 mt-1">Gestão Premium</p>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                    isActive
                      ? "bg-gradient-to-r from-[#00FF00]/20 to-[#009900]/20 border border-[#00FF00]/50"
                      : "hover:bg-[#1A1A1A] border border-transparent hover:border-[#2A2A2A]"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive
                        ? "text-[#00FF00]"
                        : "text-gray-400 group-hover:text-[#00FF00]"
                    }`}
                  />
                  <span
                    className={`font-medium transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#1A1A1A]">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#1A1A1A]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FF00] to-[#009900] flex items-center justify-center">
                <span className="text-black font-bold text-sm">AD</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-gray-500">admin@restaurante.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

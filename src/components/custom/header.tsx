"use client"

import { Bell, Search } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const searchablePages = [
  { name: "Dashboard", path: "/", keywords: ["dashboard", "inicio", "home", "principal"] },
  { name: "Pedidos", path: "/pedidos", keywords: ["pedidos", "orders", "comandas"] },
  { name: "Mesas", path: "/mesas", keywords: ["mesas", "tables", "ocupação"] },
  { name: "Estoque", path: "/estoque", keywords: ["estoque", "produtos", "inventory", "items"] },
  { name: "Funcionários", path: "/funcionarios", keywords: ["funcionários", "funcionarios", "equipe", "staff", "colaboradores"] },
  { name: "Relatórios", path: "/relatorios", keywords: ["relatórios", "relatorios", "reports", "análises", "vendas"] },
  { name: "Configurações", path: "/configuracoes", keywords: ["configurações", "configuracoes", "settings", "ajustes"] },
]

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredPages, setFilteredPages] = useState(searchablePages)

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPages(searchablePages)
      setShowSuggestions(false)
    } else {
      const filtered = searchablePages.filter(page => 
        page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredPages(filtered)
      setShowSuggestions(true)
    }
  }, [searchTerm])

  const handleSearch = (path: string) => {
    router.push(path)
    setSearchTerm("")
    setShowSuggestions(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && filteredPages.length > 0) {
      handleSearch(filteredPages[0].path)
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-[#0D0D0D]/80 backdrop-blur-xl border-b border-[#1A1A1A]">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <div className="flex-1 max-w-xl relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar páginas, pedidos, mesas, produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => searchTerm && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00FF00] transition-all duration-300"
            />
          </div>

          {/* Search Suggestions */}
          {showSuggestions && filteredPages.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden shadow-2xl">
              {filteredPages.map((page) => (
                <button
                  key={page.path}
                  onClick={() => handleSearch(page.path)}
                  className={`w-full px-4 py-3 text-left hover:bg-[#2A2A2A] transition-all duration-200 flex items-center justify-between group ${
                    pathname === page.path ? "bg-[#00FF00]/10" : ""
                  }`}
                >
                  <span className="text-white group-hover:text-[#00FF00] transition-colors">
                    {page.name}
                  </span>
                  {pathname === page.path && (
                    <span className="text-xs px-2 py-1 rounded-full bg-[#00FF00]/20 text-[#00FF00]">
                      Atual
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {showSuggestions && filteredPages.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden shadow-2xl">
              <div className="px-4 py-3 text-gray-400 text-sm">
                Nenhum resultado encontrado
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 ml-6">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#00FF00] transition-all duration-300 group">
            <Bell className="w-5 h-5 text-gray-400 group-hover:text-[#00FF00] transition-colors duration-300" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#00FF00] to-[#009900] rounded-full flex items-center justify-center text-[10px] font-bold text-black">
              3
            </span>
          </button>

          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
            <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
            <span className="text-sm text-gray-400">Sistema Online</span>
          </div>
        </div>
      </div>
    </header>
  )
}

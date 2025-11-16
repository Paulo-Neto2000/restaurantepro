"use client"

import { Package, AlertCircle, TrendingUp, Plus, Minus, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

interface Produto {
  id: number
  nome: string
  categoria: string
  quantidade: number
  unidade: string
  minimo: number
  preco: number
  fornecedor: string
}

export default function EstoquePage() {
  const [produtos, setProdutos] = useState<Produto[]>([
    { id: 1, nome: "Tomate", categoria: "Hortifruti", quantidade: 2, unidade: "kg", minimo: 5, preco: 8.50, fornecedor: "Hortifruti Silva" },
    { id: 2, nome: "Queijo Mussarela", categoria: "Laticínios", quantidade: 0.5, unidade: "kg", minimo: 2, preco: 45.00, fornecedor: "Laticínios Bom Leite" },
    { id: 3, nome: "Refrigerante 2L", categoria: "Bebidas", quantidade: 8, unidade: "un", minimo: 12, preco: 7.50, fornecedor: "Distribuidora Bebidas" },
    { id: 4, nome: "Filé Mignon", categoria: "Carnes", quantidade: 15, unidade: "kg", minimo: 10, preco: 65.00, fornecedor: "Açougue Premium" },
    { id: 5, nome: "Alface", categoria: "Hortifruti", quantidade: 25, unidade: "un", minimo: 15, preco: 3.50, fornecedor: "Hortifruti Silva" },
    { id: 6, nome: "Arroz", categoria: "Grãos", quantidade: 50, unidade: "kg", minimo: 30, preco: 5.20, fornecedor: "Atacadão Grãos" },
    { id: 7, nome: "Feijão", categoria: "Grãos", quantidade: 40, unidade: "kg", minimo: 25, preco: 8.90, fornecedor: "Atacadão Grãos" },
    { id: 8, nome: "Cerveja Lata", categoria: "Bebidas", quantidade: 120, unidade: "un", minimo: 100, preco: 3.50, fornecedor: "Distribuidora Bebidas" },
    { id: 9, nome: "Vinho Tinto", categoria: "Bebidas", quantidade: 18, unidade: "un", minimo: 12, preco: 45.00, fornecedor: "Adega Premium" },
    { id: 10, nome: "Azeite", categoria: "Condimentos", quantidade: 5, unidade: "L", minimo: 8, preco: 35.00, fornecedor: "Empório Gourmet" },
  ])

  const [filtroCategoria, setFiltroCategoria] = useState<string>("all")
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)
  const [mostrarModal, setMostrarModal] = useState(false)

  const categorias = ["all", ...Array.from(new Set(produtos.map(p => p.categoria)))]

  const ajustarQuantidade = (produtoId: number, delta: number) => {
    setProdutos(produtos.map(p => 
      p.id === produtoId ? { ...p, quantidade: Math.max(0, p.quantidade + delta) } : p
    ))
  }

  const removerProduto = (produtoId: number) => {
    if (confirm("Deseja realmente remover este produto?")) {
      setProdutos(produtos.filter(p => p.id !== produtoId))
    }
  }

  const produtosFiltrados = filtroCategoria === "all" 
    ? produtos 
    : produtos.filter(p => p.categoria === filtroCategoria)

  const produtosEmFalta = produtos.filter(p => p.quantidade < p.minimo)
  const produtosCriticos = produtos.filter(p => p.quantidade === 0 || p.quantidade < p.minimo * 0.5)

  const valorTotalEstoque = produtos.reduce((acc, p) => acc + (p.quantidade * p.preco), 0)

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Estoque</h1>
        <p className="text-gray-400">Gerencie o inventário de produtos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-[#00FF00]" />
            <p className="text-sm text-gray-400">Total de Produtos</p>
          </div>
          <p className="text-2xl font-bold text-white">{produtos.length}</p>
        </div>

        <div className="bg-[#0D0D0D] border border-yellow-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <p className="text-sm text-gray-400">Em Falta</p>
          </div>
          <p className="text-2xl font-bold text-yellow-500">{produtosEmFalta.length}</p>
        </div>

        <div className="bg-[#0D0D0D] border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-sm text-gray-400">Críticos</p>
          </div>
          <p className="text-2xl font-bold text-red-500">{produtosCriticos.length}</p>
        </div>

        <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-[#00FF00]" />
            <p className="text-sm text-gray-400">Valor Total</p>
          </div>
          <p className="text-2xl font-bold text-white">R$ {valorTotalEstoque.toFixed(0)}</p>
        </div>
      </div>

      {/* Alertas */}
      {produtosCriticos.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h3 className="font-bold text-red-500">Produtos em Nível Crítico</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {produtosCriticos.map(p => (
              <span key={p.id} className="px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-sm">
                {p.nome} ({p.quantidade}{p.unidade})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            onClick={() => setFiltroCategoria(categoria)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              filtroCategoria === categoria
                ? "bg-gradient-to-r from-[#00FF00] to-[#009900] text-black"
                : "bg-[#1A1A1A] text-gray-400 hover:text-white border border-[#2A2A2A] hover:border-[#00FF00]/30"
            }`}
          >
            {categoria === "all" ? "Todas" : categoria}
          </button>
        ))}
      </div>

      {/* Lista de Produtos */}
      <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1A1A1A]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Produto</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Categoria</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Quantidade</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Mínimo</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Preço Unit.</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Fornecedor</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-400">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]">
              {produtosFiltrados.map((produto) => {
                const emFalta = produto.quantidade < produto.minimo
                const critico = produto.quantidade === 0 || produto.quantidade < produto.minimo * 0.5

                return (
                  <tr key={produto.id} className="hover:bg-[#1A1A1A]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          critico ? "bg-red-500/20" : emFalta ? "bg-yellow-500/20" : "bg-[#00FF00]/20"
                        }`}>
                          <Package className={`w-5 h-5 ${
                            critico ? "text-red-500" : emFalta ? "text-yellow-500" : "text-[#00FF00]"
                          }`} />
                        </div>
                        <span className="font-medium text-white">{produto.nome}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{produto.categoria}</td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${
                        critico ? "text-red-500" : emFalta ? "text-yellow-500" : "text-white"
                      }`}>
                        {produto.quantidade} {produto.unidade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{produto.minimo} {produto.unidade}</td>
                    <td className="px-6 py-4 text-white">R$ {produto.preco.toFixed(2)}</td>
                    <td className="px-6 py-4 text-gray-400">{produto.fornecedor}</td>
                    <td className="px-6 py-4">
                      {critico ? (
                        <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-xs font-medium">
                          Crítico
                        </span>
                      ) : emFalta ? (
                        <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-xs font-medium">
                          Baixo
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-[#00FF00]/20 text-[#00FF00] text-xs font-medium">
                          OK
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => ajustarQuantidade(produto.id, -1)}
                          className="p-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-red-500/50 transition-all"
                        >
                          <Minus className="w-4 h-4 text-gray-400 hover:text-red-500" />
                        </button>
                        <button
                          onClick={() => ajustarQuantidade(produto.id, 1)}
                          className="p-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#00FF00]/50 transition-all"
                        >
                          <Plus className="w-4 h-4 text-gray-400 hover:text-[#00FF00]" />
                        </button>
                        <button
                          onClick={() => {
                            setProdutoSelecionado(produto)
                            setMostrarModal(true)
                          }}
                          className="p-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#00FF00]/50 transition-all"
                        >
                          <Edit className="w-4 h-4 text-gray-400 hover:text-[#00FF00]" />
                        </button>
                        <button
                          onClick={() => removerProduto(produto.id)}
                          className="p-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-red-500/50 transition-all"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {produtosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">Nenhum produto encontrado nesta categoria</p>
        </div>
      )}

      {/* Modal de Edição */}
      {mostrarModal && produtoSelecionado && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setMostrarModal(false)
            setProdutoSelecionado(null)
          }}
        >
          <div
            className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-6">Editar Produto</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Nome</label>
                <input
                  type="text"
                  value={produtoSelecionado.nome}
                  className="w-full px-4 py-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-white focus:outline-none focus:border-[#00FF00]"
                  onChange={(e) => setProdutoSelecionado({ ...produtoSelecionado, nome: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Quantidade</label>
                <input
                  type="number"
                  value={produtoSelecionado.quantidade}
                  className="w-full px-4 py-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-white focus:outline-none focus:border-[#00FF00]"
                  onChange={(e) => setProdutoSelecionado({ ...produtoSelecionado, quantidade: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Preço Unitário</label>
                <input
                  type="number"
                  step="0.01"
                  value={produtoSelecionado.preco}
                  className="w-full px-4 py-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-white focus:outline-none focus:border-[#00FF00]"
                  onChange={(e) => setProdutoSelecionado({ ...produtoSelecionado, preco: parseFloat(e.target.value) })}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => {
                    setProdutos(produtos.map(p => 
                      p.id === produtoSelecionado.id ? produtoSelecionado : p
                    ))
                    setMostrarModal(false)
                    setProdutoSelecionado(null)
                  }}
                  className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-[#00FF00] to-[#009900] text-black font-medium hover:from-[#00FF00] hover:to-[#00FF00] transition-all"
                >
                  Salvar
                </button>
                <button
                  onClick={() => {
                    setMostrarModal(false)
                    setProdutoSelecionado(null)
                  }}
                  className="flex-1 px-4 py-3 rounded-lg bg-[#1A1A1A] text-white font-medium hover:bg-[#2A2A2A] transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

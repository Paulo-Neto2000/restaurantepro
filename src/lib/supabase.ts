import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export type Database = {
  public: {
    Tables: {
      mesas: {
        Row: {
          id: number
          capacidade: number
          status: 'disponivel' | 'ocupada' | 'reservada'
          cliente: string | null
          tempo: string | null
          valor: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          capacidade: number
          status?: 'disponivel' | 'ocupada' | 'reservada'
          cliente?: string | null
          tempo?: string | null
          valor?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          capacidade?: number
          status?: 'disponivel' | 'ocupada' | 'reservada'
          cliente?: string | null
          tempo?: string | null
          valor?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      pedidos: {
        Row: {
          id: number
          mesa_id: number
          items: any
          valor_total: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          mesa_id: number
          items: any
          valor_total: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          mesa_id?: number
          items?: any
          valor_total?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      funcionarios: {
        Row: {
          id: string
          nome: string
          cargo: string
          status: 'ativo' | 'folga' | 'ferias'
          horas_trabalhadas: number
          desempenho: number
          salario: string
          data_admissao: string
          telefone: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          cargo: string
          status?: 'ativo' | 'folga' | 'ferias'
          horas_trabalhadas?: number
          desempenho?: number
          salario: string
          data_admissao: string
          telefone: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          cargo?: string
          status?: 'ativo' | 'folga' | 'ferias'
          horas_trabalhadas?: number
          desempenho?: number
          salario?: string
          data_admissao?: string
          telefone?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

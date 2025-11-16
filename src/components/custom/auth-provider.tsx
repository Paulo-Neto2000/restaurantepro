"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Verifica se está na página de login
    if (pathname === "/login") return

    // Verifica autenticação
    const isAuthenticated = localStorage.getItem("authenticated")
    
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [pathname, router])

  return <>{children}</>
}

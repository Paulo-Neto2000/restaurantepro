import { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: ReactNode
  trend?: ReactNode
}

export function StatCard({ title, value, change, changeType = "neutral", icon, trend }: StatCardProps) {
  const changeColors = {
    positive: "text-[#00FF00]",
    negative: "text-red-500",
    neutral: "text-gray-400"
  }

  return (
    <div className="group relative bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl p-6 hover:border-[#00FF00]/50 transition-all duration-300 overflow-hidden">
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00FF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] group-hover:border-[#00FF00]/50 transition-all duration-300">
            {icon}
          </div>
          {change && (
            <span className={`text-sm font-medium ${changeColors[changeType]}`}>
              {change}
            </span>
          )}
        </div>

        <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
        <p className="text-3xl font-bold text-white mb-2">{value}</p>
        
        {trend && (
          <div className="mt-4">
            {trend}
          </div>
        )}
      </div>
    </div>
  )
}

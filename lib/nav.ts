import {
  LayoutDashboard,
  MessageSquareText,
  LayoutGrid,
  Tag,
  MapPin,
  Radar,
  Bookmark,
  Settings,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Ask Nazar", href: "/ask", icon: MessageSquareText },
  { label: "Opportunities", href: "/opportunities", icon: LayoutGrid },
  { label: "Categories", href: "/categories", icon: Tag },
  { label: "Cities", href: "/cities", icon: MapPin },
  { label: "Evidence", href: "/evidence", icon: Radar },
  { label: "Saved Insights", href: "/saved", icon: Bookmark },
  { label: "Settings", href: "/settings", icon: Settings },
]

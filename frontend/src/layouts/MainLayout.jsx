import { Outlet } from "react-router-dom"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

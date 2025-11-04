
function Layout({ children }: { children: React.ReactNode }) {
    
  return (
    <div className="container bg-white max-w-7xl mx-auto px-7 md:px-19 py-10">
      {children}
    </div>
  )
}

export default Layout;
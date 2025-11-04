
const Footer = () => {

  const actualYear: number = new Date().getFullYear()

  return (
    <div className="border-t-1 border-gray-300 mt-10 pt-6 text-center">
      Trendovo.cz @ {actualYear}
    </div>
  )
}

export default Footer

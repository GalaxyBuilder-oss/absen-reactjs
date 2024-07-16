const Footer = () => {

  const copyYear = new Date().getFullYear()

  return (
    <footer className="w-[96vw] h-[10vh] flex items-center justify-center mx-2 bg-green-600 text-white p-4 rounded-b-lg font-light transition-all">
      &copy; {copyYear.toString().match("2024") ? "2024" : "2024 - " + copyYear} - Div Kerohanian. All rights reserved
    </footer>
  )
}

export default Footer
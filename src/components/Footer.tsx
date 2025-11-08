import { FaFacebook, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";


const Footer = () => {

  const actualYear: number = new Date().getFullYear()

  return (
    <div className="border-t border-gray-300 bg-white px-16 py-20 mt-10 text-gray-500 text-sm">

      <div className="flex justify-between mx-20">
        <div className="flex flex-col space-y-2">
          <div className="uppercase font-semibold mb-2">Company</div>
          <a href="">About</a>
          <a href="">Careers</a>
          <a href="">Press</a>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="uppercase font-semibold mb-2">Suppoert</div>
          <a href="">Contact Us</a>
          <a href="">FAQs</a>
          <a href="">Shipping & Returns</a>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="uppercase font-semibold mb-2">Legal</div>
          <a href="">Privacy Policy</a>
          <a href="">Terms of Service</a>
        </div>
        <div>
          <div className="uppercase font-semibold mb-3">Follow us</div>
          <div className="flex gap-x-5 text-2xl">
            <a href=""><FaFacebook /></a>
            <a href=""><FaTwitter /></a>
            <a href=""><AiFillInstagram /></a>
          </div>
        </div>
      </div>

      <div className="text-center pt-8 mt-12 border-t border-gray-300">
        Trendovo.cz @{actualYear}. All rights reserved.
      </div>
    </div>
  )
}

export default Footer

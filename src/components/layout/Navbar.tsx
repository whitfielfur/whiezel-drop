import { Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
// import { useCart } from "../context/CartContext";
import { useCart } from "../../App";


const MENU_ITEMS = [
  { label: "DROP 01", href: "#drop" },
  { label: "MANIFESTO", href: "#manifesto" },
  { label: "ARCHIVE", href: "#archive" },
  { label: "CONTACT", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  return (
    <>

      <div className="fixed top-6 left-6 z-50 mix-blend-difference text-concrete md:text-asphalt md:mix-blend-normal">
        <h1 className="font-display font-bold text-4xl tracking-tighter uppercase leading-none">
          Whiezel
          <span className="block text-xs font-mono font-normal tracking-widest opacity-70">
            EST. 2025
          </span>
        </h1>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 right-6 z-50 p-2 bg-asphalt text-concrete border-2 border-transparent active:border-acid"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <nav className="hidden md:flex fixed top-10 right-10 z-40 flex-col items-end gap-0">

        <div className="group border-2 border-asphalt bg-white px-6 py-2 mb-4 hover:bg-acid transition-colors cursor-pointer flex items-center gap-2 select-none active:translate-y-1">
           <ShoppingBag size={18} className="group-hover:fill-asphalt transition-colors" />
           <span className="font-mono font-bold">CART ({cart.length})</span>
        </div>

        {MENU_ITEMS.map((item, idx) => (
          <a
            key={item.label}
            href={item.href}
            className="group relative flex items-center justify-end w-64 border-b-2 border-asphalt/20 hover:border-asphalt bg-concrete/50 backdrop-blur-sm py-3 px-4 transition-all hover:bg-white hover:pl-8"
          >
            <span className="font-display font-bold text-xl uppercase tracking-tight group-hover:text-blurple transition-colors">
              {item.label}
            </span>
            <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-4 transition-all duration-300">
              ↗
            </span>
            <span className="absolute left-2 text-[10px] text-asphalt/40 font-mono">
              0{idx + 1}
            </span>
          </a>
        ))}
      </nav>

      <div className={clsx(
        "fixed inset-0 bg-asphalt z-40 transition-transform duration-500 md:hidden flex flex-col justify-center items-center gap-8",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>

         <div className="flex items-center gap-2 text-acid font-mono text-xl mb-4 border-b border-acid pb-2">
            <ShoppingBag /> CART ({cart.length})
         </div>

         {MENU_ITEMS.map((item) => (
           <a 
             key={item.label} 
             href={item.href}
             onClick={() => setIsOpen(false)}
             className="text-concrete font-display text-5xl uppercase hover:text-acid"
           >
             {item.label}
           </a>
         ))}
      </div>
    </>
  );
};
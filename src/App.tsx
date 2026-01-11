import { GridBackground } from "./components/layout/GridBackground";
import { Navbar } from "./components/layout/Navbar";
import { Catalog } from "./components/sections/Catalog";
import { Marquee } from "./components/ui/Marquee";
import { WireframeGlobe } from "./components/ui/WireframeGlobe";
import { Footer } from "./components/layout/Footer";
import { ArrowDownRight, Globe, ShieldCheck } from "lucide-react";
import { createContext, useContext, useState, type ReactNode } from "react"; // Vercel is arguing about that type thingy.

type Product = {
  id: string;
  name: string;
  price: number;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

function App() {
  return (
    <div className="relative min-h-screen bg-concrete text-asphalt selection:bg-acid selection:text-asphalt">
      <GridBackground />
      <div className="noise-bg" />
      
      <div className="fixed top-0 left-0 w-full flex justify-between px-4 py-1 text-[10px] font-mono border-b border-asphalt/20 z-50 bg-concrete/80 backdrop-blur-sm">
        <div className="flex gap-4">
          <span>LAT: 52.5200° N</span>
          <span>LNG: 13.4050° E</span>
        </div>
        <div>WHIEZEL_V4.0 // BUILD_2026</div>
      </div>

      <CartProvider>
        <Navbar />
        
        <main className="relative z-10 pt-24 pb-20">
          <div className="w-full px-4 md:px-8 max-w-[100rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-7 relative">
              <div className="absolute -top-12 left-0 opacity-50">
                <div className="flex items-end gap-[2px] h-8">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="bg-asphalt w-[2px]" style={{ height: `${Math.random() * 100}%` }} />
                  ))}
                </div>
                <span className="text-[10px] font-mono tracking-[0.3em]">88092-X</span>
              </div>

              <h1 className="font-display text-[5rem] md:text-[9rem] leading-[0.85] font-bold uppercase tracking-tighter">
                Whiezel <br />
                <span className="relative inline-block">
                  Arch_<span className="text-stroke-2 hover:text-acid transition-all duration-300">Wear</span>
                  <span className="absolute -top-4 -right-8 text-2xl font-mono text-asphalt font-normal">™</span>
                </span>
              </h1>

              <div className="mt-8 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-64 text-sm font-mono border-l-2 border-asphalt pl-4 text-justify">
                  <p className="mb-2 font-bold">[MISSION STATEMENT]</p>
                  Structured chaos. Industrial aesthetics met with high-grade fabrics. Designed in Berlin, shipped to the Metaverse.
                </div>
                
                <button className="group relative px-8 py-6 bg-asphalt text-concrete font-display text-xl uppercase tracking-widest overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2 group-hover:gap-4 transition-all">
                    Access Collection <ArrowDownRight />
                  </span>
                  <div className="absolute inset-0 bg-acid translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-asphalt z-20" />
                  <span className="absolute bottom-1 right-1 text-[10px] text-concrete group-hover:text-asphalt z-20 font-mono">
                    SECURE_LINK
                  </span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center items-center py-10 lg:py-0">
              <div className="absolute inset-0 border border-asphalt/10 pointer-events-none">
                <div className="absolute top-0 left-0 border-l-2 border-t-2 border-asphalt w-4 h-4" />
                <div className="absolute top-0 right-0 border-r-2 border-t-2 border-asphalt w-4 h-4" />
                <div className="absolute bottom-0 left-0 border-l-2 border-b-2 border-asphalt w-4 h-4" />
                <div className="absolute bottom-0 right-0 border-r-2 border-b-2 border-asphalt w-4 h-4" />
              </div>
              <WireframeGlobe />
            </div>
          </div>

          <div className="my-20 transform -rotate-1 scale-105 overflow-hidden">
            <div className="relative">
              <Marquee text="Limited Drop // Global Shipping // Heavyweight Cotton //" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 border-y-2 border-asphalt divide-x-2 divide-asphalt">
            {[
              { title: "WORLDWIDE", icon: <Globe />, code: "GLB-01" },
              { title: "SECURE PAY", icon: <ShieldCheck />, code: "SEC-99" },
              { title: "HEAVY COTTON", icon: <div className="font-display font-bold text-xl">400</div>, code: "GSM-WT" },
              { title: "LIMITED", icon: <div className="font-display font-bold text-xl">500</div>, code: "QTY-MAX" }
            ].map((item) => (
              <div key={item.code} className="p-8 flex flex-col justify-between h-40 hover:bg-white transition-colors group cursor-crosshair">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs opacity-50">{item.code}</span>
                  <div className="text-asphalt group-hover:scale-110 transition-transform">{item.icon}</div>
                </div>
                <span className="font-display text-xl font-bold uppercase tracking-tight">{item.title}</span>
              </div>
            ))}
          </div>

          <Catalog />
        </main>
        
        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;

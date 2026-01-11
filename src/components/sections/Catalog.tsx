import { useState } from "react";
import { Plus, Maximize2, Filter, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../App";


import hoodieImg from "../../assets/products/hoodie.jpg";
import cargoImg from "../../assets/products/cargo.jpg";
import teeImg from "../../assets/products/tee.jpg";
import beltImg from "../../assets/products/belt.jpg";

type ProductSpec = { material: string; weight: string; fit: string };
type Product = {
  id: string;
  sku: string;
  name: string;
  price: number;
  image: string;
  specs: ProductSpec;
};

const PRODUCTS: Product[] = [
  {
    id: "1",
    sku: "W-HOOD-01",
    name: "Structure Hoodie",
    price: 180,
    image: hoodieImg,
    specs: { material: "Cotton French Terry", weight: "500 GSM", fit: "Oversized" }
  },
  {
    id: "2",
    sku: "W-PANT-04",
    name: "Modular Cargo",
    price: 220,
    image: cargoImg,
    specs: { material: "Tech Ripstop", weight: "N/A", fit: "Loose" }
  },
  {
    id: "3",
    sku: "W-TEE-99",
    name: "Glitch Tee v2",
    price: 65,
    image: teeImg,
    specs: { material: "Organic Cotton", weight: "280 GSM", fit: "Boxy" }
  },
  {
    id: "4",
    sku: "W-ACC-22",
    name: "Safety Belt",
    price: 45,
    image: beltImg,
    specs: { material: "Nylon Webbing", weight: "Heavy", fit: "Adjustable" }
  },
];

const ProductCard = ({ product, setActiveImage }: { product: Product, setActiveImage: (img: string) => void }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <div className="group relative bg-white flex flex-col h-full hover:z-10">
      <div className="flex justify-between items-center p-2 border-b border-asphalt/10 text-[10px] font-mono text-asphalt/50">
        <span>{product.sku}</span>
        <span className="group-hover:text-acid group-hover:bg-asphalt px-1 transition-colors">IN STOCK</span>
      </div>

      <div 
        className="relative aspect-square overflow-hidden border-b border-asphalt/10 cursor-zoom-in"
        onClick={() => setActiveImage(product.image)}
      >
        <div className="absolute inset-0 bg-acid mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10" />
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <button className="absolute bottom-4 right-4 bg-white border-2 border-asphalt p-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20 hover:bg-asphalt hover:text-acid cursor-pointer pointer-events-none">
          <Maximize2 size={16} />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow justify-between gap-4">
        <div>
          <h3 className="font-display text-3xl uppercase leading-none mb-2 group-hover:underline decoration-4 decoration-acid underline-offset-4">
            {product.name}
          </h3>
          <div className="grid grid-cols-2 gap-y-1 text-[10px] font-mono text-asphalt/60 mt-4 border-l-2 border-acid pl-3">
             <span>MAT:</span> <span className="text-asphalt">{product.specs.material}</span>
             <span>WGT:</span> <span className="text-asphalt">{product.specs.weight}</span>
             <span>FIT:</span> <span className="text-asphalt">{product.specs.fit}</span>
          </div>
        </div>
        <div className="flex justify-between items-end mt-4 pt-4 border-t-2 border-dashed border-asphalt/20">
          <span className="font-display text-2xl font-bold">${product.price}.00</span>

          <button 
            onClick={handleAdd}
            disabled={isAdded}
            className={`flex items-center gap-2 font-mono text-xs font-bold uppercase px-3 py-2 border border-asphalt transition-all cursor-pointer 
              ${isAdded ? "bg-acid text-asphalt border-acid" : "bg-concrete hover:bg-asphalt hover:text-acid"}`}
          >
            {isAdded ? <Check size={14} /> : <Plus size={14} />} 
            {isAdded ? "ADDED" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const Catalog = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <>
      <section id="catalog" className="relative py-20 px-4 md:px-8 max-w-[100rem] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-4 border-asphalt pb-4">
          <div>
            <h2 className="font-display text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
              Archive <span className="text-acid">/</span> 2025
            </h2>
            <p className="font-mono text-sm mt-2 opacity-60">
              /// SELECT ITEM TO INITIALIZE PURCHASE PROTOCOL
            </p>
          </div>
          <div className="flex gap-4 mt-8 md:mt-0 font-mono text-xs">
            <button className="flex items-center gap-2 bg-asphalt text-concrete px-4 py-2 hover:bg-acid hover:text-asphalt transition-colors uppercase">
              <Filter size={12} /> Filter: All
            </button>
            <button className="border-2 border-asphalt px-4 py-2 uppercase hover:bg-asphalt hover:text-white transition-colors">
              View: Grid
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-asphalt border-2 border-asphalt">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} setActiveImage={setActiveImage} />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-asphalt/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative border-2 border-concrete p-1">
                <div className="absolute top-0 left-0 bg-acid text-asphalt text-[10px] font-mono px-2 py-1 font-bold z-10">
                  VIEWING_ARTIFACT: IMG_RAW
                </div>
                <img src={activeImage} alt="Zoomed Product" className="max-h-[85vh] w-auto object-contain" />
                <button onClick={() => setActiveImage(null)} className="absolute -top-12 right-0 md:-right-12 text-concrete hover:text-acid transition-colors cursor-pointer">
                  <X size={40} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
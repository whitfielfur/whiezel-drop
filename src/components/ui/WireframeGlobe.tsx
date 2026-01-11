import { motion } from "framer-motion";

export const WireframeGlobe = () => {
  return (
    <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative w-full h-full"
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={`lat-${i}`}
            className="absolute inset-0 border border-asphalt/40 rounded-full"
            style={{
              transform: `rotateX(${i * 30}deg)`,
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={`long-${i}`}
            className="absolute inset-0 border border-asphalt/40 rounded-full"
            style={{
              transform: `rotateY(${i * 30}deg)`,
            }}
          />
        ))}
        
        <div className="absolute inset-0 border-2 border-acid rounded-full rotate-45 scale-105" />
      </motion.div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-asphalt" />
      <div className="absolute top-0 right-0 font-mono text-xs bg-asphalt text-concrete px-1">
        FIG. 01-A
      </div>
    </div>
  );
};
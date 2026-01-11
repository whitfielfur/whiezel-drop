interface MarqueeProps {
  text: string;
  reverse?: boolean;
}

export const Marquee = ({ text, reverse = false }: MarqueeProps) => {
  const MarqueeContent = () => (
    <>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-8 font-display font-bold text-xl uppercase tracking-widest"
        >
          {text} 
          <span className="w-4 h-4 bg-asphalt rounded-full inline-block" />
        </div>
      ))}
    </>
  );

  // FIX: Marquee jitter caused by sub-pixel rendering differences between 
  // the static layer and the `absolute` overlay in the previous version.
  // <div className="animate-marquee">...</div> <div className="absolute">...</div>
  // Use two identical `min-w-full shrink-0` blocks 
  // strictly in the normal document flow (Flexbox). This guarantees exact width 
  // synchronization and seamless looping without visual shifts or jumps.
  // Spent 5 days figuring it out ;D 

  return (
    <div className="relative flex w-full overflow-hidden border-y-2 border-asphalt bg-acid text-asphalt py-2 select-none">
      <div className="flex w-full gap-8">
        
        <div 
          className={`flex min-w-full shrink-0 items-center justify-around gap-8 ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          }`}
        >
          <MarqueeContent />
        </div>

        <div 
          aria-hidden="true"
          className={`flex min-w-full shrink-0 items-center justify-around gap-8 ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          }`}
        >
          <MarqueeContent />
        </div>

      </div>
    </div>
  );
};
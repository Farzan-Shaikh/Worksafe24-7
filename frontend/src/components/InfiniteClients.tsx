import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Client {
  title: string;
  image: string;
}

interface InfiniteClientsProps {
  clients: Client[];
}

const InfiniteClients = ({ clients }: InfiniteClientsProps) => {
  const trackRef1 = useRef<HTMLDivElement>(null);
  const trackRef2 = useRef<HTMLDivElement>(null);

  // calculate real width for both tracks
  useEffect(() => {
    const updateWidth = (track: HTMLDivElement | null) => {
      if (!track) return;
      const totalWidth = track.scrollWidth;
      track.style.setProperty("--scroll-distance", `-${totalWidth / 2}px`);
    };

    updateWidth(trackRef1.current);
    updateWidth(trackRef2.current);
  }, [clients]);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 border-t border-black-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-red-600">Clients</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted by leading organizations across industries
          </p>
        </motion.div>

        {/* Infinite Scroller */}
        <style>
          {`
            @keyframes marquee-ltr {
              0% { transform: translateX(0); }
              100% { transform: translateX(var(--scroll-distance)); }
            }

            @keyframes marquee-rtl {
              0% { transform: translateX(var(--scroll-distance)); }
              100% { transform: translateX(0); }
            }

            .marquee-ltr {
              animation: marquee-ltr var(--speed, 20s) linear infinite;
              will-change: transform;
            }

            .marquee-rtl {
              animation: marquee-rtl var(--speed, 20s) linear infinite;
              will-change: transform;
            }

            .logo-card {
              transition: transform 0.3s ease, filter 0.3s ease;
            }
            .logo-card:hover {
              transform: scale(1.12);
              filter: drop-shadow(0 8px 16px rgba(0,0,0,0.18));
            }
          `}
        </style>

        {/* Top row → left to right */}
        <div className="overflow-hidden mb-10">
          <div
            ref={trackRef1}
            className="marquee-ltr flex gap-8 md:gap-12"
            style={{ "--speed": "20s" } as React.CSSProperties}
          >
            {[...clients, ...clients].map((client, idx) => (
              <div
                key={`ltr-${idx}`}
                className="logo-card flex-shrink-0 w-40 h-28 sm:w-48 sm:h-32 md:w-56 md:h-36 flex items-center justify-center bg-white rounded-xl shadow-md border border-gray-100 p-5"
              >
                <img
                  src={client.image}
                  alt={client.title}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row → right to left */}
        <div className="overflow-hidden">
          <div
            ref={trackRef2}
            className="marquee-rtl flex gap-8 md:gap-12"
            style={{ "--speed": "20s" } as React.CSSProperties}
          >
            {[...clients, ...clients].map((client, idx) => (
              <div
                key={`rtl-${idx}`}
                className="logo-card flex-shrink-0 w-40 h-28 sm:w-48 sm:h-32 md:w-56 md:h-36 flex items-center justify-center bg-white rounded-xl shadow-md border border-gray-100 p-5"
              >
                <img
                  src={client.image}
                  alt={client.title}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfiniteClients;

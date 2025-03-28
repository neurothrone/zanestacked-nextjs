import { orbitron } from "@/src/ui/fonts";

const ZaneHero = () => {
  return (
    <section
      className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <h1 className={`${orbitron.className} text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in`}>
        ZaneStacked
      </h1>
      <p className={`text-xl md:text-2xl text-gray-300 max-w-2xl animate-fade-in delay-100`}>
        A futuristic, comedic, and technically over-engineered full-stack portfolio.
      </p>
    </section>
  );
}

export default ZaneHero;

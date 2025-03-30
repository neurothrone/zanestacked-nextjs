import { orbitron } from "@/src/ui/fonts";

const ZaneHero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-4">
      <h1 className={`${orbitron.className} text-5xl md:text-6xl font-extrabold text-white mb-4 animate-fade-in`}>
        ZaneStacked<span className="text-violet-500">()</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl animate-fade-in delay-100">
        A futuristic, comedic, and technically over-engineered full-stack portfolio.
      </p>
    </section>
  );
}

export default ZaneHero;

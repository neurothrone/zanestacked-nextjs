import { orbitron } from "@/src/ui/fonts";

const SectionTitle = ({ text }: { text: string }) => {
  return (
    <h2 className={`${orbitron.className} text-3xl uppercase font-bold text-white text-center mb-6`}>
      {text}
    </h2>
  );
};

export default SectionTitle;

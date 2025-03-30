import { FaGithub, FaLinkedin } from "react-icons/fa";
import PrimaryButton from "@/src/ui/components/public/PrimaryButton";

const SocialLinks = () => {
  return (
    <div className="flex justify-center gap-4 md:gap-6 py-8 border-y border-violet-900">
      <PrimaryButton href="https://github.com/neurothrone">
        <FaGithub className="inline mr-2 -mt-0.5"/>
        GitHub
      </PrimaryButton>
      <PrimaryButton href="https://linkedin.com/in/neurothrone">
        <FaLinkedin className="inline mr-2 -mt-0.5"/>
        LinkedIn
      </PrimaryButton>
    </div>
  );
};

export default SocialLinks;

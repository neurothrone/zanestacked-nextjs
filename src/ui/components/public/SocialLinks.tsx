import { FaGithub, FaLinkedin } from "react-icons/fa";
import PrimaryButton from "@/src/ui/components/public/PrimaryButton";

const SocialLinks = () => {
  return (
    <div className="flex justify-center gap-4 py-6 border-y border-violet-900">
      <PrimaryButton href="https://github.com/neurothrone">
        <FaGithub className="inline mr-2 -mt-0.5"/>
        <span className="text-base">GitHub</span>
      </PrimaryButton>
      <PrimaryButton href="https://linkedin.com/in/neurothrone">
        <FaLinkedin className="inline mr-2 -mt-0.5"/>
        <span className="text-base">LinkedIn</span>
      </PrimaryButton>
    </div>
  );
};

export default SocialLinks;

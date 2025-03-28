interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
}

const PrimaryButton = ({ href, children }: PrimaryButtonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-6 py-3 m-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg transition duration-200"
    >
      {children}
    </a>
  );
}

export default PrimaryButton;

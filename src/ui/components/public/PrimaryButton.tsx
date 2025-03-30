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
      className="inline-block px-6 py-3 m-2 text-sm font-semibold text-white bg-violet-700 hover:bg-violet-600 rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
    >
      {children}
    </a>
  );
}

export default PrimaryButton;

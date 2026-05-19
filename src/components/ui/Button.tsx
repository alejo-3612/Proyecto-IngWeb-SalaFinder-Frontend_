type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  children,
  onClick,
  fullWidth = false,
  disabled = false,
  variant = "primary",
  type = "button",
}: Props) {
  return (
    <button
      type={type}
      className={`
        inline-flex items-center cursor-pointer justify-center gap-2
        ${fullWidth ? "w-full" : ""}
        px-3 py-2 text-sm font-medium rounded-md transition
        focus:ring-2 focus:ring-brand-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${
          variant === "primary"
            ? "bg-brand-600 text-white border border-brand-700 hover:bg-brand-700"
            : variant === "secondary"
            ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            : "bg-white text-red-600 border border-red-400 hover:bg-red-50"
        }
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

type BadgeProps = {
  children: React.ReactNode;
  variant?: "success" | "danger" | "warning" | "neutral";
};

export function Badge({ children, variant = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium
        ${
          variant === "success"
            ? "border-green-300 text-green-700 bg-green-50"
            : variant === "danger"
            ? "border-red-300 text-red-700 bg-red-50"
            : variant === "warning"
            ? "border-yellow-300 text-yellow-700 bg-yellow-50"
            : "border-gray-200 text-gray-600 bg-gray-50"
        }`}
    >
      {children}
    </span>
  );
}

type StateMessageProps = {
  title: string;
  type: "empty" | "loading" | "error";
  description?: string;
  actionText?: string;
  onAction?: () => void;
};

export function StateMessage({ title, type, description, actionText, onAction }: StateMessageProps) {
  return (
    <div className="rounded-lg border border-dashed border-gray-200 bg-white p-6 text-center">
      <p className="text-2xl mb-2">
        {type === "error" ? "⚠️" : type === "loading" ? "⏳" : "📭"}
      </p>
      <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      {actionText && onAction && (
        <button
          className="mt-3 text-sm text-brand-600 hover:underline"
          onClick={onAction}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

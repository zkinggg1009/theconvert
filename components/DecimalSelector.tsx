type DecimalSelectorProps = {
  value: number;
  options: number[];
  onChange: (nextValue: number) => void;
};

export default function DecimalSelector({
  value,
  options,
  onChange,
}: DecimalSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option === value;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={[
              "h-9 min-w-9 rounded-full border px-3 text-sm font-medium transition-all duration-200",
              isActive
                ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] shadow-[0_1px_0_rgba(0,0,0,0.03)]"
                : "border-[var(--border)] bg-[var(--panel)] text-[var(--foreground)] hover:border-[var(--border-strong)] hover:bg-[var(--surface)]",
            ].join(" ")}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";

type ButtonKind = "utility" | "operator" | "digit" | "equals";

type CalculatorButton = {
  label: string;
  kind: ButtonKind;
  span?: string;
};

type CalculatorProps = {
  initialValue?: string;
  onUseResult?: (value: string) => void;
  onClose?: () => void;
};

const calculatorButtons: CalculatorButton[][] = [
  [
    { label: "AC", kind: "utility" },
    { label: "±", kind: "utility" },
    { label: "%", kind: "utility" },
    { label: "÷", kind: "operator" },
  ],
  [
    { label: "7", kind: "digit" },
    { label: "8", kind: "digit" },
    { label: "9", kind: "digit" },
    { label: "×", kind: "operator" },
  ],
  [
    { label: "4", kind: "digit" },
    { label: "5", kind: "digit" },
    { label: "6", kind: "digit" },
    { label: "−", kind: "operator" },
  ],
  [
    { label: "1", kind: "digit" },
    { label: "2", kind: "digit" },
    { label: "3", kind: "digit" },
    { label: "+", kind: "operator" },
  ],
  [
    { label: "0", kind: "digit", span: "col-span-2" },
    { label: ".", kind: "digit" },
    { label: "=", kind: "equals" },
  ],
];

const normalizeExpression = (value: string) =>
  value
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/%/g, "/100");

const formatResult = (value: number) => {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  const rounded = Number(value.toFixed(10));
  return Number.isInteger(rounded) ? String(rounded) : rounded.toString();
};

const evaluateExpression = (expression: string) => {
  const cleaned = expression.replace(/\s+/g, "").trim();

  if (!cleaned) {
    return null;
  }

  const sanitized = normalizeExpression(cleaned);

  if (!/^[0-9+\-*/.()]+$/.test(sanitized)) {
    return null;
  }

  try {
    // eslint-disable-next-line no-new-func
    const evaluated = Function(`"use strict"; return (${sanitized});`)();
    return Number.isFinite(evaluated) ? Number(evaluated) : null;
  } catch {
    return null;
  }
};

export default function Calculator({
  initialValue = "",
  onUseResult,
  onClose,
}: CalculatorProps) {
  const initialExpression = initialValue && initialValue !== "" ? initialValue : "250 ÷ 2";
  const [expression, setExpression] = useState(initialExpression);
  const [result, setResult] = useState(() => {
    const computed = initialValue && initialValue !== "" ? evaluateExpression(initialValue) : 125;
    return computed === null ? "" : formatResult(computed);
  });
  const [lastAction, setLastAction] = useState<"input" | "evaluate">("evaluate");
  const [status, setStatus] = useState("Ready");

  const hasValidResult = useMemo(
    () => Boolean(result && result !== "Error" && result !== ""),
    [result],
  );

  const evaluateCurrentExpression = () => {
    const measured = evaluateExpression(expression);

    if (measured === null) {
      setResult("Error");
      setStatus("Invalid expression");
      return;
    }

    const formatted = formatResult(measured);
    setResult(formatted);
    setStatus("Ready");
    setLastAction("evaluate");
  };

  const handleUseResult = () => {
    const evaluated = evaluateExpression(expression);
    const nextValue = evaluated === null ? null : formatResult(evaluated);

    if (!nextValue || nextValue === "Error") {
      setResult("Error");
      setStatus("Invalid expression");
      return;
    }

    setResult(nextValue);
    onUseResult?.(nextValue);
    onClose?.();
  };

  const appendDigit = (digit: string) => {
    if (lastAction === "evaluate") {
      setExpression(digit);
      setResult("");
      setStatus("Ready");
      setLastAction("input");
      return;
    }

    setExpression((current) => `${current}${digit}`);
    setStatus("Ready");
  };

  const appendDecimal = () => {
    if (lastAction === "evaluate") {
      setExpression("0.");
      setResult("");
      setStatus("Ready");
      setLastAction("input");
      return;
    }

    setExpression((current) => {
      const tokens = current.split(/(?<=[+\-×÷])|(?=[+\-×÷])/g);
      const lastToken = tokens[tokens.length - 1];
      if (lastToken?.includes(".")) {
        return current;
      }
      return `${current}.`;
    });
    setStatus("Ready");
  };

  const appendOperator = (operator: string) => {
    if (lastAction === "evaluate") {
      setExpression(`${result || "0"}${operator}`);
      setResult("");
      setStatus("Ready");
      setLastAction("input");
      return;
    }

    setExpression((current) => {
      if (!current) {
        return "";
      }
      const trimmed = current.trim();
      const operatorChars = ["+", "−", "×", "÷"];
      const lastChar = trimmed.slice(-1);
      if (operatorChars.includes(lastChar)) {
        return `${trimmed.slice(0, -1)}${operator}`;
      }
      return `${trimmed}${operator}`;
    });
    setStatus("Ready");
  };

  const toggleSign = () => {
    const activeValue = lastAction === "evaluate" && result ? result : expression;
    const numeric = Number.parseFloat(activeValue.replace(/[^\d.-]/g, ""));

    if (!Number.isFinite(numeric)) {
      setExpression((current) => (current.startsWith("-") ? current.slice(1) : `-${current || ""}`));
      setStatus("Ready");
      return;
    }

    const nextValue = String(-numeric);
    setExpression((current) => {
      if (lastAction === "evaluate") {
        return nextValue;
      }
      const match = current.match(/-?\d*\.?\d+(?:[eE][-+]?\d+)?$/);
      if (!match) {
        return current.startsWith("-") ? current.slice(1) : `-${current}`;
      }
      return current.slice(0, match.index ?? 0) + nextValue;
    });
    setResult("");
    setLastAction("input");
    setStatus("Ready");
  };

  const applyPercent = () => {
    const calculated = evaluateExpression(expression);
    if (calculated === null) {
      setResult("Error");
      setStatus("Invalid expression");
      return;
    }

    const next = calculated / 100;
    const formatted = formatResult(next);
    setResult(formatted);
    setStatus("Ready");
    setLastAction("evaluate");
  };

  const clearCalculator = () => {
    setExpression("");
    setResult("");
    setStatus("Ready");
    setLastAction("input");
  };

  const renderButton = (button: CalculatorButton, index: number) => {
    const sharedClasses =
      "flex h-14 items-center justify-center rounded-[1.1rem] border text-[1.08rem] font-medium transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:h-16 sm:text-[1.2rem]";

    const baseClass =
      button.kind === "operator"
        ? "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--panel)]"
        : button.kind === "equals"
          ? "border-transparent bg-[var(--foreground)] text-[var(--background)] hover:opacity-95"
          : "border-[var(--border)] bg-[var(--panel)] text-[var(--foreground)] hover:bg-[var(--surface)]";

    const onClick = () => {
      if (button.label === "AC") {
        clearCalculator();
        return;
      }
      if (button.label === "±") {
        toggleSign();
        return;
      }
      if (button.label === "%") {
        applyPercent();
        return;
      }
      if (["+", "−", "×", "÷"].includes(button.label)) {
        appendOperator(button.label);
        return;
      }
      if (button.label === ".") {
        appendDecimal();
        return;
      }
      if (button.label === "=") {
        evaluateCurrentExpression();
        return;
      }
      appendDigit(button.label);
    };

    return (
      <button
        key={`${button.label}-${index}`}
        type="button"
        onClick={onClick}
        className={`${sharedClasses} ${baseClass} ${button.span ?? ""}`}
      >
        {button.label}
      </button>
    );
  };

  return (
    <div className="relative w-full max-w-[28rem] rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[0_18px_48px_rgba(29,29,31,0.05)] sm:p-4">
      {onClose && (
        <button
          type="button"
          aria-label="Close calculator"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel)] text-lg text-[var(--foreground)] transition-colors hover:bg-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        >
          ×
        </button>
      )}

      <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--panel)] p-4 sm:p-5">
        <div className="mb-4 min-h-[6.25rem] overflow-hidden rounded-[1.15rem] border border-[var(--border)] bg-[var(--background)]/35 px-3.5 py-3 text-right sm:min-h-[7rem]">
          <div className="min-h-[1.5rem] overflow-hidden text-ellipsis whitespace-nowrap text-[0.9rem] font-medium tracking-[0.02em] text-[var(--muted)] sm:text-[1rem]">
            {expression || "0"}
          </div>
          <div className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-[2.1rem] font-semibold leading-none tracking-[-0.06em] text-[var(--foreground)] sm:text-[2.6rem]">
            {result || "0"}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          {calculatorButtons.flat().map(renderButton)}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="min-h-[1.25rem] text-[0.7rem] font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
            {status}
          </div>

          <button
            type="button"
            onClick={handleUseResult}
            disabled={!hasValidResult}
            className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
              hasValidResult
                ? "border-[var(--border-strong)] bg-[var(--foreground)] text-[var(--background)] hover:opacity-95"
                : "cursor-not-allowed border-[var(--border)] bg-[var(--panel)] text-[var(--muted)]"
            }`}
          >
            Use Result
          </button>
        </div>
      </div>
    </div>
  );
}

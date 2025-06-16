import React, { useRef } from "react";

type Props = {
  accountNumValue: string;
  onAccountNumValue: (name: string, value: string) => void;
};

export default function AccountNumberField({
  accountNumValue,
  onAccountNumValue,
}: Props) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const parts = accountNumValue?.match(/.{1,4}/g) || ["", "", "", ""];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    e.target.value = value;
    const newParts = [...parts];
    newParts[index] = value;

    onAccountNumValue("accountNumber", newParts.join(""));

    if (value.length === 4 && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const value = e.currentTarget.value;
      if (value.length === 0 && index > 0) {
        e.preventDefault();
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex flex-col">
      <label className="font-bold text-xs text-primary-3 pr-2 mb-2">
        شماره کارت
      </label>

      <div className="w-full flex flex-row-reverse gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={4}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="textField__input !text-center !text-lg"
            inputMode="numeric"
            pattern="\d*"
            placeholder="* * * *"
          />
        ))}
      </div>
    </div>
  );
}

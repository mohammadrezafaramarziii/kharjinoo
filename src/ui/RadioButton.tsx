type RadioButtonProps = {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  label: string;
};

export default function RadioButton({
  id,
  name,
  value,
  onChange,
  checked,
  label,
}: RadioButtonProps) {
  return (
    <label htmlFor={id} className={`flex items-center gap-2`}>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
        hidden={true}
      />
      <div
        className={`w-4 h-4 p-1 flex items-center justify-center rounded-full border ${
          checked ? "border-primary-1" : "border-primary-4"
        }`}
      >
        {checked && (
          <div className="w-full h-full bg-primary-1 rounded-full"></div>
        )}
      </div>
      <div className="text-primary-3 text-sm">{label}</div>
    </label>
  );
}

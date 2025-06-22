type Color = "primary1" | "primary2" | "primary3" | "primary4" | "danger";

type Props = {
  color?: Color;
  width?: number;
};

export default function Loading({ color = "primary1", width = 20 }: Props) {
  const colorRender: Record<Color, string> = {
    primary1: "!stroke-primary-1",
    primary2: "!stroke-primary-2",
    primary3: "!stroke-primary-3",
    primary4: "!stroke-primary-4",
    danger: "!stroke-red-500",
  };

  return (
    <div style={{ width: `${width}px` }} className="loading">
      <svg viewBox="25 25 50 50" xmlns="http://www.w3.org/2000/svg">
        <circle className={colorRender[color]} r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
}

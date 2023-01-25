const ClockCircle = ({ fraction }: { fraction?: number }) => {
  fraction ??= 1;
  const WH = 100;
  const STROKEW = 4;
  const R = WH / 2 - STROKEW / 2;
  const CIRCUMFERENCE = 2 * Math.PI * R;

  const colorToVar = (color: string) => {
    const c = color.split(".");
    if (c.length === 2) {
      return `var(--chakra-colors-${c[0]}-${c[1]})`;
    } else {
      throw new Error(
        'Parameter "color" has to be a valid Chakra UI color (eg. "gray.100")'
      );
    }
  };
  return (
    <svg
      color="red"
      viewBox={`0 0 ${WH} ${WH}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        r={R}
        cx={WH / 2}
        cy={WH / 2}
        fill={"none"}
        stroke={colorToVar("blackAlpha.50")}
        strokeWidth={STROKEW / 2}
      ></circle>
      <circle
        r={R}
        cx={WH / 2}
        cy={WH / 2}
        fill={"none"}
        stroke={colorToVar("teal.500")}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={String(CIRCUMFERENCE - CIRCUMFERENCE * fraction)}
        strokeWidth={STROKEW}
        transform={`rotate(-90 ${WH / 2} ${WH / 2})`}
      ></circle>
    </svg>
  );
};

export { ClockCircle };

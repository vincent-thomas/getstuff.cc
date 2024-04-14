export const Logo = ({ size }: { size: number; color?: true }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 110 97"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 1L33 33.1649V97H0V1Z" fill={palette.solid1} />
      <path d="M37 36L53 50.7417V97H37V36Z" fill={palette.solid1} />
      <path d="M73 36L57 50.7417V97H73V36Z" fill={palette.solid1} />
      <path d="M110 0L77 32.5V97H110V0Z" fill={palette.solid1} />
    </svg>
  );
};

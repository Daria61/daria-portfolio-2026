/** Four-point star used as the logo mark. */
export function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 1.5C13.5 6.5 17.5 10.5 22.5 12C17.5 13.5 13.5 17.5 12 22.5C10.5 17.5 6.5 13.5 1.5 12C6.5 10.5 10.5 6.5 12 1.5Z" />
    </svg>
  );
}

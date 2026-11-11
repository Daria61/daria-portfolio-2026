/** Shared surface for the hero's info cards. */
export function Card({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={`rounded-[28px] border border-cream/10 bg-cream/[0.035] p-6 sm:p-7 ${className}`}
      {...props}
    />
  );
}

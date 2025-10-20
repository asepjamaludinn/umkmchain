export default function LightningIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

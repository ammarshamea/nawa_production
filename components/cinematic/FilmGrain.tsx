type Props = {
  className?: string;
};

export function FilmGrain({ className = "" }: Props) {
  return (
    <div
      className={`film-grain pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    />
  );
}

interface SectionBadgeProps {
  text: string;
  variant?: 'default' | 'white';
}

export default function SectionBadge({ text, variant = 'default' }: SectionBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-[0.1em] ${
        variant === 'white'
          ? 'bg-white text-luilui-primary'
          : 'bg-luilui-peach text-luilui-primary'
      }`}
    >
      {text}
    </span>
  );
}

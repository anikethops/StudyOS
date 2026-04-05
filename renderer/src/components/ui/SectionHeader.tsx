type Props = {
  title: string;
  subtitle?: string;
  label?: string;
};

export default function SectionHeader({ title, subtitle, label }: Props) {
  return (
    <div>
      {label && (
        <p className="text-xs uppercase tracking-[0.3em] text-violet-300/70">
          {label}
        </p>
      )}

      <h1 className="mt-2 text-3xl font-semibold text-white">{title}</h1>

      {subtitle && (
        <p className="mt-2 max-w-2xl text-sm text-slate-400">{subtitle}</p>
      )}
    </div>
  );
}
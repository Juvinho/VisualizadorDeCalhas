interface BotaoDriveProps {
  link: string;
}

export default function BotaoDrive({ link }: BotaoDriveProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-3 text-sm font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-secondary/40 sm:w-auto"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7.17 13.68L3.73 7.72L7.14 1.8L10.58 7.76L7.17 13.68Z" fill="#0F9D58" />
        <path d="M12.02 16.52L8.58 10.56L12.01 4.64L15.45 10.6L12.02 16.52Z" fill="#FFC107" />
        <path d="M16.86 19.36L13.42 13.4L16.85 7.48L20.29 13.44L16.86 19.36Z" fill="#4285F4" />
      </svg>
      Ver mais no Google Drive
    </a>
  );
}

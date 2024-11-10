interface HeaderSubtitleProps {
  header: string;
  subtitle: string;
}

export default function HeaderSubtitle({
  header,
  subtitle
}: HeaderSubtitleProps) {
  return (
    <div className="mt-3 mb-3 lg:mt-0">
      <h2 className="text-2xl lg:text-4xl font-primary mb-3">
        {header}
      </h2>
      <p className="text-sm lg:text-lg font-secondary">
        {subtitle}
      </p>
    </div>
  );
}
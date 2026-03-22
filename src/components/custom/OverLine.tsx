import { Typography } from "../ui/typography";

const OverLine = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 border border-gray-200
     rounded-sm px-4 py-1.5 w-fit ${className || ""}`}
    >
      <span
        className="w-2 h-2 rounded-full bg-emerald-500"
        aria-hidden="true"
      />

      <Typography variant="overline" as="span" className="text-gray-500">
        {label}
      </Typography>
    </div>
  );
};

export default OverLine;

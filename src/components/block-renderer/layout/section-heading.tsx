type Segment = {
  text: string;
  highlight: boolean;
  break?: boolean;
};

type HeadingProps = {
  segments: Segment[];
  className?: string;
  id: string;
  break?: boolean;
};

// export default function HighlightHeading({
//   segments,
//   className,
//   id,
// }: HeadingProps) {
//   if (!segments) return null;
//   return (
//     <h2
//       id={id}
//       className={`text-5xl md:text-6xl font-bold text-gray-900 ${className}`}
//     >
//       {segments?.map((seg, i) =>
//         seg.highlight ? (
//           <span
//             key={i}
//             className="bg-[#E85744] text-white px-4 py-1.5 rounded-sm mr-1 leading-tight"
//           >
//             {seg.text}
//           </span>
//         ) : (
//           <span key={i}>{seg.text}</span>
//         ),
//       )}
//     </h2>
//   );
// }

export default function HighlightHeading({
  segments,
  className,
  id,
}: HeadingProps) {
  if (!segments) return null;

  return (
    <h2
      id={id}
      className={`text-5xl md:text-6xl font-bold text-gray-900 ${className}`}
    >
      {segments.map((seg, i) => (
        <span key={i}>
          {seg.highlight ? (
            <span className="bg-[#E85744] text-white px-4 py-1.5 rounded-sm mr-1 leading-tight">
              {seg.text}
            </span>
          ) : (
            <span>{seg.text}</span>
          )}

          {/* ✅ LINE BREAK */}
          {seg.break && <br />}
        </span>
      ))}
    </h2>
  );
}

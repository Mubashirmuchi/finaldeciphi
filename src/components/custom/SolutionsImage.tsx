import { Check } from "lucide-react";
import { StrapiImage } from "@/components/custom/StrapiImage";
import type { Accordian } from "@/types";

export default function ImagePanel({ item }: { item: Accordian }) {
  return (
    <div className="relative w-full h-[260px] md:h-[480px] rounded-3xl overflow-hidden">
      <StrapiImage
        src={item.image?.url}
        alt={item.image?.alternativeText ?? item.heading}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

      <ul className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full max-w-sm">
        {item.points.map((p, i) => (
          <li
            key={p.id}
            className="badge-item"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="flex items-center gap-2.5 rounded-full bg-white/95 px-5 py-2.5 shadow-lg backdrop-blur-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600">
                <Check className="h-3 w-3 text-white" strokeWidth={3} />
              </span>

              <span className="text-sm font-medium text-zinc-800">
                {p.point}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// import React from "react";
// import {
//   Check,
//   Globe,
//   Shield,
//   Database,
//   Cloud,
//   Code2,
//   Lock,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { StrapiImage } from "./StrapiImage";
// import { AccordionClient } from "./AccordianClient";
// import type { Accordian } from "@/types";

// function ServiceIcon({
//   iconKey,
//   active,
// }: {
//   iconKey: string;
//   active: boolean;
// }) {
//   const cls = "h-[18px] w-[18px]";
//   const icon =
//     iconKey === "globe" ? (
//       <Globe className={cls} strokeWidth={1.75} />
//     ) : iconKey === "shield" ? (
//       <Shield className={cls} strokeWidth={1.75} />
//     ) : iconKey === "database" ? (
//       <Database className={cls} strokeWidth={1.75} />
//     ) : iconKey === "cloud" ? (
//       <Cloud className={cls} strokeWidth={1.75} />
//     ) : iconKey === "code" ? (
//       <Code2 className={cls} strokeWidth={1.75} />
//     ) : (
//       <Lock className={cls} strokeWidth={1.75} />
//     );

//   return (
//     <span
//       className={cn(
//         "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
//         active
//           ? "bg-[#1c2333] text-white shadow-sm"
//           : "border border-zinc-200 bg-white text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400",
//       )}
//       aria-hidden="true"
//     >
//       {icon}
//     </span>
//   );
// }

// export function ServiceAccordion({ accordian }: { accordian: Accordian[] }) {
//   if (!accordian?.length) return null;

//   const imagePanels: Record<string, React.ReactNode> = {};
//   const descriptions: Record<string, React.ReactNode> = {};
//   const icons: Record<string, React.ReactNode> = {};

//   accordian.forEach((item) => {
//     imagePanels[item.id] = item.image ? (
//       <div className="relative w-full overflow-hidden rounded-2xl">
//         <StrapiImage
//           src={item.image.url}
//           alt={item.image.alternativeText ?? item.heading}
//           width={640}
//           height={400}
//           className="h-56 w-full animate-image-reveal object-cover md:h-full"
//         />
//         <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
//         {item.points?.length > 0 && (
//           <ul className="absolute bottom-5 left-5 flex flex-col gap-2">
//             {item.points.map((p, i) => (
//               <li
//                 key={p.id}
//                 className="animate-badge-in badge-item"
//                 style={{ animationDelay: `${i * 80 + 120}ms` }}
//               >
//                 <div className="flex items-center gap-2.5 rounded-full bg-white/90 px-4 py-2 shadow backdrop-blur-sm">
//                   <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600">
//                     <Check className="h-3 w-3 text-white" strokeWidth={3} />
//                   </span>
//                   <span className="text-sm font-medium text-zinc-800">
//                     {p.point}
//                   </span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     ) : null;

//     descriptions[item.id] = (
//       <p className="pb-5 pt-0.5 leading-relaxed">{item.description}</p>
//     );

//     icons[item.id] = <ServiceIcon iconKey={item.icon} active={false} />;
//   });

//   return (
//     <section
//       aria-label="Deciphi Cybersecurity Services"
//       className="mx-auto w-full max-w-7xl"
//     >
//       <h2 className="sr-only">Our Cybersecurity Service Offerings</h2>
//       <AccordionClient
//         items={accordian}
//         defaultOpen="item-0"
//         imagePanels={imagePanels}
//         descriptions={descriptions}
//         icons={icons}
//       />
//     </section>
//   );
// }

// export default ServiceAccordion;

import React from "react";

const Accordian = () => {
  return <div className="bg-red-600">AccordianAccordianAccordianAccordian</div>;
};

export default Accordian;

// // import {
// //   IconAssessment,
// //   IconCloud,
// //   IconConsulting,
// //   IconIntegration,
// //   IconOT,
// //   IconTraining,
// // } from "@/components/ui/iconWrapper";
// // import { ChevronRight, Lock, Monitor, Shield, Sun } from "lucide-react";

// // const serviceIcons = {
// //   IconConsulting,
// //   IconAssessment,
// //   IconTraining,
// //   IconIntegration,
// //   IconOT,
// //   IconCloud,
// // };

// // export function getIcon(name: string) {
// //   const Icon = serviceIcons[name as keyof typeof serviceIcons];
// //   return Icon ? <Icon /> : null;
// // }

// //   const Icon = IconMap[f.icon as keyof typeof IconMap];

// import {
//   IconAssessment,
//   IconCloud,
//   IconConsulting,
//   IconIntegration,
//   IconOT,
//   IconTraining,
// } from "@/components/ui/iconWrapper";

// import { ChevronRight, Lock, Monitor, Shield, Sun } from "lucide-react";

// export const IconMap = {
//   // custom icons
//   IconConsulting,
//   IconAssessment,
//   IconTraining,
//   IconIntegration,
//   IconOT,
//   IconCloud,

//   // lucide icons
//   Sun,
//   Lock,
//   Monitor,
//   Shield,
//   ChevronRight,
// } as const;

// export type IconName = keyof typeof IconMap;

// export function getIcon(name?: IconName) {
//   if (!name) return null;

//   return IconMap[name];
// }

import {
  IconAssessment,
  IconCloud,
  IconConsulting,
  IconIntegration,
  IconOT,
  IconTraining,
} from "@/components/ui/iconWrapper";

import {
  ChevronRight,
  Lock,
  Monitor,
  Shield,
  Sun,
  IdCard,
  Database,
  Cloud,
  Globe,
  Code2,
  FileText,
  Wrench,
  CircleAlert,
  Mail,
  CircleCheckBig,
  HeartHandshake,
  Bug,
  ShieldAlert,
  MonitorCog,
  Bolt,
} from "lucide-react";

export const IconMap = {
  IconConsulting,
  IconAssessment,
  IconTraining,
  IconIntegration,
  IconOT,
  IconCloud,
  FileText,
  Wrench,
  Sun,
  Lock,
  Monitor,
  Shield,
  ChevronRight,
  IdCard,
  Database,
  Cloud,
  Code2,
  Mail,
  CircleCheckBig,
  CircleAlert,
  Globe,
  HeartHandshake,
  Bug,
  ShieldAlert,
  MonitorCog,
  Bolt,
} as const;

export type IconName = keyof typeof IconMap;

export function getIcon(name?: string) {
  if (!name || !(name in IconMap)) return null;

  return IconMap[name as IconName];
}

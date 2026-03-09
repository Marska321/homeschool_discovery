import type { LucideIcon } from "lucide-react";
import { School, BookOpen, Tent, Users, Activity } from "lucide-react";

export type CommunityType = "tutor_center" | "micro_school" | "co_op" | "club" | "sports";
export type Region = "gauteng" | "western_cape" | "kzn";
export type CurriculumSupport = "impaq" | "cambrilearn" | "brainline" | "wingu" | "ieb" | "caps" | "all";

export interface Community {
  id: number;
  name: string;
  type: CommunityType;
  location: string;
  region: Region;
  curricula: CurriculumSupport[];
  ages: string;
  days: string;
  description: string;
  price: string;
  spots: string;
  lat: number;
  lng: number;
}

export const TYPE_CONFIG: Record<CommunityType, { label: string; icon: LucideIcon; colorClass: string; bgClass: string }> = {
  tutor_center: { label: "Tutor Centre", icon: School, colorClass: "text-primary", bgClass: "bg-primary/10" },
  micro_school: { label: "Micro-School", icon: BookOpen, colorClass: "text-accent-foreground", bgClass: "bg-accent/15" },
  co_op: { label: "Parent Co-op", icon: Tent, colorClass: "text-primary", bgClass: "bg-primary/10" },
  club: { label: "Extracurricular Club", icon: Users, colorClass: "text-accent-foreground", bgClass: "bg-accent/15" },
  sports: { label: "Sports & Active", icon: Activity, colorClass: "text-destructive", bgClass: "bg-destructive/10" },
};

export const CURRICULA_LABELS: Record<CurriculumSupport, string> = {
  impaq: "Impaq",
  cambrilearn: "CambriLearn",
  brainline: "Brainline",
  wingu: "Wingu",
  ieb: "IEB",
  caps: "CAPS",
  all: "Curriculum Agnostic",
};

export const REGION_LABELS: Record<string, string> = {
  all: "All Regions",
  gauteng: "Gauteng",
  western_cape: "Western Cape",
  kzn: "KwaZulu-Natal",
};

export const communities: Community[] = [
  {
    id: 1,
    name: "Edu-Excellence Tutor Centre (Lynnwood)",
    type: "tutor_center",
    location: "Lynnwood, Pretoria",
    region: "gauteng",
    curricula: ["impaq", "caps"],
    ages: "Grades 1-12",
    days: "Mon - Fri (08:00 - 13:30)",
    description: "A well-established, neuro-diverse friendly tutor centre offering structured daily support. Features small classes (max 10), registered facilitators, and is an official SACAI exam centre.",
    price: "R4,500/mo",
    spots: "Waitlist for High School",
    lat: -25.7679,
    lng: 28.2831,
  },
  {
    id: 2,
    name: "EarthKids Forest School",
    type: "co_op",
    location: "Constantia, Cape Town",
    region: "western_cape",
    curricula: ["all"],
    ages: "Ages 4-12",
    days: "Tues - Thurs (09:00 - 13:00)",
    description: "A real-world outdoor education program. Homeschooled children learn through hands-on environmental projects, permaculture, and supervised free play in nature. No formal academics.",
    price: "R1,800/mo",
    spots: "Limited Spots",
    lat: -34.0277,
    lng: 18.4292,
  },
  {
    id: 3,
    name: "Young Engineers Homeschool Club",
    type: "club",
    location: "Sandton, Johannesburg",
    region: "gauteng",
    curricula: ["all", "wingu"],
    ages: "Grades 1-9",
    days: "Wednesdays (10:00 - 12:00)",
    description: "A morning STEM program specifically scheduled for homeschoolers. Uses motorized Lego and digital coding platforms to teach physical science and robotics collaboratively.",
    price: "R650/mo",
    spots: "Open Enrollment",
    lat: -26.1076,
    lng: 28.0567,
  },
  {
    id: 4,
    name: "TUTOR-IT Durbanville",
    type: "tutor_center",
    location: "Durbanville, Cape Town",
    region: "western_cape",
    curricula: ["impaq", "brainline", "caps", "ieb"],
    ages: "Grades 4-12",
    days: "Mon - Fri (08:30 - 14:00)",
    description: "Highly structured daily tutor facility well-known in the Northern Suburbs. Excellent for high school learners needing subject-specific help in Core Math and Physical Sciences.",
    price: "R3,800/mo",
    spots: "3 Spots Left",
    lat: -33.8316,
    lng: 18.5951,
  },
  {
    id: 5,
    name: "Pretoria Homeschool Athletics (PHAS)",
    type: "sports",
    location: "Centurion, Pretoria",
    region: "gauteng",
    curricula: ["all"],
    ages: "Ages 6 - 18",
    days: "Fridays (09:00 - 12:00)",
    description: "A massive weekly gathering at local stadiums where homeschooled children participate in formal track and field, netball, and soccer leagues. Crucial for physical socialization.",
    price: "R350/mo",
    spots: "Open Enrollment",
    lat: -25.8585,
    lng: 28.1891,
  },
  {
    id: 6,
    name: "CambriLearn Hub @ The Workspace",
    type: "micro_school",
    location: "Ballito, KZN",
    region: "kzn",
    curricula: ["cambrilearn", "wingu"],
    ages: "Grades 7-12",
    days: "Mon - Thu (08:00 - 14:00)",
    description: "A modern co-working style hub designed for international curriculum students. Provides high-speed internet, quiet study zones, and onsite math/science facilitators for AS-Levels.",
    price: "R5,200/mo",
    spots: "Limited Spots",
    lat: -29.5389,
    lng: 31.2136,
  },
  {
    id: 7,
    name: "Cape Home Educators (CHE) Meetups",
    type: "co_op",
    location: "Various (Western Cape)",
    region: "western_cape",
    curricula: ["all"],
    ages: "All Ages",
    days: "Variable (Usually Fridays)",
    description: "The largest homeschool network in the Western Cape. Facilitates weekly park meetups, discounted museum tours, and group beach days purely for community and socialization.",
    price: "R250/year (Membership)",
    spots: "Open Enrollment",
    lat: -33.9249,
    lng: 18.4241,
  },
  {
    id: 8,
    name: "Alpha Education Midrand",
    type: "tutor_center",
    location: "Midrand, Johannesburg",
    region: "gauteng",
    curricula: ["impaq", "caps"],
    ages: "Grades R-12",
    days: "Mon - Fri (08:00 - 13:30)",
    description: "A large, formal tutor centre franchise that bridges the gap between traditional school and homeschooling. Features strict attendance policies and a standardized daily routine.",
    price: "R3,900/mo",
    spots: "Open Enrollment",
    lat: -25.9881,
    lng: 28.1275,
  },
];

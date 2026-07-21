"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  homeLabel?: string;
  dict?: any;
}

export function Breadcrumb({ items, homeLabel, dict }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap gap-1 text-sm font-medium">
        <li>
          <Link href="/" className="flex items-center text-slate-400 hover:text-brand-orange transition-colors">
            <Home size={14} className="mr-1" />
            {homeLabel || dict?.breadcrumb?.home || 'Inicio'}
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight size={14} className="text-slate-300 mx-1" />
            {item.href ? (
              <Link href={item.href} className="text-slate-400 hover:text-brand-orange transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-brand-navy font-bold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

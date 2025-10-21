"use client";

import { motion } from "framer-motion";

import Link from "next/link";

import { ChevronRight, type LucideIcon } from "lucide-react";

import { useState } from "react";

export type NavMainGroup = {
  group?: string;

  items: {
    title: string;

    url: string;

    icon: LucideIcon;

    isActive?: boolean;

    items?: {
      title: string;

      url: string;

      icon: LucideIcon;
    }[];
  }[];
};

interface NavMainProps {
  userType: "umkm" | "regulator" | null;

  pathname: string;

  groups: NavMainGroup[];
}

export function NavMain({ groups, pathname }: NavMainProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <nav className="space-y-1 p-4">
      {groups.map((group, groupIdx) => (
        <div key={groupIdx}>
          {group.group && (
            <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {group.group}
            </div>
          )}

          <div className="space-y-1">
            {group.items.map((item) => {
              const isActive = pathname === item.url;

              const hasSubItems = item.items && item.items.length > 0;

              const isExpanded = expandedItems.includes(item.title);

              const IconComponent = item.icon;

              return (
                <div key={item.title}>
                  {hasSubItems ? (
                    <motion.button
                      onClick={() => toggleExpanded(item.title)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <IconComponent className="w-5 h-5 flex-shrink-0" />

                      <span className="flex-1 text-left">{item.title}</span>

                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </motion.button>
                  ) : (
                    <Link href={item.url}>
                      <motion.div
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm font-medium cursor-pointer ${
                          isActive
                            ? "bg-primary text-white shadow-md"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <IconComponent className="w-5 h-5 flex-shrink-0" />

                        <span>{item.title}</span>
                      </motion.div>
                    </Link>
                  )}

                  {/* Sub Items */}

                  {hasSubItems && isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-4 mt-1 space-y-1 border-l border-border pl-4"
                    >
                      {item.items?.map((subItem) => {
                        const SubIconComponent = subItem.icon;

                        const isSubActive = pathname === subItem.url;

                        return (
                          <Link key={subItem.url} href={subItem.url}>
                            <motion.div
                              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${
                                isSubActive
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                              whileHover={{ x: 4 }}
                            >
                              <SubIconComponent className="w-4 h-4 flex-shrink-0" />

                              <span>{subItem.title}</span>
                            </motion.div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

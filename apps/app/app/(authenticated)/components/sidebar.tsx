"use client";

import { OrganizationSwitcher, UserButton } from "@repo/auth/client";
import { ModeToggle } from "@repo/design-system/components/mode-toggle";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/design-system/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@repo/design-system/components/ui/sidebar";
import { cn } from "@repo/design-system/lib/utils";
import { NotificationsTrigger } from "@repo/notifications/components/trigger";
import {
  Activity,
  Bookmark,
  ChevronRightIcon,
  Clapperboard,
  Eye,
  Film,
  FolderIcon,
  Globe,
  LifeBuoyIcon,
  List,
  Search as SearchIcon,
  SendIcon,
  Settings2Icon,
  Tv,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Search } from "./search";

type GlobalSidebarProperties = {
  readonly children: ReactNode;
};

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navSurveillance: [
    {
      title: "Feed",
      url: "/feed",
      icon: Activity,
      isActive: true,
    },
    {
      title: "Global Activity",
      url: "#",
      icon: Globe,
    },
    {
      title: "Watchers",
      url: "#",
      icon: Eye,
    },
  ],
  navTheaters: [
    {
      title: "Active Rooms",
      url: "#",
      icon: Tv,
      items: [
        {
          title: "Public Lobbies",
          url: "#",
        },
        {
          title: "Private Screenings",
          url: "#",
        },
      ],
    },
    {
      title: "Community",
      url: "#",
      icon: Users,
    },
  ],
  navArchive: [
    {
      title: "Film Database",
      url: "/films/search",
      icon: Film,
    },
    {
      title: "Director Index",
      url: "#",
      icon: List,
    },
    {
      title: "Collections",
      url: "#",
      icon: FolderIcon,
    },
  ],
  navCitizen: [
    {
      title: "Profile",
      url: "#",
      icon: User,
    },
    {
      title: "Watchlist",
      url: "#",
      icon: Bookmark,
    },
    {
      title: "My Reviews",
      url: "#",
      icon: Clapperboard,
    },
  ],
  navSystem: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2Icon,
    },
    {
      title: "Support",
      url: "#",
      icon: LifeBuoyIcon,
    },
    {
      title: "Feedback",
      url: "#",
      icon: SendIcon,
    },
  ],
};

export const GlobalSidebar = ({ children }: GlobalSidebarProperties) => {
  const sidebar = useSidebar();

  return (
    <>
      <Sidebar variant="inset">
        <SidebarHeader className="border-border border-b p-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center border border-cyan/40 bg-cyan/5 text-[10px] text-cyan">
                ▶
              </div>
              <span className="font-bold text-foreground text-xs uppercase tracking-[0.3em]">
                CELLULOID
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground tracking-[0.1em]">
              <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-cyan" />
              <span>NETWORK v0.1: ACTIVE</span>
            </div>
          </div>
        </SidebarHeader>
        <div className="p-2">
          <div
            className={cn(
              "overflow-hidden transition-all [&>div]:w-full",
              sidebar.open ? "" : "-mx-1"
            )}
          >
            <OrganizationSwitcher
              afterSelectOrganizationUrl="/"
              hidePersonal
            />
          </div>
        </div>
        <Search />
        <SidebarContent className="font-mono">
          {/* SURVEILLANCE */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-[10px] tracking-[0.2em] text-cyan/40">
              // SURVEILLANCE
            </SidebarGroupLabel>
            <SidebarMenu>
              {data.navSurveillance.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      className="flex items-center gap-2 text-[11px] uppercase tracking-widest"
                      href={item.url}
                    >
                      <item.icon className="h-4 w-4 text-cyan/60" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          {/* THEATERS */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-[10px] tracking-[0.2em] text-cyan/40">
              // THEATERS
            </SidebarGroupLabel>
            <SidebarMenu>
              {data.navTheaters.map((item) => (
                <Collapsible
                  asChild
                  defaultOpen={item.isActive}
                  key={item.title}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link
                        className="flex items-center gap-2 text-[11px] uppercase tracking-widest"
                        href={item.url}
                      >
                        <item.icon className="h-4 w-4 text-cyan/60" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRightIcon />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link
                                    className="text-[10px] text-muted-foreground uppercase tracking-widest"
                                    href={subItem.url}
                                  >
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          {/* ARCHIVE */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-[10px] tracking-[0.2em] text-cyan/40">
              // ARCHIVE
            </SidebarGroupLabel>
            <SidebarMenu>
              {data.navArchive.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      className="flex items-center gap-2 text-[11px] uppercase tracking-widest"
                      href={item.url}
                    >
                      <item.icon className="h-4 w-4 text-cyan/60" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          {/* CITIZEN */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-[10px] tracking-[0.2em] text-cyan/40">
              // CITIZEN
            </SidebarGroupLabel>
            <SidebarMenu>
              {data.navCitizen.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      className="flex items-center gap-2 text-[11px] uppercase tracking-widest"
                      href={item.url}
                    >
                      <item.icon className="h-4 w-4 text-cyan/60" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <div className="mt-auto h-px w-full opacity-50 bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* SYSTEM */}
          <SidebarGroup>
            <SidebarMenu>
              {data.navSystem.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest hover:text-cyan transition-colors"
                      href={item.url}
                    >
                      <item.icon className="h-3.5 w-3.5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-border border-t p-2">
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center justify-between gap-2 px-2">
              <UserButton
                appearance={{
                  elements: {
                    rootBox: "flex overflow-hidden w-full",
                    userButtonBox: "flex-row",
                    userButtonOuterIdentifier:
                      "truncate pl-2 font-mono text-[10px] uppercase",
                  },
                }}
                showName
              />
              <div className="flex shrink-0 items-center gap-1">
                <ModeToggle />
                <Button
                  asChild
                  className="shrink-0 text-muted-foreground hover:text-cyan transition-colors"
                  size="icon"
                  variant="ghost"
                >
                  <div className="h-4 w-4">
                    <NotificationsTrigger />
                  </div>
                </Button>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </>
  );
};

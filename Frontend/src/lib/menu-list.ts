import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  UserPen,
  UserCog,
  UsersRound,
  FileText,
  Brain,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Posts",
          icon: SquarePen,
          submenus: [
            {
              href: "/posts",
              label: "All Posts",
            },
            {
              href: "/posts/new",
              label: "New Post",
            },
          ],
        },
        {
          href: "/document-processing",
          label: "Document Processing",
          icon: FileText,
        },
        {
          href: "/personal-information",
          label: "Personal Information",
          icon: UserCog,
        },
        {
          href: "/community-details",
          label: "Community Details",
          icon: UsersRound,
        },
        {
          href: "/fra-insight-engine",
          label: "FRA Insight Engine",
          icon: Brain,
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          icon: Users,
        },
        {
          href: "/account",
          label: "Account",
          icon: UserPen,
        },
      
        {
          href: "/settings",
          label: "Settings",
          icon: Settings,
        },
      ],
    },
  ];
}

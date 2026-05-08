import Dashboard from "@/pages/Dashboard";
import Logout from "@/pages/Logout";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Login",
      href: "/",
    },
    {
      label: "Signup",
      href: "/signup",
    },
    // {
    //   label: "Pricing",
    //   href: "/pricing",
    // },
    // {
    //   label: "Blog",
    //   href: "/blog",
    // },
    // {
    //   label: "About",
    //   href: "/about",
    // },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      cmp:{
        link:'/dashboard',
        component:Dashboard
      },
      children:[
        {label:'Overview',
          href:'/dashboard/overview'
        }
      ]
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
       cmp:{
        link:'/dashboard',
        component:Logout
      },
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",

    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },

  routes:[
    {
      route:'/home'
    }
  ]
};

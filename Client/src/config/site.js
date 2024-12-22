/**
 * Configuration object for the site.
 * @typedef {Object} SiteConfig
 * @property {string} name - The name of the site.
 * @property {string} description - A brief description of the site.
 * @property {Array.<NavItem>} navItems - An array of navigation items for the main navigation.
 * @property {Array.<NavItem>} navMenuItems - An array of navigation items for the menu.
 * @property {Object} links - An object containing external links related to the site.
 * @property {string} links.github - The GitHub link for the site or author.
*/

/**
 * Navigation item object.
 * @typedef {Object} NavItem
 * @property {string} label - The label of the navigation item.
 * @property {string} href - The URL the navigation item points to.
*/

/**
 * The site configuration object.
 * @type {SiteConfig}
 */
export const siteConfig = {
  name: "MediLearn",
  description: "Welcome to MediLearn, a platform for medical students and professionals to learn and grow.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  navMenuItems: [],
  links: {
    github: "https://github.com/Takayuki0x",
  },
};

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  author: {
    name: string;
    email: string;
  };
  theme?: {
    enabled?: boolean;
    defaultTheme?: 'light' | 'dark' | 'system';
  };
}

declare const siteConfig: SiteConfig;
export default siteConfig;

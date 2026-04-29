import cookbookLogo from "@/assets/CookBook_logo_cropped.png";

const footerLinks = {
  Company: ["About Us", "Contact", "Careers", "Press"],
  Explore: ["Recipes", "Meal Plans", "Trending", "Collections"],
  Community: ["Submit Recipe", "Join Forum", "Blog", "Cooking Tips"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Guidelines"],
};
const Footer = () => {
  return (
    <footer className="py-12 lg:py-16 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <img
                src={cookbookLogo}
                alt="CookBook"
                className="h-12 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Discover, cook, and share amazing recipes with a community of food lovers.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm text-foreground mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CookBook. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Instagram", "Pinterest", "YouTube", "TikTok"].map((social) => (
              <a key={social} href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

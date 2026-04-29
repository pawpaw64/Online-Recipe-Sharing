import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-12 lg:py-20 bg-primary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center space-y-5"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
            Get Weekly Recipe Inspiration
          </h2>
          <p className="text-muted-foreground text-sm">
            Curated recipes, cooking tips, and seasonal ingredients delivered to your inbox every Friday.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 h-12 px-5 rounded-full bg-background shadow-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button className="h-12 px-6 bg-primary text-primary-foreground font-semibold rounded-full hover:opacity-90 transition-opacity text-sm whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Join 50,000+ food lovers · No spam, unsubscribe anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;

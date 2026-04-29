import { motion } from "framer-motion";
import { Share2, Camera, PenLine, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Camera,
    title: "Snap a Photo",
    description: "Capture your dish in all its glory with a stunning photo.",
  },
  {
    icon: PenLine,
    title: "Write It Up",
    description: "Add your ingredients, steps, and personal tips.",
  },
  {
    icon: Send,
    title: "Share & Inspire",
    description: "Publish to our community and inspire food lovers worldwide.",
  },
];

const ShareRecipeSection = () => {
  return (
    <section id="share-recipe" className="scroll-mt-24 py-12 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4"
          >
            <Share2 className="w-4 h-4" /> Share Your Creation
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl lg:text-3xl font-display font-bold text-foreground"
          >
            Got a Recipe Worth Sharing?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-sm text-muted-foreground mt-2 max-w-md mx-auto"
          >
            Join thousands of home cooks sharing their favorite dishes with the world.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="bg-card rounded-card shadow-card p-6 text-center space-y-3 transition-all hover:shadow-card-hover"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-xs font-bold text-primary uppercase tracking-wider">
                Step {i + 1}
              </div>
              <h3 className="text-base font-display font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Button className="rounded-full h-12 px-8 text-sm font-semibold">
            <Share2 className="w-4 h-4 mr-2" /> Share Your Recipe
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ShareRecipeSection;

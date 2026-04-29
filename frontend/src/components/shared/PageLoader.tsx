import { motion } from 'framer-motion'
import { ChefHat } from 'lucide-react'

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      >
        <ChefHat className="h-10 w-10 text-primary" />
      </motion.div>
    </div>
  )
}

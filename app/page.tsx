"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Code2,
  Database,
  Layers,
  Layout,
  ListTodo,
  type LucideIcon,
  SmartphoneIcon as MobileIcon,
  Server,
  Shield,
  Zap,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ThemeCom } from "@/components/theme-com/theme-com";
import { SectionHeading } from "@/components/landing-pages-components/section-heading";
import AnimatedCard from "@/components/landing-pages-components/animated-card";
import Image from "next/image";
import Logo from "@/public/tasksy.svg";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between py-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-0"
          >
            <Image src={Logo} alt="Logo" width={30} height={30} />
            <span className="text-xl font-bold">Tasksy</span>
          </motion.div>
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center gap-8"
          >
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#tech"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Technology
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </Link>
          </motion.nav>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <ThemeCom />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="font-medium">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="font-medium">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </header>
      <div className="flex min-h-screen justify-center items-center  flex-col">
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-20 md:py-32 overflow-hidden">
            <div className="container px-4 md:px-6 relative">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="flex flex-col justify-center space-y-6"
                >
                  <div className="space-y-4">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
                    >
                      Manage Development Tasks with Ease
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.3 }}
                      className="max-w-[600px] text-muted-foreground text-lg md:text-xl"
                    >
                      The ultimate task management solution built specifically
                      for developers and development teams.
                    </motion.p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link href="/signup">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto font-medium group"
                      >
                        Start for Free
                        <motion.span
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          className="ml-2"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.span>
                      </Button>
                    </Link>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto font-medium"
                      onClick={scrollToFeatures}
                    >
                      Explore Features
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="flex items-center gap-4 text-sm text-muted-foreground pt-4"
                  >
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium"
                        >
                          {i}
                        </div>
                      ))}
                    </div>
                    <span>Trusted by thousands of developers worldwide</span>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="flex justify-center lg:justify-end"
                >
                  <div className="relative w-full max-w-[550px] aspect-video rounded-xl border bg-background/50 backdrop-blur-sm p-2 shadow-2xl">
                    <div className="bg-muted rounded-lg w-full h-full flex items-center justify-center overflow-hidden">
                      <div className="text-center p-8 relative">
                        <motion.div
                          animate={{
                            y: [0, -10, 0],
                          }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 3,
                            ease: "easeInOut",
                          }}
                        >
                          <Image
                            src={Logo}
                            alt="Logo"
                            width={200}
                            height={200}
                          />
                        </motion.div>
                        <p className="text-sm font-medium">
                          App Dashboard Preview
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
          </section>

          {/* Features Section */}
          <section
            id="features"
            ref={featuresRef}
            className="py-20 md:py-32 relative"
          >
            <div className="container px-4 md:px-6">
              <SectionHeading
                badge="Key Features"
                title="Everything You Need to Manage Development Tasks"
                description="Our comprehensive set of features helps you stay organized and productive"
              />
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
                <FeatureCard
                  icon={Layers}
                  title="Project Management"
                  description="Create and organize multiple projects with ease. Keep everything structured and accessible."
                  delay={0.1}
                />
                <FeatureCard
                  icon={ListTodo}
                  title="Task Tracking"
                  description="Add, edit, and delete tasks. Update statuses to track progress in real-time."
                  delay={0.2}
                />
                <FeatureCard
                  icon={Shield}
                  title="User Authentication"
                  description="Secure accounts that enable users to manage their tasks privately and confidently."
                  delay={0.3}
                />
                <FeatureCard
                  icon={MobileIcon}
                  title="Responsive Design"
                  description="Optimized for both mobile and desktop, ensuring a smooth experience on any device."
                  delay={0.4}
                />
                <FeatureCard
                  icon={Zap}
                  title="Real-Time Updates"
                  description="Get instant feedback on changes made to tasks or projects for improved productivity."
                  delay={0.5}
                />
                <FeatureCard
                  icon={Layout}
                  title="Intuitive Interface"
                  description="User-friendly design that makes task management simple and efficient."
                  delay={0.6}
                />
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section id="tech" className="py-20 md:py-32 bg-muted/50 relative">
            <div className="container px-4 md:px-6">
              <SectionHeading
                badge="Technology Stack"
                title="Built with Modern Technologies"
                description="Leveraging the power of the MERN stack for a robust and scalable application"
              />
              <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 py-12 md:grid-cols-4">
                <TechCard
                  icon={Code2}
                  title="React.js"
                  description="Frontend UI library"
                  delay={0.1}
                />
                <TechCard
                  icon={Server}
                  title="Node.js"
                  description="Backend runtime"
                  delay={0.2}
                />
                <TechCard
                  icon={Server}
                  title="Express.js"
                  description="Web framework"
                  delay={0.3}
                />
                <TechCard
                  icon={Database}
                  title="MongoDB"
                  description="NoSQL database"
                  delay={0.4}
                />
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-20 md:py-32 relative">
            <div className="container px-4 md:px-6">
              <SectionHeading
                badge="Pricing"
                title="Simple, Transparent Pricing"
                description="Choose the plan that works best for you or your team"
              />
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
                <PricingCard
                  title="Free"
                  price="$0"
                  description="Perfect for individual developers"
                  features={[
                    "Up to 3 projects",
                    "Basic task management",
                    "7-day task history",
                    "Community support",
                  ]}
                  buttonText="Get Started"
                  buttonVariant="outline"
                  delay={0.1}
                  href="/signup"
                />
                <PricingCard
                  title="Pro"
                  price="$12"
                  description="Ideal for professional developers"
                  features={[
                    "Unlimited projects",
                    "Advanced task tracking",
                    "30-day task history",
                    "Priority support",
                    "Team collaboration",
                  ]}
                  buttonText="Subscribe Now"
                  buttonVariant="default"
                  highlighted={true}
                  delay={0.2}
                />
                <PricingCard
                  title="Team"
                  price="$49"
                  description="Best for development teams"
                  features={[
                    "Everything in Pro",
                    "Team management",
                    "Role-based permissions",
                    "API access",
                    "Dedicated support",
                    "Custom integrations",
                  ]}
                  buttonText="Contact Sales"
                  buttonVariant="outline"
                  delay={0.3}
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 md:py-32 relative overflow-hidden">
            <InteractiveGridPattern
              className={cn(
                "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
              )}
            />
            <div className="absolute inset-0"></div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute inset-0 -z-10"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            </motion.div>
            <div className="container px-4 md:px-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex flex-col items-center justify-center space-y-8 text-center"
              >
                <div className="space-y-4 max-w-3xl">
                  <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl font-bold tracking-tighter md:text-5xl"
                  >
                    Ready to Boost Your Productivity?
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-muted-foreground md:text-xl/relaxed"
                  >
                    Join thousands of developers who are already using Tasksy to
                    manage their projects
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto font-medium group"
                    >
                      Start for Free
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        className="ml-2"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto font-medium"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>
        <footer className="border-t py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-4">
                <div className="flex items-center gap-0">
                  <Image src={Logo} alt="Logo" width={30} height={30} />
                  <span className="text-xl font-bold">Tasksy</span>
                </div>
                <p className="text-sm text-muted-foreground max-w-xs">
                  The ultimate task management solution built specifically for
                  developers and development teams.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Product</h3>
                <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
                  <Link
                    href="#features"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                  <Link
                    href="#pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/integrations"
                    className="hover:text-foreground transition-colors"
                  >
                    Integrations
                  </Link>
                  <Link
                    href="/changelog"
                    className="hover:text-foreground transition-colors"
                  >
                    Changelog
                  </Link>
                </nav>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Company</h3>
                <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    href="/blog"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/careers"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                  <Link
                    href="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </nav>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Legal</h3>
                <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
                  <Link
                    href="/terms"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="/privacy"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/cookies"
                    className="hover:text-foreground transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </nav>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-muted-foreground">
                © 2025 Tasksy. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <AnimatedCard
      className="flex flex-col items-center space-y-4 rounded-xl border p-6 text-center transition-all hover:border-primary/50 bg-background/50 backdrop-blur-sm"
      delay={delay}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="rounded-full bg-primary/10 p-3"
      >
        <Icon className="h-8 w-8 text-primary" />
      </motion.div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <Link
        href="#"
        className="inline-flex items-center text-sm font-medium text-primary"
      >
        Learn more
        <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </AnimatedCard>
  );
}

function TechCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <AnimatedCard
      className="flex flex-col items-center space-y-3 rounded-xl border p-6 text-center transition-all hover:border-primary/50 bg-background"
      delay={delay}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="rounded-full bg-primary/10 p-3"
      >
        <Icon className="h-8 w-8 text-primary" />
      </motion.div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </AnimatedCard>
  );
}

function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant = "default",
  highlighted = false,
  delay = 0,
  href,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "outline";
  highlighted?: boolean;
  delay?: number;
  href?: string;
}) {
  return (
    <AnimatedCard
      className={`flex flex-col rounded-xl border p-8 ${
        highlighted
          ? "border-primary shadow-xl relative before:absolute before:inset-0 before:rounded-xl before:border before:border-primary/50 before:scale-105 before:opacity-0 before:hover:scale-100 before:hover:opacity-100 before:transition-all before:-z-10"
          : ""
      }`}
      delay={delay}
      highlighted={highlighted}
    >
      {highlighted && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-sm text-muted-foreground">/month</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="mt-8 space-y-4 flex-1">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-start gap-2"
            >
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <Link href={href || "#"}>
          <Button variant={buttonVariant} className="w-full font-medium">
            {buttonText}
          </Button>
        </Link>
      </div>
    </AnimatedCard>
  );
}

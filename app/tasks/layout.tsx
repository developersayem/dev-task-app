import localFont from "next/font/local";

const cascadia = localFont({
  src: [
    {
      path: "../../public/fonts/CascadiaCode-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/CascadiaCode-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/CascadiaCode-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-cascadia", // Custom CSS variable
  display: "swap", // Helps with better rendering
});

export const metadata = {
  title: "Tasks",
  description:
    "A task and issue tracker for all developers, build using Tanstack Table.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cascadia.variable} antialiased`}>{children}</body>
    </html>
  );
}

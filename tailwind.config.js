module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "var(--background)",
          foreground: "var(--foreground)",
          accent: "var(--accent)",
          "accent-hover": "var(--accent-hover)",
          secondary: "var(--secondary)",
          "secondary-foreground": "var(--secondary-foreground)",
          muted: "var(--muted)",
          "muted-foreground": "var(--muted-foreground)",
          border: "var(--border)",
          card: "var(--card)",
          "card-foreground": "var(--card-foreground)",
        },
      },
    },
    plugins: [],
  };
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

@layer base {
  :root {
    --background: 220 20% 97%;
    --foreground: 222 47% 11%;

    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;

    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;

    --primary: 222 47% 16%;
    --primary-foreground: 45 80% 95%;

    --secondary: 220 15% 92%;
    --secondary-foreground: 222 47% 16%;

    --muted: 220 15% 94%;
    --muted-foreground: 220 10% 46%;

    --accent: 40 75% 50%;
    --accent-foreground: 222 47% 11%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 220 15% 88%;
    --input: 220 15% 88%;
    --ring: 40 75% 50%;

    --radius: 0.75rem;

    --gold: 40 75% 50%;
    --gold-light: 42 80% 65%;
    --gold-dark: 38 70% 38%;
    --slate-deep: 222 47% 11%;
    --slate-mid: 220 15% 30%;

    --font-display: 'Playfair Display', serif;
    --font-body: 'Inter', sans-serif;

    --shadow-card: 0 4px 24px -4px hsl(222 47% 11% / 0.08);
    --shadow-elevated: 0 12px 40px -8px hsl(222 47% 11% / 0.12);
    --gradient-gold: linear-gradient(135deg, hsl(40 75% 50%), hsl(42 80% 65%));
    --gradient-hero: linear-gradient(135deg, hsl(222 47% 11%), hsl(222 47% 20%));
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-family: var(--font-body);
  }

  h1, h2, h3 {
    font-family: var(--font-display);
  }
}

@layer utilities {
  .text-gradient-gold {
    background: var(--gradient-gold);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .bg-gradient-hero {
    background: var(--gradient-hero);
  }

  .shadow-card {
    box-shadow: var(--shadow-card);
  }

  .shadow-elevated {
    box-shadow: var(--shadow-elevated);
  }
}

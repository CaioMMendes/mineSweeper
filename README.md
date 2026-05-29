<div align="center">

# 💣 Minesweeper

A classic Minesweeper game built with modern web technologies, featuring a global ranking system and smooth animations.

<img  title="Minesweeper" src="./github/image1.png" alt="Minesweeper"  />

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io/)

</div>

---

## Demo

<img  title="Minesweeper gameplay" src="./github/gameplay.gif" alt="Minesweeper gameplay"  />

## Features

- **3 difficulty levels** with different board sizes and time limits
- **Global ranking** — compete with other players and track your best times
- **Smart first click** — bombs never spawn near your first click
- **Flag system** — right-click cells to mark suspected bombs
- **Countdown timer** — race against the clock to beat the board
- **Volume control** — adjustable sound effects
- **Animations** — smooth transitions powered by Framer Motion
- **Anti-bot protection** — Cloudflare Turnstile on score submission

---

## Difficulty Levels

| Difficulty | Grid Size | Bombs | Time Limit |
|------------|-----------|-------|------------|
| Easy       | 5 × 5     | 4     | 2 minutes  |
| Medium     | 7 × 7     | 8     | 5 minutes  |
| Hard       | 9 × 9     | 15    | 8 minutes  |

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Framework  | Next.js 16 (App Router)             |
| UI         | React 19 + Tailwind CSS v4          |
| Animations | Framer Motion                       |
| State      | Zustand                             |
| Database   | PostgreSQL via Prisma               |
| Security   | Cloudflare Turnstile                |
| Language   | TypeScript 5                        |

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/minesweeper.git
cd minesweeper

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file at the project root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/minesweeper"

NEXT_PUBLIC_TURNSTILE_SITE_KEY="your_turnstile_site_key"
TURNSTILE_SECRET_KEY="your_turnstile_secret_key"

NEXT_PUBLIC_GAME_VERSION="1.0.0"
```

### Database Setup

```bash
npx prisma migrate deploy
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3456](http://localhost:3456) in your browser.

---

## Screenshots

<img  title="Minesweeper win modal" src="./github/image2.png" alt="Minesweeper win modal"  />
<img  title="Minesweeper lose modal" src="./github/image3.png" alt="Minesweeper lose modal"  />

---

## Project Structure

```
src/
├── app/
│   ├── (home)/          # Root redirect to /medium
│   ├── [difficulty]/    # Dynamic route per difficulty
│   ├── api/
│   │   ├── ranking/     # GET leaderboard
│   │   └── scores/      # POST new score
│   ├── components/
│   │   ├── board/       # Game board
│   │   ├── cell/        # Individual cell
│   │   ├── ranking/     # Leaderboard table
│   │   ├── victoryModal/
│   │   ├── loseModal/
│   │   └── changeVolume/
│   ├── hooks/
│   │   ├── useBoard/    # Core game logic
│   │   └── useTimer.ts
│   ├── prisma/          # Schema & migrations
│   └── stores/          # Zustand stores
└── lib/
    └── prisma.ts        # Prisma client singleton
```

---

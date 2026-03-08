import { prisma } from "@/lib/prisma"
import { Difficulty } from "@prisma/client"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const difficulty = searchParams.get("difficulty") as Difficulty
  const version = searchParams.get("version")

  const ranking = await prisma.score.findMany({
    where: {
      difficulty,
      gameVersion: version!,
    },
    orderBy: {
      timeMs: "asc",
    },
    take: 10,
    select: {
      playerName: true,
      timeMs: true,
    },
  })

  return Response.json(ranking)
}

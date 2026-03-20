import useVolumeStore from "@/app/stores/volume-store"
import { formatTimeMinSeconds } from "@/app/utils/formatTimeMinSeconds"
import { useEffect, useEffectEvent, useRef, useState } from "react"
import { VictoryModalModelProps } from "./victoryModal.types"
import { useRouter } from "next/navigation"
import { RANKING_LIMIT } from "@/app/constants/rankingLimitConstant"

const VALID_NAME_REGEX = /^[a-zA-ZÀ-ÿ0-9]([a-zA-ZÀ-ÿ0-9 ]*[a-zA-ZÀ-ÿ0-9])?$/
const MAX_NAME_LENGTH = 20
const MIN_NAME_LENGTH = 2

function validateName(name: string): string {
  const trimmed = name.trim()
  if (trimmed.length < MIN_NAME_LENGTH)
    return `Nome deve ter pelo menos ${MIN_NAME_LENGTH} caracteres.`
  if (trimmed.length > MAX_NAME_LENGTH)
    return `Nome deve ter no máximo ${MAX_NAME_LENGTH} caracteres.`
  if (!VALID_NAME_REGEX.test(trimmed))
    return "Use apenas letras, números e espaços."
  if (/\s{2,}/.test(name)) return "Espaços duplos não são permitidos."
  return ""
}

export function useVictoryModalModel({
  win,
  usedTime,
  difficulty,
}: VictoryModalModelProps) {
  const [victoryModalOpen, setVictoryModalOpen] = useState(false)
  const { volume } = useVolumeStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { min, seconds } = formatTimeMinSeconds(usedTime.current)

  const [playerName, setPlayerName] = useState("")
  const [nameError, setNameError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isEligible, setIsEligible] = useState(false)
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false)

  const router = useRouter()

  // ─── Elegibilidade ────────────────────────────────────────────────────────
  async function checkEligibility() {
    setIsCheckingEligibility(true)
    try {
      const params = new URLSearchParams({
        difficulty: difficulty.toUpperCase(),
        version: process.env.NEXT_PUBLIC_GAME_VERSION ?? "1.0.0",
        limit: String(RANKING_LIMIT),
      })
      const res = await fetch(`/api/scores?${params}`)
      if (!res.ok) {
        setIsEligible(true)
        return
      }
      const scores: { timeMs: number }[] = await res.json()

      const qualifies =
        scores.length < RANKING_LIMIT ||
        usedTime.current < scores[scores.length - 1].timeMs

      setIsEligible(qualifies)
    } catch {
      setIsEligible(true) // fallback otimista
    } finally {
      setIsCheckingEligibility(false)
    }
  }

  // ─── Áudio ────────────────────────────────────────────────────────────────
  useEffect(() => {
    audioRef.current = new Audio("/victory.mp3")
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume
  }, [volume])

  // ─── Abre o modal quando win muda ─────────────────────────────────────────
  const openModal = useEffectEvent(() => {
    if (win === true && !victoryModalOpen) {
      setVictoryModalOpen(true)
      audioRef.current?.play().catch(console.error)
    }
  })

  useEffect(() => {
    openModal()
  }, [win])

  // ─── Reset + verifica elegibilidade ao abrir ───────────────────────────────
  useEffect(() => {
    if (victoryModalOpen) {
      setPlayerName("")
      setNameError("")
      setIsSubmitting(false)
      setIsSubmitted(false)
      checkEligibility()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [victoryModalOpen])

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Só renderiza quando o formulário está visível e elegível
    if (!victoryModalOpen || !isEligible || isCheckingEligibility) return

    const interval = setInterval(() => {
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
          theme: "dark",
          callback: (token: string) => setTurnstileToken(token),
          "expired-callback": () => setTurnstileToken(null),
        })
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [victoryModalOpen, isEligible, isCheckingEligibility])

  // ─── Handlers ─────────────────────────────────────────────────────────────
  function handleSetPlayerName(value: string) {
    const sliced = value.slice(0, MAX_NAME_LENGTH)
    setPlayerName(sliced)
    if (sliced.length > 0) setNameError(validateName(sliced))
    else setNameError("")
  }

  async function handleSubmitScore() {
    const error = validateName(playerName)
    if (error) {
      setNameError(error)
      return
    }

    setIsSubmitting(true)
    try {
      await fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName: playerName.trim(),
          timeMs: usedTime.current,
          difficulty: difficulty.toUpperCase(),
          version: process.env.NEXT_PUBLIC_GAME_VERSION ?? "1.0.0",
          turnstileToken,
        }),
      })
      setIsSubmitted(true)
    } catch (err) {
      console.error("Erro ao salvar score:", err)
      setNameError("Erro ao salvar. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleClose() {
    setVictoryModalOpen(false)
    router.refresh()
  }

  return {
    min,
    seconds,
    victoryModalOpen,
    handleCloseVictoryModal: handleClose,
    handleSetPlayerName,
    handleSubmitScore,
    nameError,
    isSubmitting,
    isSubmitted,
    isEligible,
    isCheckingEligibility,
    playerName,
    handleClose,
    turnstileRef,
    turnstileToken,
  }
}

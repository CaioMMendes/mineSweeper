"use client"

import { Modal } from "../modal"
import { VictoryModalViewProps } from "./victoryModal.types"

export function VictoryModalView({
  victoryModalOpen,
  handleCloseVictoryModal,
  seconds,
  min,
  playerName,
  nameError,
  handleSubmitScore,
  isSubmitting,
  isSubmitted,
  isEligible,
  isCheckingEligibility,
  handleSetPlayerName,
  handleClose,
}: VictoryModalViewProps) {
  if (!victoryModalOpen) return <></>

  const timeLabel = [
    min > 0 ? `${min} minuto${min > 1 ? "s" : ""}` : "",
    seconds > 0 ? `${seconds} segundo${seconds > 1 ? "s" : ""}` : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Modal
      open={victoryModalOpen}
      onClose={handleCloseVictoryModal}
      className="flex items-center justify-center flex-col"
    >
      <h2 className="text-2xl font-bold mb-4">🎉 Você venceu!</h2>

      <p>
        Você terminou em <span className="font-semibold">{timeLabel}</span>
      </p>

      {isCheckingEligibility ? (
        <p className="text-sm text-zinc-400 mt-5 animate-pulse">
          Verificando ranking...
        </p>
      ) : isSubmitted ? (
        // ── Score salvo ──────────────────────────────────────────────────
        <div className="flex flex-col items-center gap-4 mt-5">
          <p className="text-green-400 font-semibold">
            ✅ Tempo salvo no ranking!
          </p>
          <button
            onClick={handleClose}
            className="px-10 py-2 bg-green-600 hover:bg-green-500 text-white rounded transition-colors"
          >
            Fechar
          </button>
        </div>
      ) : isEligible ? (
        // ── Formulário de cadastro ────────────────────────────────────────
        <div className="flex flex-col gap-3 mt-5 w-full">
          <p className="text-sm text-zinc-400">
            🏆 Você entrou no ranking! Registre seu tempo:
          </p>

          <div className="flex flex-col gap-1">
            <label htmlFor="playerName" className="text-sm font-medium">
              Seu nome
            </label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => handleSetPlayerName(e.target.value)}
              placeholder="Digite seu nome..."
              maxLength={20}
              className={`px-3 py-2 rounded bg-zinc-700 border text-zinc-50 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                nameError ? "border-red-500" : "border-zinc-600"
              }`}
            />
            <div className="flex justify-between items-center">
              {nameError ? (
                <span className="text-xs text-red-400">{nameError}</span>
              ) : (
                <span />
              )}
              <span className="text-xs text-zinc-500 ml-auto">
                {playerName.length}/20
              </span>
            </div>
          </div>

          <div className="flex gap-2 mt-1">
            <button
              onClick={handleSubmitScore}
              disabled={isSubmitting || !!nameError || playerName.trim() === ""}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white rounded transition-colors font-medium"
            >
              {isSubmitting ? "Salvando..." : "Salvar no ranking"}
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-zinc-600 hover:bg-zinc-500 text-white rounded transition-colors"
            >
              Pular
            </button>
          </div>
        </div>
      ) : (
        // ── Não qualificou ───────────────────────────────────────────────
        <div className="flex flex-col items-center gap-4 mt-5">
          <p className="text-sm text-zinc-400 text-center">
            Continue jogando para entrar no ranking! 💪
          </p>
          <button
            onClick={handleClose}
            className="px-10 py-2 bg-zinc-600 hover:bg-zinc-500 text-white rounded transition-colors"
          >
            Fechar
          </button>
        </div>
      )}
    </Modal>
  )
}

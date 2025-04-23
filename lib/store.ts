import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserState {
  promptCount: number
  incrementPromptCount: () => void
  resetPromptCount: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      promptCount: 0,
      incrementPromptCount: () => set((state) => ({ promptCount: state.promptCount + 1 })),
      resetPromptCount: () => set({ promptCount: 0 }),
    }),
    {
      name: "user-storage",
    },
  ),
)

import { create } from 'zustand'

interface UIState {
  isSidebarOpen: boolean
  isAuthModalOpen: boolean
  toggleSidebar: () => void
  openAuthModal: () => void
  closeAuthModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isAuthModalOpen: false,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
}))

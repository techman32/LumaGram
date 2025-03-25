import { create } from 'zustand'

type RegisterForm = {
  username: string
  password: string
  repeatedPassword: string
}

type RegisterFormStore = {
  registerForm: RegisterForm
  updateField: (field: keyof RegisterForm, value: RegisterForm[keyof RegisterForm]) => void
  resetForm: () => void
}

export const useRegisterFormStore = create<RegisterFormStore>((set) => ({
  registerForm: {
    username: '',
    password: '',
    repeatedPassword: '',
  },
  updateField: (field, value) =>
    set((state) => ({
      registerForm: {
        ...state.registerForm,
        [field]: value,
      },
    })),
  resetForm: () => set({ registerForm: { username: '', password: '', repeatedPassword: '' } }),
}))

export type FormMode = 'sign-in' | 'sign-up'

export type SwitchFormModeProps = {
  mode: FormMode
  onSwitch: (mode: FormMode) => void
}

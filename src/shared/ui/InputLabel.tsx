type InputLabelProps = {
  label: string
}

export default function InputLabel({ label }: InputLabelProps) {
  return <h2 className="font-semibold">{label}</h2>
}

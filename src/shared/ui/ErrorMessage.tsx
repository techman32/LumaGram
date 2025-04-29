interface ErrorMessageProps {
  message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className="text-red-500 italic text-sm">{message}</p>
}

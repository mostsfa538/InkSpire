function Button({
    text,
    onClick,
    }: {
    text: string,
    onClick: (e: React.FormEvent) => void
}) {
  return <button className='w-fit mx-auto bg-secondary text-white px-10 py-2 rounded-lg' onClick={(e) => onClick(e)}>{text}</button>
}

export default Button
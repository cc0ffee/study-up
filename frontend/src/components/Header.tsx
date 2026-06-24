interface HeaderProps {
  onRandom: () => void
  disabled: boolean
}

export function Header({ onRandom, disabled }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header-title">
        study<em>up</em>
      </h1>
      <span className="header-tagline">Chicago Study Spots</span>
      <button
        className="header-random"
        onClick={onRandom}
        disabled={disabled}
        title="Pick a random spot from the current list"
      >
        Random Spot!
      </button>
    </header>
  )
}

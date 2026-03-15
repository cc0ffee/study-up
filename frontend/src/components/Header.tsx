interface HeaderProps {
  count: number
  total: number
}

export function Header({ count, total }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header-title">
        study<em>up</em>
      </h1>
      <span className="header-tagline">Chicago Study Spots</span>
      <div className="header-badge">
        {count !== total ? `${count} / ${total}` : count} spots
      </div>
    </header>
  )
}

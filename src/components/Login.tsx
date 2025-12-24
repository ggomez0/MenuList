import { useState } from 'react'

interface Props {
  onLogin: () => void;
}

export default function Login({ onLogin }: Props) {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setErrorMsg('')

    if (password === import.meta.env.VITE_PASSWORD) {
      setLoading(false)
      onLogin()
    }
    else {
      setErrorMsg('Contraseña incorrecta')
      setLoading(false)
    }
  }

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={handleLogin}>
        <h1 className="login-title">Administración</h1>
        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          autoFocus
        />
        {errorMsg && <div className="login-error">{errorMsg}</div>}
        <button className="login-btn" disabled={loading}>
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}
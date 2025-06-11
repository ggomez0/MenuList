import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const { error } = await supabase.auth.signInWithPassword({
      email: 'a@a.com',
      password,
    })

    if (error) {
      setErrorMsg('Contraseña incorrecta')
    }
    setLoading(false)
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
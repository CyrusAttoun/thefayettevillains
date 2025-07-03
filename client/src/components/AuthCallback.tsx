import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Auth callback error:', error)
        navigate('/', { replace: true })
        return
      }

      if (data.session) {
        navigate('/', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'var(--font-family-sans)'
    }}>
      <div>Completing sign in...</div>
    </div>
  )
}
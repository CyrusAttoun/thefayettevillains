import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useAuth } from '../contexts/AuthContext'
import Disabled from './ui/Disabled'

interface LoginModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { signInWithProvider, signInWithEmail, signUpWithEmail } = useAuth()

    const handleSocialLogin = async (provider: 'google' | 'apple' | 'facebook') => {
        try {
            setLoading(true)
            setError('')
            await signInWithProvider(provider)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError('')

            if (isSignUp) {
                await signUpWithEmail(email, password)
            } else {
                await signInWithEmail(email, password)
            }

            onOpenChange(false)
            setEmail('')
            setPassword('')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    // GoogleLoginButton component extracted from LoginModal
    interface GoogleLoginButtonProps {
        onClick: () => void;
        disabled: boolean;
    }

    const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onClick, disabled }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: 8,
                background: 'white',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
                transition: 'all 0.2s',
            }}
            className="disabled"
        >
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
        </button>
    );

    // FacebookLoginButton component extracted from LoginModal
    interface FacebookLoginButtonProps {
        onClick: () => void;
        disabled: boolean;
    }

    const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({ onClick, disabled }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: 8,
                background: 'white',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
                transition: 'all 0.2s'
            }}
        >
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#1877f2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Continue with Facebook
        </button>
    );

    // AppleLoginButton component extracted from LoginModal
    interface AppleLoginButtonProps {
        onClick: () => void;
        disabled: boolean;
    }

    const AppleLoginButton: React.FC<AppleLoginButtonProps> = ({ onClick, disabled }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: 8,
                background: 'white',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
                transition: 'all 0.2s'
            }}
            className="disabled"
        >
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#000" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Continue with Apple
        </button>
    );

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1000
                }} />
                <Dialog.Content style={{
                    backgroundColor: 'white',
                    borderRadius: 12,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90vw',
                    maxWidth: 400,
                    maxHeight: '85vh',
                    padding: 32,
                    zIndex: 1001,
                    fontFamily: 'var(--font-family-sans)'
                }}>
                    <Dialog.Title style={{
                        margin: 0,
                        fontSize: 24,
                        fontWeight: 600,
                        marginBottom: 24,
                        textAlign: 'center'
                    }}>
                        {isSignUp ? 'Create Account' : 'Sign In'}
                    </Dialog.Title>

                    {error && (
                        <div style={{
                            background: '#fee',
                            color: '#c00',
                            padding: 12,
                            borderRadius: 8,
                            marginBottom: 16,
                            fontSize: 14
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Social login buttons in a single parent div */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>

                        <GoogleLoginButton
                            onClick={() => handleSocialLogin('google')}
                            disabled={loading}
                        />

                        <FacebookLoginButton
                            onClick={() => handleSocialLogin('facebook')}
                            disabled={loading}
                        />

                        <AppleLoginButton
                            onClick={() => handleSocialLogin('apple')}
                            disabled={loading}
                        />

                    </div>


                    <div style={{ textAlign: 'center', margin: '24px 0', color: '#666' }}>
                        or
                    </div>

                    <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                padding: '12px 16px',
                                border: '1px solid #ddd',
                                borderRadius: 8,
                                fontSize: 14,
                                fontFamily: 'var(--font-family-sans)'
                            }}
                            className="disabled"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                padding: '12px 16px',
                                border: '1px solid #ddd',
                                borderRadius: 8,
                                fontSize: 14,
                                fontFamily: 'var(--font-family-sans)'
                            }}
                            className="disabled"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '12px 16px',
                                background: 'var(--color-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 8,
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontFamily: 'var(--font-family-sans)'
                            }}
                            className="disabled"
                        >
                            {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: 24 }}>
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-primary)',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                fontSize: 14,
                                fontFamily: 'var(--font-family-sans)'
                            }}
                        >
                            {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
                        </button>
                    </div>

                    <Dialog.Close asChild>
                        <button
                            style={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                background: 'none',
                                border: 'none',
                                fontSize: 20,
                                cursor: 'pointer',
                                color: '#666'
                            }}
                        >
                            ×
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
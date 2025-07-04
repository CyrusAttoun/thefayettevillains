import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useAuth } from '../contexts/AuthContext'
import './LoginModal.css'

interface LoginModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
    const [isSignUp, setIsSignUp] = useState(false)
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

    // GoogleLoginButton component extracted from LoginModal
    interface GoogleLoginButtonProps {
        onClick: () => void;
    }

    const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onClick }) => (
        <button
            onClick={onClick}
            className={`social-login-button disabled`}
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
    }

    const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({ onClick }) => (
        <button
            onClick={onClick}
            className="social-login-button"
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
    }

    const AppleLoginButton: React.FC<AppleLoginButtonProps> = ({ onClick }) => (
        <button
            onClick={onClick}
            className="social-login-button disabled">
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#000" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Continue with Apple
        </button>
    );

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="dialog-content">
                    <Dialog.Title className="dialog-title">
                        {isSignUp ? 'Create Account' : 'Sign In'}
                    </Dialog.Title>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {/* Social login buttons in a single parent div */}
                    <div className="social-buttons">

                        <GoogleLoginButton
                            onClick={() => handleSocialLogin('google')}
                        />

                        <FacebookLoginButton
                            onClick={() => handleSocialLogin('facebook')}
                        />

                        <AppleLoginButton
                            onClick={() => handleSocialLogin('apple')}
                        />

                    </div>


                    <div className="text-divider">
                        or
                    </div>

                    <BoomerAuth setLoading={setLoading} signInWithEmail={signInWithEmail} signUpWithEmail={signUpWithEmail} />

                    <div className="text-center">
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-link"
                        >
                            {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
                        </button>
                    </div>

                    <Dialog.Close asChild>
                        <button className="dialog-close">
                            ×
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )

    function BoomerAuth({
        setLoading,
        signInWithEmail,
        signUpWithEmail,
    }: {
        setLoading: (loading: boolean) => void;
        signInWithEmail: (email: string, password: string) => Promise<void>;
        signUpWithEmail: (email: string, password: string) => Promise<void>;
    }) {

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
    

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


        return (            
            <form onSubmit={handleEmailAuth} className="form-container disabled">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input" />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input" />
                <button
                    type="submit"
                    disabled={loading}
                    className="form-submit"
                >
                    {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
                </button>
            </form>            
        )
    }
}
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail, reset } from '../authSlice';
import { toast } from 'react-toastify';
import { Shield, CheckCircle, ArrowRight, RefreshCw, Lock } from 'lucide-react';

const EmailVerificationPage = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds countdown
    const [canResend, setCanResend] = useState(false);

    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    // Get email from router state or auth state
    const email = location.state?.email;

    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    // Timer logic
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    useEffect(() => {
        if (!email) {
            toast.error('No email provided for verification');
            navigate('/register');
        }

        if (isError) {
            toast.error(message);
            // Shake effect on error (visual feedback handled via toast for now)
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        }

        if (isSuccess) {
            // Success animation handled in UI before redirect
            const timer = setTimeout(() => {
                navigate('/');
            }, 2000);
            return () => clearTimeout(timer);
        }

        return () => {
            dispatch(reset());
        }
    }, [email, isError, isSuccess, message, navigate, dispatch]);

    const handleChange = (index, value) => {
        // Allow alphanumeric characters
        if (!/^[a-zA-Z0-9]*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.toUpperCase(); // Force uppercase for consistency with hex token
        setOtp(newOtp);

        // Auto-focus next input
        if (value !== '' && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Backspace logic
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
        if (pastedData.every(char => /^[a-zA-Z0-9]$/.test(char))) {
            const newOtp = [...otp];
            pastedData.forEach((char, index) => {
                if (index < 6) newOtp[index] = char.toUpperCase();
            });
            setOtp(newOtp);
            inputRefs.current[Math.min(pastedData.length, 5)].focus();
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const token = otp.join('');
        if (token.length !== 6) {
            toast.warning('Please enter the full 6-digit code');
            return;
        }
        dispatch(verifyEmail({ email, token }));
    };

    const handleResend = () => {
        // Logic to resend OTP would go here
        toast.info('Resend feature coming soon!');
        setTimeLeft(60);
        setCanResend(false);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

            {isSuccess ? (
                <div className="glass-panel p-12 rounded-2xl text-center max-w-md w-full animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={48} className="text-success animate-bounce" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Access Granted</h2>
                    <p className="text-text-muted">Verification successful. Initializing system...</p>
                </div>
            ) : (
                <div className="glass-panel p-8 md:p-12 rounded-2xl w-full max-w-lg shadow-2xl border border-white/10 relative z-10">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-6 shadow-lg shadow-primary/30">
                            <Shield size={32} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Security Verification</h2>
                        <p className="text-text-muted">
                            Enter the 6-digit access code sent to <br />
                            <span className="text-white font-mono bg-white/5 px-2 py-1 rounded mt-2 inline-block border border-white/10">{email}</span>
                        </p>
                    </div>

                    <form onSubmit={onSubmit}>
                        <div className="flex justify-center gap-2 md:gap-4 mb-10">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-inner"
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn btn-primary py-4 text-lg group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                {isLoading ? <RefreshCw className="animate-spin mr-2" /> : <Lock className="mr-2" size={18} />}
                                {isLoading ? 'Verifying...' : 'Verify Identity'}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-text-muted mb-4">
                            Didn't receive the code?
                        </p>
                        {canResend ? (
                            <button
                                onClick={handleResend}
                                className="text-primary hover:text-white font-semibold transition-colors flex items-center justify-center mx-auto"
                            >
                                <RefreshCw size={14} className="mr-2" /> Resend Code
                            </button>
                        ) : (
                            <div className="text-text-muted font-mono bg-white/5 inline-block px-3 py-1 rounded-full text-xs">
                                Resend in {timeLeft}s
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailVerificationPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail, reset } from '../authSlice';
import { toast } from 'react-toastify';

const EmailVerificationPage = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    // Get email from router state or auth state
    const email = location.state?.email;

    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (!email) {
            toast.error('No email provided for verification');
            navigate('/register');
        }

        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success('Email verified! You are now logged in.');
            navigate('/');
        }

        return () => {
            dispatch(reset());
        }
    }, [email, isError, isSuccess, message, navigate, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(verifyEmail({ email, token: otp }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-2 text-slate-800">Verify Your Email</h2>
                <p className="text-slate-600 mb-6">Enter the code sent to {email}</p>

                <form onSubmit={onSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Verification Code"
                        className="w-full px-4 py-3 border rounded-md text-center text-xl tracking-widest focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-medium"
                    >
                        {isLoading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmailVerificationPage;

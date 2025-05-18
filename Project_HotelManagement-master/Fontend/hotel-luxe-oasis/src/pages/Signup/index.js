import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/auth/register', { email, username, password });
            const responseData = response.data;
            if (responseData.status === 200) {
                setSuccess('Đăng ký thành công! Vui lòng kiểm tra email để xác minh tài khoản');
                setError('');
                setErrorEmail('');
                setErrorUsername('');
                setEmail('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
            } else if (responseData.msg.includes('Email đã tồn tại')) {
                setErrorEmail('Email đã tồn tại');
                setErrorUsername('');
            } else if (responseData.msg.includes('Tên tài khoản đã tồn tại')) {
                setErrorUsername('Tên tài khoản đã tồn tại');
                setErrorEmail('');
            }
        } catch (err) {
            const { data } = err.response || {};
            setError('');
            setErrorEmail('');
            setErrorUsername('');
            setSuccess('');

            if (data?.msg) {
                if (data.msg.includes('Email đã tồn tại')) {
                    setErrorEmail('Email đã tồn tại');
                } else if (data.msg.includes('Username đã tồn tại')) {
                    setErrorUsername('Tên đăng nhập đã tồn tại');
                } else {
                    setError(data.msg);
                }
            } else {
                setError('Có lỗi xảy ra.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: '100vh',
                backgroundImage: `url('/img/about-4.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
            }}
        >
            <div
                className="p-5"
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.85)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 2,
                }}
            >
                <div className="text-center mb-4">
                    <h3 style={{ color: '#dfa974', fontWeight: 'bold' }}>Khách Sạn Bình Minh Palace</h3>
                    <p className="text-muted">Tạo tài khoản để đăng nhập</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errorEmail && <div className="text-danger">{errorEmail}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <label>Tên đăng nhập</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {errorUsername && <div className="text-danger">{errorUsername}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <div className="d-grid gap-2 mb-3">
                        <button
                            type="submit"
                            className="btn text-white"
                            style={{ backgroundColor: '#dfa974' }}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="spinner-border spinner-border-sm text-light" role="status" />
                            ) : (
                                'Đăng ký'
                            )}
                        </button>
                    </div>
                    <div className="text-center">
                        <p>
                            Đã có tài khoản?{' '}
                            <a href="/login" style={{ color: '#dfa974' }}>
                                Đăng nhập
                            </a>
                        </p>
                    </div>
                </form>
            </div>
            {/* Lớp phủ làm mờ nền */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.3)',
                    zIndex: 1,
                }}
            />
        </div>
    );
}

export default Signup;

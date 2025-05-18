import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/auth/login', { username, password });
            const { status, data } = response.data;

            if (status === 200) {
                localStorage.setItem('token', data);
                localStorage.setItem('username', username);
                navigate('/');
            } else if (status === 401) {
                setError('Tên đăng nhập hoặc mật khẩu không đúng');
            }
        } catch (err) {
            setError('Đã xảy ra lỗi khi đăng nhập');
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
                    maxWidth: '400px',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.85)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 2,
                }}
            >
                <div className="text-center mb-4">
                    <h3 style={{ color: '#dfa974', fontWeight: 'bold' }}>Khách Sạn Bình Minh Palace</h3>
                    <p className="text-muted">Đăng nhập vào tài khoản của bạn</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <label>Tên đăng nhập</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
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
                    {error && <div className="alert alert-danger">{error}</div>}
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
                                'Đăng nhập'
                            )}
                        </button>
                    </div>
                    <div className="text-center">
                        <Link to="/forget-password" style={{ color: '#dfa974' }}>
                            Quên mật khẩu?
                        </Link>
                        <p className="mt-2">
                            Chưa có tài khoản?{' '}
                            <Link to="/signup" style={{ color: '#dfa974' }}>
                                Đăng ký
                            </Link>
                        </p>
                    </div>
                </form>
            </div>

            {/* Lớp phủ mờ nhẹ nếu cần */}
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

export default Login;

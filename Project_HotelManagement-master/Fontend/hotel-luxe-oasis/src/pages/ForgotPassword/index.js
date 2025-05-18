import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.post('http://localhost:8080/auth/forget-password', { email }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                setMessage(response.data.data);
            }
        } catch (error) {
            if (error.response && error.response.data.status === 400) {
                setError(error.response.data.data || 'Có lỗi xảy ra. Vui lòng thử lại.');
            } else {
                setError('Có lỗi xảy ra. Vui lòng kiểm tra kết nối mạng.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%', borderRadius: '1rem' }}>
                <div className="text-center mb-4">
                    <img
                        src="img/Logo_hotel.jpg"
                        alt="logo"
                        style={{ width: '80px', borderRadius: '50%' }}
                    />
                    <h3 className="mt-3" style={{ color: '#dfa974' }}>Khách Sạn Bình Minh Palace</h3>
                    <p className="text-muted">Khôi phục lại mật khẩu của bạn</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {message && <div className="alert alert-success">{message}</div>}

                    <div className="d-grid gap-2">
                        <button
                            type="submit"
                            className="btn text-white"
                            disabled={loading}
                            style={{ backgroundColor: '#dfa974' }}
                        >
                            {loading ? (
                                <div className="spinner-border spinner-border-sm text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                'Gửi yêu cầu khôi phục'
                            )}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-muted">
                        Bạn nhớ lại mật khẩu?{' '}
                        <Link to="/login" style={{ color: '#dfa974', textDecoration: 'none' }}>
                            Đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default ForgotPassword;

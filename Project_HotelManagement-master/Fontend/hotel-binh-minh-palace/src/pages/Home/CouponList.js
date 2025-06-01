import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegCopy } from 'react-icons/fa';
// Import CSS để thêm hiệu ứng

function CouponList() {
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/coupon/available")
            .then((res) => {
                if (res.data.status === 200) {
                    setCoupons(res.data.data);
                }
            })
            .catch((err) => {
                console.error("Lỗi khi tải mã giảm giá:", err);
            });
    }, []);

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        alert(`✅ Đã sao chép mã: ${code}`);
    };

    return (
        <section className="coupon-section spad">
            <div className="container">
                <div className="section-title text-center">
                    <span style={{ color: '#ff8c00', fontWeight: 'bold' }}>KHUYẾN MÃI</span>
                    <h2 style={{ fontWeight: '700' }}>Mã giảm giá hấp dẫn</h2>
                </div>
                <div className="row justify-content-center">
                    {coupons.length === 0 ? (
                        <p className="text-center">Hiện chưa có mã giảm giá nào.</p>
                    ) : (
                        coupons.map((coupon) => (
                            <div className="col-lg-4 col-md-6" key={coupon.id}>
                                <div
                                    className="coupon-card blinking-card"
                                    style={{
                                        border: "2px dashed #ff8c00",
                                        padding: "25px",
                                        borderRadius: "15px",
                                        marginBottom: "25px",
                                        backgroundColor: "#fffbea",
                                        transition: "all 0.3s ease",
                                        textAlign: "center",
                                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                                    }}
                                >
                                    <h4 style={{ color: '#333' }}>
                                        Mã:{" "}
                                        <span className="blinking-code">
                                            {coupon.code}
                                        </span>
                                    </h4>
                                    <p style={{ margin: '8px 0' }}>
                                        🎉 <strong>Giảm {coupon.discountPercentage}%</strong>
                                    </p>
                                    <p style={{ fontSize: '14px', color: '#666' }}>
                                        ⏰ Hạn dùng: {coupon.expiryDate}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <button
                                            className="primary-btn"
                                            onClick={() => copyToClipboard(coupon.code)}
                                            style={{
                                                backgroundColor: '#ff6600',
                                                border: 'none',
                                                color: '#fff',
                                                padding: '10px 20px',
                                                borderRadius: '25px',
                                                marginTop: '12px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                            }}
                                        >
                                            <FaRegCopy />
                                            Sao chép mã
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

export default CouponList;

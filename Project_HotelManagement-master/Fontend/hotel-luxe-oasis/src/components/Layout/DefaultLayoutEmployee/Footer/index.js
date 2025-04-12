import React from 'react';

function Footer() {
    return (
        <div className="container-fluid pt-4 px-4">
            <div className="bg-light rounded-top p-4">
            <div className="row">
                    <div className="col-12 col-sm-6 text-center text-sm-start">
                        &copy; <a href="#">Khách sạn Bình Minh Palace</a>, Bản quyền được bảo lưu.
                    </div>
                    <div className="col-12 col-sm-6 text-center text-sm-end">
                        Thiết kế bởi <a href="https://www.facebook.com/doanhdubaiks">Vũ Đức Doanh</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;

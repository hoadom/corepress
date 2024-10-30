-- up.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),           -- Khóa chính, UUID tự sinh
    user_login VARCHAR(60) NOT NULL,                         -- Tên đăng nhập
    user_pass VARCHAR(255) NOT NULL,                         -- Mật khẩu
    user_nicename VARCHAR(50),                               -- Tên hiển thị
    user_email VARCHAR(100) NOT NULL,                        -- Email
    user_url VARCHAR(100),                                   -- URL cá nhân
    user_registered TIMESTAMP NOT NULL,                      -- Thời gian đăng ký
    user_activation_key VARCHAR(255),                        -- Khóa kích hoạt
    user_status SMALLINT DEFAULT 0,                          -- Trạng thái người dùng
    display_name VARCHAR(250),                               -- Tên hiển thị công khai
    created_at TIMESTAMPTZ DEFAULT NOW(),                    -- Ngày tạo
    updated_at TIMESTAMPTZ                                   -- Ngày cập nhật (sẽ được cập nhật tự động bởi trigger)
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

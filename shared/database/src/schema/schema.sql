CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),           
    user_login VARCHAR(60) NOT NULL,       
    user_pass VARCHAR(255) NOT NULL,        
    user_nicename VARCHAR(50),              
    user_email VARCHAR(100) NOT NULL,        
    user_url VARCHAR(100),                  
    user_registered TIMESTAMP NOT NULL,     
    user_activation_key VARCHAR(255),       
    user_status SMALLINT DEFAULT 0,       
    display_name VARCHAR(250),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

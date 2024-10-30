-- up.sql

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
    updated_at TIMESTAMPTZ                                  
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

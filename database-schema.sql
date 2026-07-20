-- Database Schema Migration - AeroTryOut Pro (PostgreSQL)
-- Generated on: 2026-07-19
-- Standard: ANSI SQL-92 / SOLID DB Constraints

CREATE TYPE user_role AS ENUM ('admin', 'guru', 'siswa');
CREATE TYPE exam_difficulty AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE submission_status AS ENUM ('ongoing', 'completed');

-- 1. Users Table
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL,
    avatar VARCHAR(255),
    email VARCHAR(100) UNIQUE NOT NULL,
    school_class VARCHAR(20), -- Nullable for Guru/Admin
    school_name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);

-- 2. Questions Table (Bank Soal)
CREATE TABLE questions (
    id VARCHAR(50) PRIMARY KEY,
    text TEXT NOT NULL,
    options JSONB NOT NULL, -- JSON array of exactly 4 choices
    correct_answer INTEGER NOT NULL CHECK (correct_answer BETWEEN 0 AND 3),
    category VARCHAR(50) NOT NULL,
    difficulty exam_difficulty NOT NULL DEFAULT 'medium',
    explanation TEXT,
    teacher_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_questions_teacher FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);

-- 3. Tryouts Table (Jadwal Ujian)
CREATE TABLE tryouts (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
    passing_grade INTEGER NOT NULL CHECK (passing_grade BETWEEN 10 AND 100),
    category VARCHAR(50) NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tryouts_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_tryouts_category ON tryouts(category);
CREATE INDEX idx_tryouts_published ON tryouts(is_published);

-- 4. Tryout Questions (Many-to-Many Join Table)
CREATE TABLE tryout_questions (
    tryout_id VARCHAR(50) NOT NULL,
    question_id VARCHAR(50) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    PRIMARY KEY (tryout_id, question_id),
    CONSTRAINT fk_join_tryout FOREIGN KEY (tryout_id) REFERENCES tryouts(id) ON DELETE CASCADE,
    CONSTRAINT fk_join_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- 5. Submissions Table (Hasil Ujian Siswa)
CREATE TABLE submissions (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    student_name VARCHAR(100) NOT NULL,
    student_class VARCHAR(20) NOT NULL,
    tryout_id VARCHAR(50) NOT NULL,
    tryout_title VARCHAR(150) NOT NULL,
    answers JSONB NOT NULL, -- Map of question_id -> selected_option_index
    flagged JSONB NOT NULL, -- Array of flagged question_ids
    score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
    correct_count INTEGER NOT NULL CHECK (correct_count >= 0),
    wrong_count INTEGER NOT NULL CHECK (wrong_count >= 0),
    unanswered_count INTEGER NOT NULL CHECK (unanswered_count >= 0),
    is_passed BOOLEAN NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    submit_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status submission_status NOT NULL DEFAULT 'completed',
    CONSTRAINT fk_submissions_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_submissions_tryout FOREIGN KEY (tryout_id) REFERENCES tryouts(id) ON DELETE CASCADE
);

CREATE INDEX idx_submissions_student ON submissions(student_id);
CREATE INDEX idx_submissions_tryout ON submissions(tryout_id);
CREATE INDEX idx_submissions_score ON submissions(score);

-- 6. System Settings Table
CREATE TABLE system_settings (
    id SERIAL PRIMARY KEY,
    system_name VARCHAR(100) NOT NULL DEFAULT 'AeroTryOut Pro',
    school_year VARCHAR(20) NOT NULL DEFAULT '2026/2027',
    passing_grade_default INTEGER NOT NULL DEFAULT 75,
    enable_self_registration BOOLEAN NOT NULL DEFAULT TRUE,
    maintenance_mode BOOLEAN NOT NULL DEFAULT FALSE
);

-- Insert initial single settings record
INSERT INTO system_settings (system_name, school_year, passing_grade_default, enable_self_registration, maintenance_mode)
VALUES ('AeroTryOut Pro', '2026/2027', 75, TRUE, FALSE);

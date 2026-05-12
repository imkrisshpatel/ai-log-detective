import sqlite3
from datetime import datetime

# This creates a physical database file in your project root
DB_PATH = "sentinel.db"

def setup_database():
    """Builds the database and the threat_reports table."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # We store the ID, Time, the original log, and what the AI said about it
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS threat_reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            raw_log TEXT,
            ai_report TEXT
        )
    ''')
    conn.commit()
    conn.close()
    print("🗄️ [DATABASE] Filing Cabinet is ready and locked.")

def save_report(raw_log, ai_report):
    """Saves a new AI threat analysis to the database."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    cursor.execute(
        "INSERT INTO threat_reports (timestamp, raw_log, ai_report) VALUES (?, ?, ?)",
        (current_time, raw_log, ai_report)
    )
    
    conn.commit()
    conn.close()
    print("💾 [DATABASE] Threat report permanently saved to disk.")

if __name__ == "__main__":
    setup_database()
import sqlite3
from datetime import datetime

# The physical path to our database file
DB_PATH = "sentinel.db"

def setup_database():
    """Initializes the database and creates the necessary tables."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # We create the table. raw_log is what we'll check for duplicates later.
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
    """Checks for duplicates, then saves unique threat reports."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # --- THE DUPLICATE CHECK ---
    # We ask the DB: 'Do you have any row where the raw_log is exactly this?'
    cursor.execute("SELECT id FROM threat_reports WHERE raw_log = ?", (raw_log,))
    exists = cursor.fetchone() # This will be None if the log is brand new
    
    if exists:
        print(f"⏭️ [DATABASE] Duplicate log detected. Skipping save for: {raw_log[:30]}...")
    else:
        # --- THE SAVE ACTION ---
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        cursor.execute(
            "INSERT INTO threat_reports (timestamp, raw_log, ai_report) VALUES (?, ?, ?)",
            (current_time, raw_log, ai_report)
        )
        conn.commit()
        print("💾 [DATABASE] New unique threat report saved to disk.")
    
    conn.close()

if __name__ == "__main__":
    # Running this file directly just ensures the DB is set up.
    setup_database()
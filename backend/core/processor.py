import os
# --- ACTIVE IMPORTS ---
from backend.database.db_manager import save_report
from backend.core.config import settings
from backend.core.ai_analyzer import analyze_with_ai 

# These functions are defined RIGHT HERE, so no import needed!
def clean_log(raw_data):
    """Removes extra spaces and makes everything lowercase."""
    cleaned = raw_data.strip().lower()
    return cleaned 

def detect_threat(cleaned_message):
    """Checks for red flags using the imported settings object."""
    for word in settings.THREAT_KEYWORDS:
        if word in cleaned_message:
            return f"🚨 RED ALERT: Found '{word}'"
    return "✅ System is healthy."

# --- THE MASTER PIPELINE ---
if __name__ == "__main__":
    print("=== SENTINEL CORE STARTING ===\n")
    
    log_file_path = "logs/server_activity.log"
    
    if not os.path.exists(log_file_path):
        print(f"❌ ERROR: Could not find {log_file_path}")
    else:
        with open(log_file_path, "r") as file:
            for raw_line in file:
                current_raw = raw_line.strip()
                print(f"Reading: {current_raw}")
                
                # Step A: Clean
                cleaned = clean_log(raw_line)
                
                # Step B: Guard
                status = detect_threat(cleaned)
                
                # Step C: The Decision
                if "RED ALERT" in status:
                    print("🚨 THREAT FOUND: Handing over to AI...")
                    
                    # Step D: AI Brain
                    ai_report = analyze_with_ai(cleaned)
                    print(f"REPORT: {ai_report}")
                    
                    # Step E: Save to Database
                    save_report(current_raw, ai_report)
                    print("") 
                else:
                    print("✅ Safe. Skipping AI.\n")
                    
    print("=== PIPELINE FINISHED ===")
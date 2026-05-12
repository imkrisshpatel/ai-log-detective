# Instead of importing the list directly, we import the 'settings' onject
from backend.core.config import settings
from backend.core.ai_analyzer import analyze_with_ai 

def clean_log(raw_data):
    # This removes extra spaces and makes everyhting lowercase
    cleaned = raw_data.strip().lower()
    return cleaned 

def detect_threat(cleaned_message):
    # We check for multiple red flags using 'or'
    for word in settings.THREAT_KEYWORDS:
        if word in cleaned_message:
            return f"🚨 RED ALERT: Found '{word}'"
        
    return "✅ System is healthy."

# --- THE MASTER PIPELINE TEST ---
if __name__ == "__main__":
    print("=== PIPELINE START ===\n")
    
    # 1. Point Sentinel to the new log file
    log_file_path = "logs/server_activity.log"
    
    # 2. Open the file securely
    with open(log_file_path, "r") as file:
        
        # 3. Read it line by line
        for raw_line in file:
            print(f"Reading: {raw_line.strip()}")
            
            # Step A: Janitor cleans the line
            cleaned = clean_log(raw_line)
            
            # Step B: Security Guard checks the line
            status = detect_threat(cleaned)
            
            # Step C: The Filter (Only call the Brain if there is a threat!)
            if "RED ALERT" in status:
                print("🚨 THREAT FOUND: Handing over to AI...")
                ai_report = analyze_with_ai(cleaned)
                print(f"REPORT: {ai_report}\n")
            else:
                print("✅ Safe. Skipping AI to save money.\n")
                
    print("=== PIPELINE FINISHED ===")
# Instead of importing the list directly, we import the 'settings' onject
from core.config import settings


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

# 1. Start with raw, messy data
raw_input = "   SYSTEM CRITICAL: Memory Leak Found   "

# 2. Use the Janitor to clean it
cleaned = clean_log(raw_input)

# 3. Use the Security Guard to check it
status = detect_threat(cleaned)

# 4. Show the final result
print(status)

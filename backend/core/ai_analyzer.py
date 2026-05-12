import time
from backend.core.config import settings

def analyze_with_ai(log_message):
    """
    This will take the cleaned log from your processor.py and run it 
    through the AI (or the Mock)
    """
    if settings.USE_MOCK_AI:
        print(f"🤖 Mock AI analyzing: '{log_message}'...")
        time.sleep(1.5)
        return "🚨 FAKE ALERT: Simulated error detected. Action: Verify Auth."
    else:
        print("🧠 [REAL OPENAI] Contacting servers... ($0.0002 cost)")
        # Real OpenAI connection will go here next week
        return "Real AI response"

if __name__ == "__main__":
    # A quick test to make sure the switch works
    test_result = analyze_with_ai("System Critical: Memory Leak Found")
    print(test_result)
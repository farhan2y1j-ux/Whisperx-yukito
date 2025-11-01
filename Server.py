from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

# === STEP 1: Add your API key here (replace YOUR_API_KEY_HERE) ===
openai.api_key = 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  # <-- paste your key between quotes


@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")
    if not user_message:
        return jsonify({"reply": "Please say something."})

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are Yukito, a calm and logical AI mentor."},
                {"role": "user", "content": user_message}
            ],
        )

        bot_reply = response["choices"][0]["message"]["content"].strip()
        return jsonify({"reply": bot_reply})

    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

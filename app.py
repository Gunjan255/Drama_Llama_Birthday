
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

HER_NAME = "Drama Llama"
BIRTHDAY = "5 September 2001"
SONG_TITLE = "VALLAH — Cocktail 2"
SONG_URL = "https://www.youtube.com/results?search_query=VALLAH+Cocktail+2+Pritam+Bayanni+Harrdy+Sandhu+Amitabh+Bhattacharya"

@app.route("/")
def home():
    return render_template(
        "index.html",
        her_name=HER_NAME,
        birthday=BIRTHDAY,
        song_title=SONG_TITLE,
        song_url=SONG_URL,
    )

@app.post("/heartbeat")
def heartbeat():
    return jsonify({"ok": True, "message": "Love system is running."})

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5001,
        debug=True,
    )

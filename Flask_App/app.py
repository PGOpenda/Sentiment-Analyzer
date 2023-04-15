from flask import Flask, request, jsonify, render_template
import joblib

app = Flask(__name__)
model = joblib.load("swahili_naive_bayes.joblib")
vectorizer  = joblib.load("swahili_vectorizer.joblib")

@app.route('/')
def index():
  return render_template("index.html")

@app.route("/sentiment", methods=["POST"])
def analyze_sentiment():
  input_text = request.json["input_text"] 

  sentiment = model.predict(vectorizer.transform([input_text]))

  sentiment_list = sentiment.tolist();

  return jsonify({"sentiment": sentiment_list})

if __name__ == "__main__":
  app.run(debug=True)
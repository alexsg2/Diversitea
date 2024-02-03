from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS
import pandas as pd
from ops import search_company  # Import the search_company function

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your Pandas DataFrame from CSV
df = pd.read_csv('DiversityData.csv')  # Replace 'your_data.csv' with your actual data file

@app.route('/')
def home():
    return {}

@app.route('/api/search')
def search():
    term = request.args.get('term', '')
    print('Received term:', term)

    # Use the search_company function from ops.py
    result_json = search_company(term)

    # Return the result as JSON
    return jsonify(result_json)

if __name__ == '__main__':
    app.run(debug=True)

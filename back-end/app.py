from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS
import pandas as pd
from ops import search_company, search_options, sort_data  # Import the search_company function

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your Pandas DataFrame from CSV
df = pd.read_csv('DiversityData.csv')  # Replace 'your_data.csv' with your actual data file

# Home route for the back end
@app.route('/')
def home():
    return "Diversitea API"

# Route for getting a specific company's data
@app.route('/api/search')
def search():
    term = request.args.get('term', '')

    # Use the search_company function from ops.py
    result_json = search_company(term)
    print(result_json)

    # Return the result as JSON
    return jsonify(result_json)

# Route for auto fill in the search bar
@app.route('/api/suggestions')
def options():
    term = request.args.get('term', '')

    # Use the search_company function from ops.py
    results = search_options(term)

    # Return the result as JSON
    return results

# Route for getting the advanced stats leaderboard data
@app.route('/api/advancedstats')
def stats():
    stat = request.args.get('stat', '')
    print('Received term:', stat)

    # Use the search_company function from ops.py
    results = sort_data(stat)

    # Return the result as JSON
    return results

if __name__ == '__main__':
    app.run(debug=True)

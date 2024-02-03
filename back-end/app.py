# app.py

from flask import Flask, render_template, jsonify, request
import pandas as pd

app = Flask(__name__)

# Load your Pandas DataFrame from CSV
df = pd.read_csv('DiversityData.csv')  # Replace 'your_data.csv' with your actual data file

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/search')
def search():
    term = request.args.get('term', '')
    
    # Filter DataFrame based on the search term
    filtered_data = df[df['name'].str.contains(term, case=False)]

    # Convert Pandas DataFrame to JSON and return as an API response
    return jsonify(filtered_data.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)

import pandas as pd

# 1. Reading CSV Data
df = pd.read_csv('DiversityData.csv')   # Replace 'DiversityData.csv' with your actual file name

# Function to search for a company and return its information as JSON
def search_company(company_name):
    result = df[df['Company'].str.contains(company_name, case=False, na=False)]
    if not result.empty:
        company_info = {
            "Company": result.iloc[0]['Company'],
            "Female Employees": f"{result.iloc[0]['Female (%)']:.2f}%",
            "Male Employees": f"{result.iloc[0]['Male (%)']:.2f}%",
            "American Indian or Alaskan Native": f"{result.iloc[0]['American Indian or Alaskan Native (%)']:.2f}%",
            "Asian Employees": f"{result.iloc[0]['Asian (%)']:.2f}%",
            "Black or African American Employees": f"{result.iloc[0]['Black or African American (%)']:.2f}%",
            "Hispanic or Latino Employees": f"{result.iloc[0]['Hispanic or Latino (%)']:.2f}%",
            "Native Hawaiian or Pacific Islander": f"{result.iloc[0]['Native Hawaiian or Pacific Islander (%)']:.2f}%",
            "Two or more races Employees": f"{result.iloc[0]['Two or more races (%)']:.2f}%",
            "White Employees": f"{result.iloc[0]['White (%)']:.2f}%"
        }
        return company_info
    else:
        return {"error": f"Company '{company_name}' not found."}

# Example: Call the function with a specific company name
# company_name_to_search = input("Enter the company name to search: ")
# result_json = search_company(company_name_to_search)

# Print the result (for testing)
# print(result_json)

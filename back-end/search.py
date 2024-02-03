import pandas as pd

# 1. Reading CSV Data
df = pd.read_csv('DiversityData.csv')   # Replace 'DiversityData.csv' with your actual file name

# 2. Exploring the Data
# print("1. Displaying the first few rows:")
# print(df.head())

# print("\n2. Getting information about the DataFrame:")
# print(df.info())

# print("\n3. Getting basic statistics about numeric columns:")
# print(df.describe())

# Function to search for a company and display its information
def search_company():
    company_name = input("\nEnter the company name to search: ")
    result = df[df['Company'].str.contains(company_name, case=False, na=False)]
    if not result.empty:
        print("\nSearch Results for Company:", company_name)
        print(f"Female Employees: {result.iloc[0]['Female (%)']:.2f}%")
        print(f"Male Employees: {result.iloc[0]['Male (%)']:.2f}%")
        print(f"American Indian or Alaskan Native: {result.iloc[0]['American Indian or Alaskan Native (%)']:.2f}%")
        print(f"Asian Employees: {result.iloc[0]['Asian (%)']:.2f}%")
        print(f"Black or African American Employees: {result.iloc[0]['Black or African American (%)']:.2f}%")
        print(f"Hispanic or Latino Employees: {result.iloc[0]['Hispanic or Latino (%)']:.2f}%")
        print(f"Native Hawaiian or Pacific Islander: {result.iloc[0]['Native Hawaiian or Pacific Islander (%)']:.2f}%")
        print(f"Two or more races Employees: {result.iloc[0]['Two or more races (%)']:.2f}%")
        print(f"White Employees: {result.iloc[0]['White (%)']:.2f}%")
    else:
        print(f"\nCompany '{company_name}' not found.")


# Interactive search
search_company()

# # 4. Filtering Data for a specific state (Example: Washington)
# print("\n5. Filtering data for a specific state:")
# state_data = df[df['State'] == 'Washington']
# print(state_data)

# # 5. Iterating Through Rows
# print("\n6. Iterating through rows:")
# for index, row in df.iterrows():
#     print(row['Company'], row['State'])

# # 6. Adding or Modifying Data
# print("\n7. Adding or modifying data:")
# df['NewColumn'] = df['Female (%)'] + df['Male (%)']
# df['Year'] = df['Year'] + 1

# # 7. Writing to CSV
# df.to_csv('modified_data.csv', index=False)

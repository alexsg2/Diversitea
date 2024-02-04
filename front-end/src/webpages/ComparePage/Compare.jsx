import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NarBar/NavBar';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { json } from 'react-router-dom';
import amazonData from './amazon.json'; // Update the path as necessary
import airbnbData from './Airbnb.json';
import { Chart } from 'react-google-charts';


function Compare() {
    const [companyName1, setCompanyName1] = useState('');
    const [companyName2, setCompanyName2] = useState('');
    const [companyData1, setCompanyData1] = useState(null);
    const [companyData2, setCompanyData2] = useState(null);
    const [genderDiversityData, setGenderDiversityData] = useState([]);
    const [racialDiversityData, setRacialDiversityData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [suggestions1, setSuggestions1] = useState([]); // Suggestions for company 1
    const [suggestions2, setSuggestions2] = useState([]); // Suggestions for company 2


    const handleSearch = async () => {
        if (!companyName1 || !companyName2) {
            alert('Please enter both company names.');
            return;
        }
        setLoading(true);
        try {
            // Fetch data for both companies
            const response1 = await fetch('http://localhost:5000/api/search?term=' + companyName1);
            const data1 = await response1.json();

            const response2 = await fetch('http://localhost:5000/api/search?term=' + companyName2);
            const data2 = await response2.json();

            setCompanyData1(data1);
            setCompanyData2(data2);
        } catch (error) {
            console.error('Failed to fetch company data:', error);
            alert('Failed to fetch data for one or both companies.');
        } finally {
            setLoading(false);
        }
    };


    const fetchSuggestionsForCompany1 = async (inputTerm) => {
        if (!inputTerm.trim()) return;
        try {
            const response = await axios.get(`http://localhost:5000/api/suggestions?term=${inputTerm}`);
            setSuggestions1(response.data.companies); // Assuming the API returns an object with a companies array
        } catch (error) {
            console.error('Failed to fetch suggestions for company 1:', error);
        }
    };

    const fetchSuggestionsForCompany2 = async (inputTerm) => {
        if (!inputTerm.trim()) return;
        try {
            const response = await axios.get(`http://localhost:5000/api/suggestions?term=${inputTerm}`);
            setSuggestions2(response.data.companies); // Assuming the API returns an object with a companies array
        } catch (error) {
            console.error('Failed to fetch suggestions for company 2:', error);
        }
    };


    useEffect(() => {
        // Ensure data is available before parsing
        if (companyData1 && companyData2) {
            const newGenderDiversityData = [
                ['Company', 'Female Employees', 'Male Employees'],
                [companyData1.Company, parseFloat(companyData1['Female Employees']), parseFloat(companyData1['Male Employees'])],
                [companyData2.Company, parseFloat(companyData2['Female Employees']), parseFloat(companyData2['Male Employees'])],
            ];

            const newRacialDiversityData = [
                ['Company', 'Asian Employees', 'Black or African American Employees', 'Hispanic or Latino Employees', 'Native Hawaiian or Pacific Islander', 'Two or more races Employees', 'White Employees'],
                [
                    companyData1.Company,
                    parseFloat(companyData1['Asian Employees']),
                    parseFloat(companyData1['Black or African American Employees']),
                    parseFloat(companyData1['Hispanic or Latino Employees']),
                    parseFloat(companyData1['Native Hawaiian or Pacific Islander']),
                    parseFloat(companyData1['Two or more races Employees']),
                    parseFloat(companyData1['White Employees']),
                ],
                [
                    companyData2.Company,
                    parseFloat(companyData2['Asian Employees']),
                    parseFloat(companyData2['Black or African American Employees']),
                    parseFloat(companyData2['Hispanic or Latino Employees']),
                    parseFloat(companyData2['Native Hawaiian or Pacific Islander']),
                    parseFloat(companyData2['Two or more races Employees']),
                    parseFloat(companyData2['White Employees']),
                ],
            ];
            setGenderDiversityData(newGenderDiversityData);
            setRacialDiversityData(newRacialDiversityData);
        }
    }, [companyData1, companyData2]);

    return (
        <div>
            <NavBar />
            <div style={{ textAlign: 'center', margin: '20px auto', width: '50%' }}>
                <h1>Welcome to the Compare Page!</h1>
                <div style={{ margin: '10px auto' }}>
                    <input
                        type="text"
                        placeholder="Enter Company 1 Name"
                        value={companyName1}
                        onChange={(e) => {
                            setCompanyName1(e.target.value);
                            fetchSuggestionsForCompany1(e.target.value);
                        }}
                        list="suggestions1"
                    />
                    <datalist id="suggestions1">
                        {suggestions1.map((suggestion, index) => (
                            <option key={index} value={suggestion} />
                        ))}
                    </datalist>

                    <input
                        type="text"
                        placeholder="Enter Company 2 Name"
                        value={companyName2}
                        onChange={(e) => {
                            setCompanyName2(e.target.value);
                            fetchSuggestionsForCompany2(e.target.value);
                        }}
                        list="suggestions2"
                    />
                    <datalist id="suggestions2">
                        {suggestions2.map((suggestion, index) => (
                            <option key={index} value={suggestion} />
                        ))}
                    </datalist>

                    <button onClick={handleSearch} disabled={loading}>
                        {loading ? 'Loading...' : 'Compare'}
                    </button>
                </div>
            </div>
            {companyData1 && companyData2 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 style={{ marginBottom: '20px' }}>Compare {companyData1.Company} and {companyData2.Company}</h1>


                    <div style={{ marginBottom: '10px' }}>
                        <Chart
                            width={'600px'}
                            height={'400px'}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data={genderDiversityData}
                            options={{
                                chart: {
                                    title: 'Gender Diversity Comparison',
                                },
                            }}
                        />
                    </div>

                    {/* Gender Distribution Table */}
                    <table style={{ width: '80%', textAlign: 'center', marginTop: '20px', marginBottom: '50px' }}>
                        <thead>
                            <tr>
                                <th>{companyData1.Company}</th>
                                <th></th> {/* Empty header for the gender label column */}
                                <th>{companyData2.Company}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{companyData1['Female Employees']}</td>
                                <td>Female</td>
                                <td>{companyData2['Female Employees']}</td>
                            </tr>
                            <tr>
                                <td>{companyData1['Male Employees']}</td>
                                <td>Male</td>
                                <td>{companyData2['Male Employees']}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style={{ marginBottom: '10px' }}> {/* Adjust the marginBottom value as needed */}
                        <Chart
                            width={'600px'}
                            height={'400px'}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data={racialDiversityData}
                            options={{
                                chart: {
                                    title: 'Racial Diversity Comparison',
                                },
                            }}
                        />
                    </div>



                    <table style={{ width: '100%', textAlign: 'center', marginTop: '20px', marginBottom: '30px' }}>
                        <thead>
                            <tr>
                                <th>{companyData1.Company}</th>
                                <th></th> {/* Empty header for the race label column */}
                                <th>{companyData2.Company}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{companyData1['Asian Employees']}</td>
                                <td>Asian</td>
                                <td>{companyData2['Asian Employees']}</td>
                            </tr>
                            <tr>
                                <td>{companyData1['Black or African American Employees']}</td>
                                <td>Black or African American</td>
                                <td>{companyData2['Black or African American Employees']}</td>
                            </tr>
                            <tr>
                                <td>{companyData1['Hispanic or Latino Employees']}</td>
                                <td>Hispanic or Latino</td>
                                <td>{companyData2['Hispanic or Latino Employees']}</td>
                            </tr>
                            <tr>
                                <td>{companyData1['Native Hawaiian or Pacific Islander']}</td>
                                <td>Native Hawaiian or Pacific Islander</td>
                                <td>{companyData2['Native Hawaiian or Pacific Islander']}</td>
                            </tr>
                            <tr>
                                <td>{companyData1['Two or more races Employees']}</td>
                                <td>Two or more races</td>
                                <td>{companyData2['Two or more races Employees']}</td>
                            </tr>
                            <tr>
                                <td>{companyData1['White Employees']}</td>
                                <td>White</td>
                                <td>{companyData2['White Employees']}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Compare;

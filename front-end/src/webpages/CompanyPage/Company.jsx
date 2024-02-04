import React from 'react';
import NavBar from '../../components/NarBar/NavBar';
import { Container, Row, Col } from 'react-bootstrap';
import Chart from 'react-google-charts';
import { useLocation } from 'react-router-dom';
import photo from '../../images/NavLogo.png';

function Company() {
    const location = useLocation();
    const companyData = location.state?.data || {};

    const raceData = [
        ['Race', 'Percentage'],
        ['American Indian or Alaskan Native', parseFloat(companyData['American Indian or Alaskan Native']) || 0],
        ['Asian', parseFloat(companyData['Asian Employees']) || 0],
        ['Black', parseFloat(companyData['Black or African American Employees']) || 0],
        ['White', parseFloat(companyData['White Employees']) || 0],
        ['Other', parseFloat(companyData['Two or more races Employees']) || 0],
    ];

    const genderData = [
        ['Gender', 'Percentage'],
        ['Female', parseFloat(companyData['Female Employees']) || 0],
        ['Male', parseFloat(companyData['Male Employees']) || 0],
    ];

    function parseStringToObject(inputString) {
        if (typeof inputString !== 'string') {
            throw new Error('Input must be a string');
        }

        // Remove curly braces and single quotes
        const cleanedString = inputString.slice(1, -1);

        // Split the string into key-value pairs
        const keyValuePairs = cleanedString.split(", ");

        // Create an object to store the parsed values
        const parsedObject = {};

        // Iterate through key-value pairs and populate the object
        keyValuePairs.forEach(pair => {
            const [key, value] = pair.split(": ");
            const cleanedKey = key.trim().slice(1, -1); // Remove potential single quotes from keys
            const cleanedValue = value.trim().slice(1, -1); // Remove potential single quotes from values
            parsedObject[cleanedKey] = cleanedValue;
        });

        return parsedObject;
    }

    const parsedObject = parseStringToObject(JSON.stringify(companyData.Ratings));

    return (
        <div style={{ fontFamily: 'Gotham, sans-serif' }}>
            <NavBar />

            <Container fluid className="my-4" style={{ width: '80%' }}>
                <Row>
                    <Col md={6} lg={6} xl={6}>
                        <Row className="mb-2"> {/* Reduce the margin-bottom */}
                            <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                                <img src={photo} alt="extra" style={{ maxWidth: '200px', borderRadius: '10%' }} />
                            </Col>
                            <Col xs={12} md={4} className="d-flex align-items-center justify-content-center">
                                <h1 className="display-1" style={{ color: 'black' }}>{companyData.Company}</h1>
                            </Col>
                        </Row>

                        <hr />
                        <div style={{ padding: '8px', background: "#E0D9F1" }}>
                            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                                <div>Rating: {companyData.Rating}</div>
                                <div>Work/Life Balance: {parsedObject["'Work/Life Balance"]}</div>
                                <div>Compensation/Benefits: {parsedObject["Compensation/Benefits"]}</div>
                                <div>Job Security/Advancement: {parsedObject["Job Security/Advancement"]}</div>
                                <div>Management: {parsedObject['Management']}</div>
                                <div>Culture: {parsedObject['Culture'].slice(0, -1)}</div>
                            </div>
                        </div>
                    </Col>

                    <Col md={6} lg={6} xl={6} className="d-flex flex-column align-items-center">
                        <h1 className="display-6" style={{ color: 'black' }}>Data Points</h1>
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={raceData}
                            options={{
                                title: 'Company Diversity',
                                legend: { position: 'bottom' },
                            }}
                        />
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={genderData}
                            options={{
                                title: 'Gender Diversity',
                                legend: { position: 'bottom' },
                            }}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Company;

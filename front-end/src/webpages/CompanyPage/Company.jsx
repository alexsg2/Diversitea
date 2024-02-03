import React from 'react';
import NavBar from '../../components/NarBar/NavBar';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Chart from 'react-google-charts';
import { useLocation } from 'react-router-dom';

function Company() {
    const location = useLocation();
    const companyData = location.state?.data || {};

    // Extracting relevant data for the charts
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

    return (
        <div style={{ fontFamily: 'Gotham, sans-serif' }}>
            <NavBar />

            <Container className="my-4" style={{ width: '80%' }}>
                <Row>
                    <Col md={6}>
                        <div
                            style={{
                                backgroundColor: '#e0e0e0',
                                border: '1px solid #ccc',
                                height: '400px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '50px',
                            }}
                        >
                            Image Container
                        </div>
                        <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>{companyData.Company}</h2>
                        <div className="mt-3" style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <Button variant="primary">Compare</Button>
                        </div>
                    </Col>

                    <Col md={6}>
                        <h2 style={{ textAlign: 'center' }}>Data Points</h2>
                        <hr />
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

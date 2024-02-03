import React from 'react';
import NavBar from '../../components/NarBar/NavBar'; // Import NavBar component
import { Container, Row, Col, Button } from 'react-bootstrap'; // Import Container, Row, Col, and Button from react-bootstrap
import Chart from 'react-google-charts'; // Import Chart component from react-google-charts

function Company() {
    // Data for race and gender charts
    const raceData = [
        ['Race', 'Percentage'],
        ['White', 60],
        ['Black', 20],
        ['Asian', 10],
        ['Other', 10],
    ];
    const genderData = [
        ['Gender', 'Percentage'],
        ['Female', 40],
        ['Male', 60],
    ];

    return (
        <div style={{ fontFamily: 'Gotham, sans-serif' }}>
            <NavBar /> {/* Render NavBar component */}

            <Container className="my-4" style={{ width: '80%' }}>
                <Row>
                    {/* Left side with container and button */}
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
                        <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Company Name</h2>
                        <div className="mt-3" style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <Button variant="primary">Compare</Button>
                        </div>
                    </Col>

                    {/* Right side with the pie chart and text description */}
                    <Col md={6}>
                        {/* Render PieChart for Company Diversity */}
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
                        {/* Render PieChart for Gender Diversity */}
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

export default Company; // Export the Company component

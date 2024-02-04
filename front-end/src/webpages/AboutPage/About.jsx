import React from 'react';
import NavBar from '../../components/NarBar/NavBar';  // Assuming a typo in the component name
import { Container, Row, Col } from 'react-bootstrap';
import photo from '../../images/NavLogo.png';

function About() {
    return (
        <div>
            <NavBar />
            <Container className="d-flex align-items-center justify-content-center" style={{ width: '80%', margin: '8em auto' }}>
                <Row>
                    <Col md={6} lg={6} xl={6}>
                        <h1>About Us</h1>
                        <hr />
                        <p>
                            Diversitea was born out of a shared passion for promoting diversity and inclusion in the corporate world. Our team recognized the need for a platform that goes beyond conventional company insights, focusing specifically on the experiences of women and individuals from diverse racial backgrounds.
                        </p>
                        <p>
                            We aim to empower individuals to make informed decisions by providing comprehensive information about companies that actively support and uplift these groups. Diversitea is more than just a tool; it's a commitment to fostering a business environment where everyone has equal opportunities.
                        </p>
                        <p>
                            Join us in our mission to celebrate and support companies that prioritize diversity and inclusivity.
                        </p>
                    </Col>
                    <Col md={6} lg={6} xl={6} className="text-center">
                        <img src={photo} alt="extra" style={{ width: '80%', borderRadius: '10%' }} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default About;

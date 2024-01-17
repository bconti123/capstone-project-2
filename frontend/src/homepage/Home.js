import React from "react";
import { Container, Header, Segment } from 'semantic-ui-react'

const Home = () => {
    return (
        <Container fluid>
        <Segment textAlign="center" vertical>
            <Header as="h1">Welcome to My Website</Header>
            <p>
                This is a simple homepage created using Semantic UI React.
            </p>
        </Segment>

        {/* Add more sections or components as needed */}
        </Container>
    )
}

export default Home;
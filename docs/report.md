# Project Report: Ed-Cred

## Abstract
Ed-Cred is an innovative project aimed at revolutionizing student engagement and participation in college activities. The project focuses on building a comprehensive system that records and rewards every student's involvement in various college events and projects. It employs cutting-edge technologies like blockchain and QR codes to ensure data integrity and security. The system also facilitates the seamless integration of collaborative project development by leveraging GitHub and the blockchain reward system.

## Objectives
1. **Student Activity Recording**: Develop a system to record each student's participation in college events and activities.
2. **Reward System**: Implement a blockchain-based reward system to incentivize students to actively engage in various activities.
3. **Project Tracking**: Create a system to track and make available all student projects undertaken in the university for future reference.
4. **Dynamic Certificate Generation**: Automatically generate and distribute certificates to students for their event participation.
5. **QR Code Certificate Verification**: Provide a QR-code based verification system to validate the authenticity of certificates.
6. **Collaborative Project Development**: Integrate with GitHub and the blockchain reward system to foster collaborative project development.

## Project Flow
The project follows the following workflows to achieve its objectives:

### Event Flows
1. Clubs initiate new events and provide event details, organizers, participants, and event reports.
2. Faculty in charge verifies the event information for authenticity and accuracy.
3. Once verified, the data becomes visible on the student's profile, and participants can download their certificates.
4. Certificates include unique QR codes that enable direct verification from the server.
5. An online declaration form allows students to claim attendance for an event.
6. Attendance claims undergo multi-level approval before being accepted or rejected.

### Project Flow
1. Students can create new projects within the system.
2. Other students have the option to join projects as collaborators.
3. Project submissions undergo verification before becoming publicly viewable.

## Technologies Used and Rationale
The project utilizes the following technologies for their specific advantages:

1. **Django**: Chosen for its stability, high scalability, and compatibility with Python modules, making it ideal for building a robust backend system.
2. **React**: Selected for its component reusability, efficient data handling, and ease of setting up a proxy. Additionally, its compatibility with Vercel facilitates straightforward hosting.
3. **Ngrok**: Used as a development server for remote work, providing convenience during the development phase.
4. **mkcert**: Utilized for generating certificates to enable the server to run in HTTPS, ensuring secure data transmission.
5. **Git & GitHub**: Employed for version management and deployment pipeline, along with Vercel compatibility for efficient deployment.

## Current Investigations
The project is actively exploring the following areas:

1. **Securing Blockchain**: Ensuring the blockchain implementation is robust and resistant to potential security threats.
2. **Scaling the Application**: Preparing the system to handle an increasing number of users and data efficiently.
3. **Microservice Architecture**: Exploring the adoption of a microservices approach for enhanced flexibility and maintainability.
4. **Database Query Optimization**: Optimizing database queries to improve system performance and responsiveness.
5. **Securing User Data**: Enhancing the security measures to safeguard user data and privacy.

## Current Work
The development team is actively working on the following aspects:

1. **Event Data Collection and Verification**: Implementing the functionality to collect and verify event-related information.
2. **Attendance Claim and Declaration Verification**: Creating the system to validate attendance claims and online declaration forms.
3. **Project Details Capturing and Verification**: Building the mechanism to capture and verify project details.
4. **Backend Implementation of Private Blockchain**: Developing the private blockchain for the reward system.
5. **Dynamic Certificate Generation and Verification**: Setting up the automated certificate generation and verification process.

## Work in Progress
The team is currently making progress on the following features:

1. **Automatic Crypto Distribution for Reward**: Working on automating the distribution of rewards to students through the blockchain.
2. **GitHub Integration for Collaborative Environment**: Integrating the system with GitHub to facilitate collaborative project development.

## Conclusion
The Ed-Cred project aims to create a comprehensive system that encourages and rewards student engagement in college activities. By leveraging blockchain technology, QR codes, and GitHub integration, the project ensures data authenticity, security, and collaborative development. The ongoing investigations and developments will further enhance the project's capabilities and contribute to its success in motivating and empowering students in their academic journey.

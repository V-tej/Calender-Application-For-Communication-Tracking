Calendar Application for Communication Tracking

This project is designed to help organizations maintain strong professional relationships by efficiently tracking communication with companies. Built with React, the application provides a centralized platform to log past interactions, schedule future communications, and ensure follow-ups are timely and consistent.

Key Features

Admin Module
Company Management:
Add, edit, and delete companies with details such as name, location, LinkedIn profile, emails, phone numbers, comments, and communication periodicity.
Communication Method Management:
Define and manage communication methods with attributes like name, description, sequence, and mandatory flag.
Default communication methods:
LinkedIn Post
LinkedIn Message
Email
Phone Call
Other
User Module
Dashboard:
View companies in a grid format with columns for company name, last five communications, and next scheduled communication.
Color-coded highlights:
Red: Overdue communication.
Yellow: Communication due today.
Interactive features, including hover effects to display notes for completed communications.
Communication Action:
Log new communications by selecting a company, specifying the communication type, inputting the date, and adding notes.
Notifications:
Dedicated sections for overdue communications and tasks due today.
Notification icon with a badge showing the count of pending tasks.
Calendar View:
Visualize past communications and manage upcoming schedules.
Reporting and Analytics Module (Optional)
Communication Frequency Report:
Charts showing the usage frequency of each communication method.
Engagement Effectiveness Dashboard:
Metrics to track which communication methods are most effective.
Overdue Communication Trends:
Trendline or heatmap for overdue communications.
Downloadable Reports:
Export data in PDF or CSV formats.
Real-Time Activity Log:
Live feed displaying all communication activities.
Available Scripts
In the project directory, run the following commands:

npm install --legacy-peer-deps
Installs the required dependencies for the application.

npm start
Starts the application in development mode.
Open http://localhost:3000 in your browser. The page reloads automatically when changes are made, and lint errors are displayed in the console.

npm test
Launches the test runner in interactive watch mode.
Refer to the Create React App documentation on testing for more details.

npm run build
Builds the application for production to the build folder. The build is optimized for performance and is minified for deployment.

npm run eject
Note: This action is irreversible. It provides full control over the build tools and configuration files.

Learn More
Create React App Documentation: https://facebook.github.io/create-react-app/docs/getting-started
React Documentation: https://reactjs.org/
Deployment
For information on deploying the application, refer to the deployment documentation.

Troubleshooting
If npm run build fails to minify, refer to the troubleshooting guide.

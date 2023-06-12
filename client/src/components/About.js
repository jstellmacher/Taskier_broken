import React from 'react';

const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(to bottom, #2BB6AC, #0E6655)',
};

const cardStyles = 'bg-white p-8 rounded-lg shadow-lg';
const titleStyles = 'text-2xl font-bold mb-4';
const textStyles = 'text-lg mb-4';

function About() {
  return (
    <div style={containerStyles}>
      <div className={cardStyles}>
        <h1 className={titleStyles}>About Taskier</h1>
        <p className={textStyles}>
          Taskier is a superb task management app designed to streamline and simplify your daily workflow. With its intuitive interface and powerful features, Taskier empowers users to efficiently manage their tasks and boost productivity.
        </p>
        <p className={textStyles}>
          One of Taskier's standout features is its user-centric approach. It provides a personalized experience by allowing users to create an account, access their tasks, and track their progress. Whether you're a professional seeking better task organization or an individual striving to stay on top of personal commitments, Taskier offers a seamless solution tailored to your needs.
        </p>
        <p className={textStyles}>
          In today's fast-paced world, where time management is essential, Taskier is a much-needed tool. With the increasing complexity of work and personal responsibilities, keeping track of tasks and staying organized can be overwhelming. Taskier simplifies this process by providing a centralized platform where users can effortlessly create, manage, and prioritize tasks.
        </p>
        <p className={textStyles}>
          The ability to assign tasks to specific users, set deadlines, and track progress fosters collaboration and ensures effective teamwork. Moreover, Taskier's real-time updates and notifications keep users informed about task updates, ensuring that nothing falls through the cracks. By leveraging Taskier, individuals and teams can achieve better task management, improve efficiency, and ultimately accomplish more in less time.
        </p>
      </div>
    </div>
  );
}

export default About;

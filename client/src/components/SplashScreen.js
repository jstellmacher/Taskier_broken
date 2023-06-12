import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import taskierImage from '../assets/taskier.png';

const SplashScreen = () => {
  const history = useHistory();

  useEffect(() => {
    // Simulate a delay of 5 seconds
    const timer = setTimeout(() => {
      history.push('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <div>
      <img src={taskierImage} alt="Taskier" style={{ height: '80%' }} />
      <p>Loading...</p>
    </div>
  );
};

export default SplashScreen;

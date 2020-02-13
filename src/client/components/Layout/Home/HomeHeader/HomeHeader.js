import React from 'react';
import useHttp from 'root/hooks/useHttp';

import './HomeHeader.css';

const HomeHeader = () => {
  const [isLoading, fetchedData] = useHttp('/api/getUsername', []);
  const userName = fetchedData ? fetchedData.username : '';

  let content = <p>Loading user...</p>;

  if (!isLoading && userName) {
    content = <h1>{`Hello world (and ${userName})`}</h1>;
  } else if (!isLoading && !userName) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default HomeHeader;

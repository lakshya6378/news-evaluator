import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../context/Authcontext';

import axios from 'axios';
import './history.scss';

function History() {
  const [history, setHistory] = useState([]);
  const { currentUser } = useContext(Authcontext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/history?id=${currentUser.id}`);
        if (response.data.Status === "Success") {
          setHistory(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <div className='historycontainer'>
        <h1 className="history-head">History for user {currentUser.name}</h1>
        
      {history.length ? (1 &&
        <div className="filedetail">
          <div className="filenameheader">Filename</div>
          <div>Download option</div>
        </div>&&
        history.map((fileunit) => (
          <div className="filedetail" key={fileunit.filename}>
            <div className="filename">{fileunit.filename}</div>
            <a href={fileunit.fileurl} className='fileurl'>Download</a>
          </div>
        ))
      ) : (
        <div>No history found for the current user</div>
      )}
    </div>
  );
}

export default History;

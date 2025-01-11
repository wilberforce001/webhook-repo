import React, { useState, useEffect } from 'react';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 15000)
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Github Events</h1>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.action === 'push' && `${event.author} pushed to ${event.to_branch} on ${event.timestamp}`}
            {event.action === 'pull_request' && `${event.author} submitted a pull request from ${event.from_branch} to ${event.to_branch} on ${event.timestamp}`}
            {event.action === 'merge' && `${event.author} merged branch ${event.from_branch} to ${event.to_branch} on ${event.timestamp}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
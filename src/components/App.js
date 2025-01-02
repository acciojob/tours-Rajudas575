import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
import toursData from "./data";
import 'regenerator-runtime/runtime';

const App = () => {
    const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        // Simulate API fetch with delay
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve(toursData), 1000)
        );
        setTours(response);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
      setLoading(false);
    };

    fetchTours();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  if (loading) {
    return <Loading />;
  }
    
    if (tours.length === 0) {
    return (
      <div className="no-tours">
        <h2>No Tours Left</h2>
        <button className="btn-refresh" onClick={() => setTours(toursData)}>
          Refresh
        </button>
      </div>
    );
  }
    return(
      <main id="main">
         <Tours tours={tours} removeTour={removeTour} />
      </main>
    )
}
export default App;

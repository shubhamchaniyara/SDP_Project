// // frontend/src/components/Client.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import './Client.css';

// const Client = () => {
//     let headers = new Headers();

//     headers.append('Content-Type', 'application/json');
//     headers.append('Accept', 'application/json');
//     headers.append('Origin','http://localhost:3000');
//   const [query, setQuery] = useState('');
//   const [asin, setAsin] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (event) => {
//     setQuery(event.target.value);
//   };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.get(`http://localhost:5000/search?query=${encodeURIComponent(query)}`);
//       setAsin(response.data.asin);
//       setError('');
//     } catch (error) {
//       setAsin('');
//       setError('Product not found');
//     }
//   };

//   return (
//     <div className='container'>
//         <label htmlFor="searchProduct">Search Product to generate product review summary</label>
//       <form onSubmit={handleSubmit} className='form'>
//         <input type="text" className="input"value={query} onChange={handleChange} />
//         <button type="submit" className='button'>Search</button>
//       </form>
//       {error && <p>{error}</p>}
//       {asin && <p>ASIN: {asin}</p>}
//       {/* <button onClick={handle}>search</button> */}
//     </div>


//   );
// };

// export default Client;



// import React, { useState } from 'react';
// import axios from 'axios';
// import './Client.css';

// const Client = () => {
//   const [query, setQuery] = useState('');
//   const [asin, setAsin] = useState('');
//   const [data, setData] = useState(null); // State to store fetched data
//   const [error, setError] = useState('');

//   const handleChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.get(`http://localhost:5000/search?query=${encodeURIComponent(query)}`);
//       const responseData = response.data;

//       setAsin(responseData.asin);
//       setData(responseData.data); // Set the fetched data in state
//       setError('');
//     } catch (error) {
//       setAsin('');
//       setData(null); // Reset data state on error
//       setError('Product not found');
//     }
//   };

//   return (
//     <div className='container'>
//       <label htmlFor="searchProduct">Search Product to generate product review summary</label>
//       <form onSubmit={handleSubmit} className='form'>
//         <input type="text" className="input" value={query} onChange={handleChange} />
//         <button type="submit" className='button'>Search</button>
//       </form>
//       {error && <p>{error}</p>}
//       {asin && <p>ASIN: {asin}</p>}
//       {data && (
//         <div>
//           <h3>Fetched Data</h3>
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Client;


import React, { useState } from 'react';
import axios from 'axios';
import './Client.css';

const Client = () => {
  const [query, setQuery] = useState('');
  const [asin, setAsin] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/search?query=${encodeURIComponent(query)}`);
      const responseData = response.data;

      setAsin(responseData.asin);
      setSummary(responseData.ans); // Set the summary in state
      setError('');
    } catch (error) {
      setAsin('');
      setSummary(''); // Reset summary state on error
      setError('Product not found');
    }
  };

  return (
    <div className='container'>
      <label htmlFor="searchProduct">Search Product to generate product review summary</label>
      <form onSubmit={handleSubmit} className='form'>
        <input type="text" className="input" value={query} onChange={handleChange} />
        <button type="submit" className='button'>Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {asin && <p className="asin">ASIN: {asin}</p>}
      {summary && (
        <div className="summary-container">
          <h3 className="summary-title">Product Review Summary</h3>
          <p className="summary-text">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Client;


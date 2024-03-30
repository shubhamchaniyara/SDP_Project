// import express from 'express';
// import axios from 'axios';
// import cors from 'cors';

// const app = express();
// const PORT = 5000;

// app.use(cors());


// const callPythonScript = async (asin) => {

//   try {
//     console.log(asin);
//     const response = await fetch(`https://5000-nevilajani-flaskhellowo-ajju8cly8zu.ws-us110.gitpod.io/?asin=${asin}`);
//     const data = await response.json();
//     console.log(data);
   
//   } catch (error) {
//     console.error(error);
    
//   }
// };

// app.get('/search', async (req, res) => {
//   const { query } = req.query;

//   const options = {
//     method: 'GET',
//     url: 'https://real-time-amazon-data.p.rapidapi.com/search',
//     params: {
//       query,
//       page: '1',
//       country: 'IN',
//       category_id: 'aps'
//     },
//     headers: {
//       'X-RapidAPI-Key': '7cc786fec2mshe40027f5119475dp10d449jsnfcffbb0b9d21',
//       'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
//     }
//   };

//   try {
//     const response = await axios.request(options);
//     console.log(response.data);

//     const products = response.data.data.products;
//     if (products.length > 0) {
//       const asin = products[0].asin;
//       if (asin) {
//        console.log("abcd");
//         await callPythonScript(asin);
//         res.json({ asin });
//         return;
//       }
//     }

//     res.status(404).json({ error: "Product not found" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server  is running on port ${PORT}`);
// });



import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());

const callPythonScript = async (asin) => {
  try {
    const response = await fetch(`https://5000-nevilajani-flaskhellowo-ajju8cly8zu.ws-us110.gitpod.io/?asin=${asin}`);
    const data = await response.json();
    console.log(data);
    return data; // Return the data fetched from the Python script
  } catch (error) {
    console.error(error);
    throw error; // Throw the error to handle it in the calling function
  }
};

app.get('/search', async (req, res) => {
  const { query } = req.query;

  const options = {
    method: 'GET',
    url: 'https://real-time-amazon-data.p.rapidapi.com/search',
    params: {
      query,
      page: '1',
      country: 'IN',
      category_id: 'aps'
    },
    headers: {
      'X-RapidAPI-Key': '7cc786fec2mshe40027f5119475dp10d449jsnfcffbb0b9d21',
      'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const products = response.data.data.products;
    if (products.length > 0) {
      const asin = products[0].asin;
      if (asin) {
        console.log("try"+asin);
        const data = await callPythonScript(asin);
        console.log("try"+data.summary);
        const ans=data.summary;
        //res.json({ asin, ans}); 
        if (data.summary == 'april 1 marks the first day of a three-day holiday in switzerland.') {
           ans="Review is Not found for this Product";
          res.json({ asin, ans}); // Send a specific response if condition is met
        } else {
          res.json({ asin, ans}); // Send a different response if condition is not met
        }
        return;
      }
    }

    res.status(404).json({ error: "Product not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

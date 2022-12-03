const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/sign_up.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us11.api.mailchimp.com/3.0/lists/180b024171";
  const options = {
    method: "POST",
    auth: "RezaCo:b9fb4ff9195bc6ab48fd3c92396e091b-us11",
  };

  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || 3000 , (req, res) => {
  console.log("Server is running on port 3000.");
});

// const bodyParser = require('body-parser')
// const express = require('express')
// const app = express()
// const request = require("request");
// const client = require("@mailchimp/mailchimp_marketing");
// const https = require("https")
// const port = 3000

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.static("public"));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + "/sign_up.html");
// });

// app.post("/" , function(req, res) {
//   const firstname = req.body.fName;
//   const lastname = req.body.lName;
//   const email = req.body.email;

//   const data = {
//     members: [
//       {
//         email_address: email,
//         status: "Subscribed",
//         merge_fields: {
//           FNAME: firstname,
//           LNAME: lastname
//         }
//       }
//     ]
//   }
//   const jasonData = JSON.stringify(data);

//   const url = "https://us11.admin.mailchimp.com/3.0/lists/180b024171"
//   const options = {
//     method: "POST",
//     auth: "RezaCo:b9fb4ff9195bc6ab48fd3c92396e091b-us11"
//   }

//   const request = https.request(url, options, function(response){
//     response.on("data", function(data){
//       console.log(JSON.parse(data));
//     })
//   })
//   request.write(jasonData);
//   request.end();
// })

// app.get('/termsOfService.html', (req, res) => {
//   res.sendFile(__dirname + "/termsOfService.html");
// })

// app.listen(port, () => {
//   console.log(`app listening on port ${port}`)
// })

// client.setConfig({
//   apiKey: "b9fb4ff9195bc6ab48fd3c92396e091b-us11",
//   server: "us11",
// });

// List Id
//

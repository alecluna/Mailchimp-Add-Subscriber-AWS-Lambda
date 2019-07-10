const axios = require("axios");

exports.handler = async event => {
  if (event.queryStringParameters && event.queryStringParameters.email) {
    let emailAddress = event.queryStringParameters.email;
    let name;
    let phoneNumber;

    if (event.queryStringParameters.name) {
      name = event.queryStringParameters.name;
    } else name = "";

    if (event.queryStringParameters.phoneNumber) {
      phoneNumber = event.queryStringParameters.phoneNumber;
    } else phoneNumber = "";

    let url = `https://us20.api.mailchimp.com/3.0/lists/${YOUR.AUDIENCE.LIST}`;
    let data = {
      members: [
        {
          email_address: emailAddress,
          status: "subscribed",
          merge_fields: {
            NAME: name,
            PHONE: phoneNumber
          }
        }
      ]
    };

    let resPost = axios
      .post(url, JSON.stringify(data), {
        headers: {
          Authorization: `auth ${API.KEY.HERE}-us20`, //us20 is an example datacenter from mailchimp
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });

    let message = {
      email: emailAddress,
      name: name,
      phoneNumber: phoneNumber,
      resPost: resPost
    };

    let response = {
      statusCode: 200,
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, x-api-key",
        "Access-Control-Allow-Methods": "GET, OPTIONS, PUT, POST, "
      }
    };

    return response;
  } else {
    return null;
  }
};

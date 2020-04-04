/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */
'use strict';
const AWS = require("aws-sdk");
const region = process.env.REGION
const docClient = new AWS.DynamoDB.DocumentClient({ region })
const listDB = async data => {
  try {
    const { limit: limit = 20, nextToken } = data
    let params = {
      TableName: 'project-backend',
      expressionAttributeNames: {
        "#name": "name",
        "#type": "type",
        "#status": "status",
        "#zone": "zone",
        "#url": "url"
      },
      ProjectionExpression: "id, #name, description, #type, #status, field, country, city, #zone, contact_email, contact_firstname, contact_lastname, contact_entity, #url, pubId",
      limit
    }
    if (nextToken) {
      params.ExcusiveStartKey = JSON.parse(
        Buffer.from(nextToken, 'base64').toString()
      )
    }
    const {
      Items: items,
      LastEvaluatedKey: lastEvaluatedKey
    } = await docClient.scan(params).promise()
    const newToken = lastEvaluatedKey ?
      Buffer.from(JSON.stringify(lastEvaluatedKey)).toString('base64') :
      null
    return {
      nextToken: newToken,
      items
    }
  } catch (error) {
    console.log(error);
    return error

  }

}
exports.handler = async (event, context) => {
  try {
    console.log(event);
    const response = await listDB(event)
    console.log(response);
    context.done(null, response)
  } catch (error) {
    context.done(error)

  }

};

/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */
'use strict';
const AWS = require("aws-sdk");
const uuid = require('uuid')
const completeUrl = "https://www.google.com";
const axios = require('axios');
const reCapUrl = "https://www.google.com/recaptcha/api/siteverify";// we got this from personal reCaptcha Google Page
const reCaptchaSecret = "6Lc_xuUUAAAAAPpgL3kPIXUA0PLxfyRWqpJdCh3A";
const region = process.env.REGION
const docClient = new AWS.DynamoDB.DocumentClient({ region })
const JWT = require('jsonwebtoken')
const seed = "MIICXAIBAAKBgQC / dWfpdakPLKGvqVM1gwVzrnUNIWkah07NLH0UBOA2en13EX3EypygCFTe4 + 4PvxHR7qLkDbwySeIN7bw99TpbStv + BlmIATACLl0CWQTfmBD4 + tGwfr4cbpVFOYUbqQWAX9NuLRz3J5yCYfT52 + vSDUEhXWSZMCco4h0x2iATMQIDAQABAoGAZGzo / IRDETqP9NwUUVVQXsV7kE + eGdQveV + EnCOSmADYHsSF + 9trHGZCXkegb5IBfuR1fLnXpWkrsbKpsrYWzTGGkjLOIsX + 0HMVzhvLh0XAZboXDO8lvRPW / dUWwNDOqhKe5oLvveq97Sj6sH8SqRFcNa0sCD2f9cwY9pWwsgECQQD + p15D / HEKOj / n7aTqmJoLN7VZ0WsX + nPjS6hoM2Xdzj6OOIQBswlg3xLLZYlsBbBicjkyeWdd0D / 8kv + 3DjTZAkEAwHiDcz5dxTOrnzeIbwGqpFMDNU + TGj + LwcUK4nFrn9ka2KC + qkPaZT6J7ddHBLKJieH6gcS6PUcYtNDGIon6GQJBAPEQz5PcbcYYzlZoCS5rt6fW3L5iGNdiKEKLZKj / vvbyPxWzOoPBUKd7hPc275hq6kbHio3Vj5ynf2tCXQCVWkECQB1PPNVD3gu1vqDUWBZvbojvi0GHCKOqoaG0W9 / 33afN6 + SpNd + /zXY1e9OYQNxaQ8+Xdgpk5ueF + CEw2btQv6ECQGf / ubhQFKB + Xem5uB6UfoGR1ttBhzv4Jy3sV1lJ2YAcrhaZAxe94Gm8mD1F5bNRNCI2MG0Yf5YSVeSvBiPeRGc ="
const insertDB = async data => {
  try {
    console.log("insert DB");
    data.id = uuid.v4()
    data.createdAt = new Date().toISOString()
    data.updatedAt = new Date().toISOString()
    data.editKey = JWT.sign({
      type: 'edit',
      id: data.id
    }, seed)
    data.verifyKey = JWT.sign({
      type: 'verify',
      id: data.id
    }, seed)
    data.status = "NEW"
    console.log(data);
    let params = {
      TableName: 'project-backend',
      Item: data
    }
    await docClient.put(params).promise()
    return data
  } catch (error) {
    console.log(error);
    return error

  }

}
exports.handler = async (event, context) => {
  try {
    console.log(event.arguments);


    // verify the result by POSTing to google backend with secret and
    // frontend recaptcha token as payload
    let verifyResult = await axios.post(reCapUrl, {
      secret: reCaptchaSecret,
      response: event.arguments.input.recaptcha
    });
    if (verifyResult.status === 200) {
      console.log("Recaptcha OK");
      delete event.arguments.input.recaptcha
      const response = await insertDB(event.arguments.input)
      console.log(response);
      context.done(null, response.id)

    } else {
      console.log("reCaptcha check failed. Most likely SPAM.");
      throw new Error(`Failed to pass the recaptcha test`)
    }
  } catch (error) {
    console.log(error);

    context.done(error)
  }
};

/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */
'use strict';
const AWS = require("aws-sdk");
const uuid = require('uuid')
const completeUrl = "https://www.google.com";
const axios = require('axios');
const reCapUrl = "https://www.google.com/recaptcha/api/siteverify";// we got this from personal reCaptcha Google Page
const reCaptchaSecret = "6Lc_xuUUAAAAAPpgL3kPIXUA0PLxfyRWqpJdCh3A";
const region = process.env.REGION
const docClient = new AWS.DynamoDB.DocumentClient({ region })
const insertDB = async data => {
  try {
    data.createdAt = new Date().toISOString()
    data.updatedAt = new Date().toISOString()
    data.sent = false
    data.id = uuid.v4()
    console.log(data);
    let params = {
      TableName: 'contact-backend',
      Item: data
    }
    await docClient.put(params).promise()
    return data
  } catch (error) {
    console.log(error);
    return error

  }

}
exports.handler = async (event, context) => {
  try {
    console.log("args", event.arguments);
    console.log(process.env);
    console.log("AWS VERSION", AWS.VERSION);

    const {
      name,
      email,
      subject,
      message,
      relatedProjectId,
      recaptcha
    } = event.arguments.input
    // verify the result by POSTing to google backend with secret and
    // frontend recaptcha token as payload
    let verifyResult = await axios.post(reCapUrl, {
      secret: reCaptchaSecret,
      response: recaptcha
    });
    if (verifyResult.status === 200) {
      console.log("Recaptcha OK");
      const response = await insertDB({
        name,
        email,
        subject,
        message,
        relatedProjectId
      })
      console.log(response);
      context.done(null, response.id)

    } else {
      console.log("reCaptcha check failed. Most likely SPAM.");
      throw new Error(`Failed to pass the recaptcha test`)
    }
  } catch (error) {
    context.done(error)
  }
};

// services/api/message.js

import request from '../../shared/lib/ClientRequest';

const subscriptionKey = "b78b0f074a064615b589403f150053ae";
let uriBase = "https://westeurope.api.cognitive.microsoft.com/vision/v1.0/ocr?";
let uriHandWriting = "https://westeurope.api.cognitive.microsoft.com/vision/v1.0/recognizeText?handwriting";

let params = {
  headers: {
    'Content-Type':'application/json',
    'Ocp-Apim-Subscription-Key' : subscriptionKey
  }
};

var params_url= {
  "visualFeatures": "Categories,Description,Color",
  "details": "",
  "language": "en",
}

let str = Object.entries(params_url).map(([key, val]) => `${key}=${val}`).join('&');

uriBase = uriBase + str
function create(url,mode) {
  return request({
    url:    mode ? uriHandWriting : uriBase,
    method: 'POST',
    data:   {
      url
    },
    headers: {
      'Content-Type':'application/json',
      'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
  });
}

const CloudService = {
  create //, update, delete, etc. ...
}

export default CloudService;

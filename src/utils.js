import axios from "axios";
import OAuth from "oauth-1.0a";

/**
 * @classdesc Represents an API call.
 * @class
 * @abstract
 */
export class APICall {
  /**
   * Create a APICall.
   * @constructor
   * @param {string} baseURL - A string with the base URL for account.
   * @param {string} url - A string with the name of the API method.
   * @param {string} method - A string with the method of the API call.
   * @param {Object} consumerToken - An object with both the public and secret consumer keys.
   * @param {Object} accessToken - An object with both the public and secret access keys.
   * @param {Object} [data={}] - An object containing the query parameters.
   */
  constructor(
    baseURL,
    url,
    method,
    consumerToken = null,
    accessToken = null,
    data = {}
  ) {
    this.requestData = {};
    this.callURL = this.requestData.url = baseURL + url;
    this.method = this.requestData.method = method;
    this.consumerToken = consumerToken;
    this.accessToken = accessToken;
    this.data = data;
  }

  /**
   * Creates the Authorization header.
   * @return {Object} header - Returns an object with the Authorization header and its signed content.
   */
  createAuthHeader() {
    const oauth = new OAuth({
      consumer: {
        public: this.consumerToken.public,
        secret: this.consumerToken.secret
      }
    });
    return oauth.toHeader(oauth.authorize(this.requestData, this.accessToken));
  }

  /**
   * Encode the data object to URI.
   * @return {string} - Returns the URI string equivalent to the data object of the request.
   */
  urlEncodeData() {
    let requestBody = "";
    for (const key of Object.keys(this.data)) {
      const value = this.data[key];
      if (value === undefined) {
        delete this.data[key];
      } else {
        requestBody += `${encodeURIComponent(key)}=${encodeURIComponent(
          value
        )}&`;
      }
    }
    requestBody = requestBody.slice(0, -1);
    return requestBody;
  }

  /**
   * Fetch the information from the API.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  send() {
    const paramEncoded = this.urlEncodeData();
    this.requestData.data = this.data;
    const headers = this.createAuthHeader();
    let body = "";
    if (this.method === "POST") {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
      body = paramEncoded;
    } else if (
      Object.keys(this.data).length &&
      this.data.constructor === Object
    ) {
      this.callURL += "?";
      this.callURL += paramEncoded;
    }

    return axios(this.callURL, {
      method: this.method,
      data: body,
      headers
    }).then(response => {
      if (response.status >= 400) {
        // check for 4XX, 5XX, etc
        return Promise.reject({
          status: response.status,
          message: response.statusText
        });
      }
      if (response.status >= 200 && response.status <= 202) {
        return response.data;
      }
      return {};
    });
  }
}

/**
 * Rejects the request.
 * @return {Promise} error - Returns a Promise with the details for wrong base URL.
 */
export function rejectURL() {
  return Promise.reject({
    status: 0,
    message: "The base URL provided is not valid"
  });
}

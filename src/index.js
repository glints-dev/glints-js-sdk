import {APICall, rejectURL} from "./utils";

export default class Glints {
  /**
   * Create Glints SDK.
   * @constructor
   * @param {String} options.consumer.public - The public consumer key.
   * @param {String} options.consumer.secret - The consumer secret.
   * @param {String} options.accessToken.public - The access token.
   * @param {String} options.accessToken.secret - The access token secret.
   * @param {String} options.baseURL - The URL with the account domain.
   * @param {Object} options - An object containing the consumer keys, access keys and the base URL.
   */
  constructor(options = {consumer: null, accessToken: null, baseURL: null}) {
    this.baseURL = options.baseURL;
    this.consumerToken = options.consumer;
    this.accessToken = options.accessToken;
  }

  /**
   * Check if the API baseURL is valid.
   * @return {Boolean} - Returns a boolean corresponding the baseURL correctness.
   */
  validURL() {
    return this.baseURL;
  }

  /**
   * Register method
   * @return {Promise} Credentials - Returns a Promise that, when fulfilled, will either return an Array with the users credetensials detail or
   * an Error with the problem.
   */
  register() {
    if (!this.validURL()) {
      return rejectURL();
    }
    const request = new APICall(
      this.baseURL,
      "/users/",
      "POST",
      this.consumerToken,
      this.accessToken
    );
    return request.send();
  }
}

import React, { Component } from 'react';
import $ from 'jquery';

const VIEW_ID = '173180380';

export default class Test extends Component {
  constructor(props) {
    super(props)

    this.printResults = this.printResults.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  //when component mounts, create a google sign in button.
  componentDidMount() {
    //load gapi
    $.getScript("https://apis.google.com/js/client:platform.js")
    .done(() => {
      window.gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.handleRequest,
        'onfailure': this.handleError
      });
    })
  }

  //on success, make a request to get google analytics data
  handleRequest() {
    window.gapi.client.request({
      path: '/v4/reports:batchGet',
      root: 'https://analyticsreporting.googleapis.com',
      method: 'POST',
      body: {
        reportRequests: [
          {
            viewId: VIEW_ID,
            dateRanges: [{
              startDate: '7daysAgo',
              endDate: 'today'
            }],
            metrics: [{ expression: 'ga:sessions' }]
          }
        ]
      }
    }).then(this.printResults, this.handleError)
  }

  //log the data
  printResults(response) {
    console.log(response)
  }

  //or the error if there is one
  handleError(reason) {
    console.error(reason)
    console.error(reason.result.error.message);
  }

  //render it all
  render() {
    return (
      <div>
      <div id="my-signin2"></div>
      </div>
    )
  }
}
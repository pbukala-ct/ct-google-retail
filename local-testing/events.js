
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The parent catalog resource name, such as
   *  `projects/1234/locations/global/catalogs/default_catalog`.
   */

  const moment = require('moment');

  const eventTime2 = new Date()

  console.log("date: "+ eventTime2.toString())

const eventTime = moment('2023-01-06T00:01:00Z');

   const parent = 'projects/ct-sales-207211/locations/global/catalogs/default_catalog'

   const userEvent = {"eventType":"search","visitorId":"visitor101","attributionToken":"visitor101_0","eventTime":eventTime2,"searchQuery":"shirts"}

  // Imports the Retail library
  const {UserEventServiceClient} = require('@google-cloud/retail').v2;

  // Instantiates a client
  const retailClient = new UserEventServiceClient();

  async function callWriteUserEvent() {
    // Construct request
    const request = {
      parent,
      userEvent,
    };

    // Run request
    const response = await retailClient.writeUserEvent(request);
    console.log(response);
  }

  callWriteUserEvent();
// Copyright 2022 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

async function main() {
  // Call Retail API to search for a products in a catalog using only search query.

  // Imports the Google Cloud client library.
  const {SearchServiceClient} = require('@google-cloud/retail');

  // Instantiates a client.
  const retailClient = new SearchServiceClient();

  const projectId = await retailClient.getProjectId();


  const placement = 'projects/ct-sales-207211/locations/global/catalogs/default_catalog/servingConfigs/default_search'
  const query = 'shirts'
  const visitorId = 'visitor1'




  // Maximum number of Products to return.
  const pageSize = 24;

  const IResponseParams = {
    ISearchResult: 0,
    ISearchRequest: 1,
    ISearchResponse: 2,
  };

  const callSearch = async () => {
    console.log('Search start');
    // Construct request
    const request = {
      placement,
      query,
      visitorId,
      pageSize,
    };
    console.log('Search request: ', request);

    // Run request
    const response = await retailClient.search(request, {
      autoPaginate: true,
    });
    const searchResponse = response[IResponseParams.ISearchResponse];
    if (searchResponse.totalSize === 0) {
      console.log('The search operation returned no matching results.');
    } else {
      console.log('Search result: ', JSON.stringify(searchResponse, null, 4));
    }
    console.log('Search end');
  };

  callSearch();
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

main();

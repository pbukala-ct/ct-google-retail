import {CatalogServiceClient, SearchServiceClient} from '@google-cloud/retail'
import path from 'path';

export class GoogleRetailApi {

    client: SearchServiceClient;

    constructor() {
     
        // this.client = new SearchServiceClient({ projectId: "ct-sales-207211", credentials: {
        //     client_email: "ct-retail@ct-sales-207211.iam.gserviceaccount.com",
        //     private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCj8bV+ZRz05Ro6\nn/C6LaAKWWhDoHjulgt9chJiJpHxaq9sEveJN7x/w/vTiNR8OiRFUD3yZmFGa0cK\nC4yIh5LSHva0CxqCCa/WBq9TmT1Zz7eM+julE1gdXVNQXrAxxYL29ysnwhoE+HFI\nUs70ABJPjyQ8xYElHDl4dnttZ0b7gocmqAZ97V7iblT1GgI+4TC5Whh3ZrmuFtZT\nwFB3nU5VYeh0fiKcK8ZFdlX09rGrruA0Yq/riFw07U7r8HxyBsVOcGud/Dppubsl\nLDy+Qk6sv20LBN554qLyZcVIriAzwC4rnj+smMRwmLuGYC+IbFvbbFZfEhRYpxIQ\nCM2rnaArAgMBAAECggEACtdq0j507g74FcT9tUCO8x0OSfaWBYHfpaT1aUJpGucC\ntCnQiJiQ4X2zRnEnsavIoHRmr4QTGuyKNWeMT66je28eKMul+tARx2k7jx9oBFHt\nSFt3guDNTjfQ0O5KEyiFrIStrAK05MinLFccv3VnwJVUAKU3XdEvGo1Y3f3BhToO\n+d2eNelsHlJpCLNRWlenaEnu3TlwyC8ZQOl6vjtfWfXJ2QhGZz9UopsMIRlHNuX6\n3lvUzTMGTh+e9FZY3O08K4BAvB4nWm4ymeVAVpIt7/KmzyVD0ajSz+hq+2IlHlrw\n+GNeTsurdw14+NeVN9sqZh4ucecHIcMFo+SRXegLuQKBgQDjaWF2LdAvr2JtHpvu\nLGOc9AJY4SXpIU/ERmR/K7SytcruVAvpXpoBczYY8UD0xdwEmciqzIYuS9hAUzoT\nW6pxMwPqEjflZuPzNtHfpi95sSHU45+xIpU+/41qE/iSkDJn3ueHOoALFHfZFIr4\nvReFez2PkGUAOwdtROWNM9s8iQKBgQC4jc1U3StXasDCqLj9qen9aeIvjJhXz58Y\nnrte3HAvPEM1506k5I5YBoc4QDPF5rpOAcESsAEOh7MA4hURoYunrRTMSDRJoqHJ\nUdEGmQI+rf/UNzKgtqrBwq2n3yngzWmg78indaLakrrUSO+ezQ6i5duDzNi3hPrO\nGwpGGsKSEwKBgQCHpQzoQ+1g9Bkeg1p5F2sXbIiV4T4Or7r3lRFOtZAj5MG1pNYy\nDiaIZONIv2aCWh6hc+U406PZq43C2KHUeCHTQZ29Gb7Ti6q+IN3QrDy3Nou6g0d2\nje091YrRUjY7nd0jDddGVwOXGE9gYZt/QLLuAJO4tWU5XPxSFf1iWyMTGQKBgHc7\nBYDiMnITgd1A6+LVt1oE4iAeEP4KIJrjUeIDQGcD49gbS++zyVKNRSbOM6STX6Gt\n+HJ+SvB8MuVLKpltaLA3XcxsiXtZGnTZ6tT8XTrpZvJPhuHVoZP0lgRyZLfbfXZ/\n835cvY3AZftn84cAq4gKQDtySECoJPCq/4QzHakJAoGAca5IZKdcLxDORBIO5b7v\nteKYRrgvDRIMcZmEmaHu/ceoOtweCk/O1nnqtNl9W0h8lFBiJb7E7TXrAT4XTvT3\n4NwyOlL7VqnThR7zgKx+8ITEGzqOzjU7RPIN4VOyvAw3omKF+G3WZ/3+LPA6X1xQ\nRcwb/TgI/muI69vkfLNAJWs=\\n-----END PRIVATE KEY-----\\n",
        //   }});
       // this.client = new SearchServiceClient({keyFilename: path.resolve('./google_retail_key.json') })

        this.client = new SearchServiceClient({ projectId: "ct-sales-207211", credentials: {
            client_email: "ct-retail@ct-sales-207211.iam.gserviceaccount.com",
            private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCj8bV+ZRz05Ro6\nn/C6LaAKWWhDoHjulgt9chJiJpHxaq9sEveJN7x/w/vTiNR8OiRFUD3yZmFGa0cK\nC4yIh5LSHva0CxqCCa/WBq9TmT1Zz7eM+julE1gdXVNQXrAxxYL29ysnwhoE+HFI\nUs70ABJPjyQ8xYElHDl4dnttZ0b7gocmqAZ97V7iblT1GgI+4TC5Whh3ZrmuFtZT\nwFB3nU5VYeh0fiKcK8ZFdlX09rGrruA0Yq/riFw07U7r8HxyBsVOcGud/Dppubsl\nLDy+Qk6sv20LBN554qLyZcVIriAzwC4rnj+smMRwmLuGYC+IbFvbbFZfEhRYpxIQ\nCM2rnaArAgMBAAECggEACtdq0j507g74FcT9tUCO8x0OSfaWBYHfpaT1aUJpGucC\ntCnQiJiQ4X2zRnEnsavIoHRmr4QTGuyKNWeMT66je28eKMul+tARx2k7jx9oBFHt\nSFt3guDNTjfQ0O5KEyiFrIStrAK05MinLFccv3VnwJVUAKU3XdEvGo1Y3f3BhToO\n+d2eNelsHlJpCLNRWlenaEnu3TlwyC8ZQOl6vjtfWfXJ2QhGZz9UopsMIRlHNuX6\n3lvUzTMGTh+e9FZY3O08K4BAvB4nWm4ymeVAVpIt7/KmzyVD0ajSz+hq+2IlHlrw\n+GNeTsurdw14+NeVN9sqZh4ucecHIcMFo+SRXegLuQKBgQDjaWF2LdAvr2JtHpvu\nLGOc9AJY4SXpIU/ERmR/K7SytcruVAvpXpoBczYY8UD0xdwEmciqzIYuS9hAUzoT\nW6pxMwPqEjflZuPzNtHfpi95sSHU45+xIpU+/41qE/iSkDJn3ueHOoALFHfZFIr4\nvReFez2PkGUAOwdtROWNM9s8iQKBgQC4jc1U3StXasDCqLj9qen9aeIvjJhXz58Y\nnrte3HAvPEM1506k5I5YBoc4QDPF5rpOAcESsAEOh7MA4hURoYunrRTMSDRJoqHJ\nUdEGmQI+rf/UNzKgtqrBwq2n3yngzWmg78indaLakrrUSO+ezQ6i5duDzNi3hPrO\nGwpGGsKSEwKBgQCHpQzoQ+1g9Bkeg1p5F2sXbIiV4T4Or7r3lRFOtZAj5MG1pNYy\nDiaIZONIv2aCWh6hc+U406PZq43C2KHUeCHTQZ29Gb7Ti6q+IN3QrDy3Nou6g0d2\nje091YrRUjY7nd0jDddGVwOXGE9gYZt/QLLuAJO4tWU5XPxSFf1iWyMTGQKBgHc7\nBYDiMnITgd1A6+LVt1oE4iAeEP4KIJrjUeIDQGcD49gbS++zyVKNRSbOM6STX6Gt\n+HJ+SvB8MuVLKpltaLA3XcxsiXtZGnTZ6tT8XTrpZvJPhuHVoZP0lgRyZLfbfXZ/\n835cvY3AZftn84cAq4gKQDtySECoJPCq/4QzHakJAoGAca5IZKdcLxDORBIO5b7v\nteKYRrgvDRIMcZmEmaHu/ceoOtweCk/O1nnqtNl9W0h8lFBiJb7E7TXrAT4XTvT3\n4NwyOlL7VqnThR7zgKx+8ITEGzqOzjU7RPIN4VOyvAw3omKF+G3WZ/3+LPA6X1xQ\nRcwb/TgI/muI69vkfLNAJWs=\n-----END PRIVATE KEY-----\n",
          }});
  
      }


      searchGoogle: (visitorId: string, query: string) => any = async (visitorId: string, query: string) => {
        try {

            const IResponseParams = {
                ISearchResult: 0,
                ISearchRequest: 1,
                ISearchResponse: 2,
              };

              const placement = 'projects/ct-sales-207211/locations/global/catalogs/default_catalog/servingConfigs/default_search';
              const query = 'brown shirt';
              const visitorId = 'visitor1';
              const pageSize = 24;


            const request = {
                placement,
                query,
                visitorId,
                pageSize,
              };
             
              console.log("")
              console.log('Gogole Search request: ', request);
              console.log("")
             
              // Run request
              const response = await this.client.search(request, {
                autoPaginate: false,
              });
              const searchResponse = response[IResponseParams.ISearchResponse];
              //console.log('Response: ' + JSON.stringify(response));
              //AsyncIterable<google.cloud.retail.v2.SearchResponse.ISearchResult>
              if (searchResponse !== undefined) {
                // console.log('Search result: ', JSON.stringify(searchResponse, null, 4));
                console.log('Search result size : ', JSON.stringify(searchResponse, null, 4));
                
              } else {
                console.log('Search result: ', JSON.stringify(searchResponse, null, 4));
              }
              console.log('Search end');
              console.log("")
              console.log("")

              return searchResponse;

        } catch (error) {
            console.log(error)
            
          }
        };


}
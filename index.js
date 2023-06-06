
import 'dotenv/config'

import {productMapper} from './productConverter.js'
import {productServiceClient} from './gProductServiceClient.js'


// Register an HTTP function with the Functions Framework
export const helloPubSub = async (event,context) => {
  // Extract the payload from the Pub/Sub message
  const pubsubMessage = event.data
    ? Buffer.from(event.data, 'base64').toString()
    : null;

  console.log(`Received Pub/Sub message: ${pubsubMessage}`);


  try {

    const response = await updateProduct(JSON.parse(pubsubMessage));

    return {
        'statusCode': 200,
        'body': JSON.stringify({
            product:  response,
        })
    }
} catch (err) {
    console.log(err);
    return err;
}

}


async function updateProduct(eventData) {
  // Build Google Product out of CT product
  const gProduct =  await productMapper(eventData)


  // Create a product update/create request, allow for creating new products
  const request = {
    product: gProduct,
    allowMissing: true
  };

  try {
    console.log("Google Retail Catalog Product update/create request with product ID: " + gProduct.id);
    const [newProduct] = await productServiceClient.updateProduct(request);
    console.log('Product updated/created succesfully: ' + newProduct.name );
    return newProduct
  } catch (err) {
    console.error('Error updating product:', err);
    return false
  }
}

 
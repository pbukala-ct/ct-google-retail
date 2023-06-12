const { ProductServiceClient } = require('@google-cloud/retail');

// Create a new instance of the ProductServiceClient
const productServiceClient = new ProductServiceClient();

async function updateProduct() {
  // Specify the product ID and the updated product data
  const productId = 'A0E200000001UTQ';

  const projectId = 'ct-sales-207211'
  const location = 'global'
  const catalog = 'default_catalog'
  const branch = 'default_branch'

  const updatedProduct = {
    title: 'Test to update new title 1'
   
    // Include any other updated fields here
  };

  // Build a productName path 
  const productName = productServiceClient.productPath(projectId, location, catalog,branch,productId)

   // Retrieve the existing product from the Retail API
    const [existingProduct] = await productServiceClient.getProduct({
    name: productName,
  });


  console.log('Product :', JSON.stringify(existingProduct));


  existingProduct.title = updatedProduct.title;
  // FIX: This fixes the error of some fields being not retrivable e.g. originalPrice
  existingProduct.retrievableFields = {};


  // Create a product update request
  const request = {
    product:existingProduct,
    // updateMask: {
    //     paths: [
    //       'description' // Include any other updated field paths here
    //     ],
    // }
  };

  // try {
  //   // Update the product
  //   const [newProduct] = await productServiceClient.updateProduct(request);
  //   console.log('Product updated:', newProduct.name);
  // } catch (err) {
  //   console.error('Error updating product:', err);
  // }
}



updateProduct();



const csv = require('csv-parser');
const jsonfile = require('jsonfile');
const fs = require('fs');
require("dotenv/config")

const inputPath = process.env.INPUT_FILE;
const outputPath = process.env.OUTPUT_FILE;

const projectId = process.env.PROJECT_ID
const location = process.env.LOCATION
const catalog = process.env.CATALOG
const branch = process.env.BRANCH


// add more mappings as needed for the attributes group 
const attributeMap = {
  'fp_manufacturer': 'vendor',
  'fp_size' : 'size',
  'fp_color' : 'color',
  'style' : 'style',
  'gender' : 'gender',
  'season': 'season',
  'promotion': 'promotion'  
};




const products = [];

let lastCategory = '';
let lastDesc = '';
let masterId = '';
let title = '';

fs.createReadStream(inputPath)
  .pipe(csv())
  .on('data', (row) => {
    const product = {};

    product.name = 'projects/'+projectId+'/locations/'+location+'/catalogs/'+catalog+'/branches/'+branch+'/products/'+row.sku
    product.uri = process.env.PRODUCT_URL+row.sku

    product.id = row.sku;
    product.type = row.productType? "PRIMARY" : "VARIANT"
    product.primaryProductId = row.productType? row.sku : masterId;
    
    product.categories = [];

    // build the categories array and keywords for attribues based on categories
    let categoryInput;
    row.categories ? categoryInput = row.categories : categoryInput = lastCategory;

    let outputString = '';
    let parts = categoryInput.split(';');

    product.attributes = {};
    product.tags = [];
  
    for (let i = 0; i < parts.length; i++) {

      product.categories.push(
        parts[i]
      )
      
      let keywords = parts[i].trim().split('>');
      for(const key of keywords ){
        product.tags.push(key)
        if(!product.categories.includes(key))product.categories.push(key)
      }
     
    }

    product.attributes['keywords'] = { text: product.tags , searchable: true, indexable: true };

      for (const [csvKey, jsonKey] of Object.entries(attributeMap)) {
      if( [row[csvKey]] !== undefined && row[csvKey] !== ''){
        if(jsonKey === 'size' && isNumeric([row[csvKey]])){
          product.attributes[jsonKey] = { numbers: Number(row[csvKey]) };
        }else{
          product.attributes[jsonKey] = { text: [row[csvKey]], searchable: true, indexable: true };
        }
      }
    }

    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
  }



    
    lastCategory = row.categories ? row.categories : lastCategory;
    lastDesc = row.description_en ? row.description_en : lastDesc;
    masterId = row.productType? row.sku : masterId;
    title = row.name_en? row.name_en : title;

    product.title = row.name_en? row.name_en : title;
    product.description = row.description_en ? row.description_en : lastDesc;

    

    product.language_code = 'en';
    product.priceInfo = {
      currencyCode: 'AUD',
      price: parseFloat(row.baseprice)/100,
      originalPrice: parseFloat(row.baseprice)/100,
      cost: (parseFloat(row.baseprice) * 0.1)/100
    };


    // product.colorInfo = {};
    
    // product.colorInfo.push({
    //   colorFamilies : fp_color,
    //   colors
    // })

    if(row.fp_manufacturer !== '' ){
      product.brands = [];
      product.brands.push(
        row.fp_manufacturer
      )
    }
    product.availableQuantity = 1000;

    product.images = [];
    if (row.images) {
      const imageUrls = row.images.split(';');
      for (const url of imageUrls) {
        product.images.push({
          uri: url,
          height: 320,
          width: 320
        });
      }
    }

    products.push(product);
  })
  .on('end', () => {
    jsonfile.writeFileSync(outputPath, products, { spaces: 2 });
    console.log(`Successfully wrote ${products.length} products to ${outputPath}`);
  });


  function parseCategory(inputString) {
    let outputString = '';
    let parts = inputString.split(';');
  
    for (let i = 0; i < parts.length; i++) {
      let keywords = parts[i].trim().split('>');
      let newString = keywords.join(' & ');
      outputString += newString;
  
      if (i !== parts.length - 1) {
        outputString += ' & ';
        outputString += parts[i] +' & '
      } else{
        outputString += ' & '+ parts[i] 
      }
      
     
    }
    
  
    return outputString;
  }
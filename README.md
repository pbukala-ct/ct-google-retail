# ct-google-retail
Product synch service between commercetools and google retail

Function  converts the PublishedProduct event with the Product payload into the google retail catalog for google retail search 


#deployment from local
gcloud functions deploy ct-google-retail --runtime=nodejs18 --trigger-topic=ct-google-product --source=. --region=australia-southeast1 --entry-poin
t helloPubSub
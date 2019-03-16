# newsarticles
A repository for a demo which will serve news articles
Problem Statement:
Create a REST service which answers following queries from scrap data:
a. Search available authors
b. Search articles based on input author name
c. Search articles based on input article title and description
d. Search articles based on date
e. Search author name based on date
f. Search articles based on tags associated with articles
g. Search articles based on city name
h. Search articles based on news categories

Postman collection URl for the implemented APIs: https://www.getpostman.com/collections/c71c05a7fb796a93814f

Approach:
1. Refer DBDesign.png to get a clear idea of how we can do the DB design for the above problem statement(minimalistic one).
2. To create the DB Run DBScript.sql.
3. To run the project run node ./bin/www will start the API server.
4. To check the APIs use postman collection shared.
5. In the API Articles by date(http://localhost:3003/articles/2019-03-02) I have done a http call to hindu site to get the data(not in desired format it directly gives the HTML of that page).
6. If we need data as json or some format that an API should return we need to parse the HTML(web crawling can be used) that we are getting from the Hindu site.


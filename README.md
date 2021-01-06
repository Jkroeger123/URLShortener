# URLShortener
Takes in a website and an ID and creates a short URL.
the short URL will be created in the form: "yourdomain.com/ID"

You can try the URL shortener here: https://shortm.herokuapp.com/

# Technologies Used
Utilized a MongoDB Atlas database to store the IDs. Utilized an express server with node.js to connect to the database and manage the backend, for both serving the static webpage and creating the end points to redirect and create the short URLs.
Utlized Javascript for frontend functionality, along with HTML and CSS, utilizing bootstrap for styling the webpage.

# Dependencies
* body-parser
* dotenv
* express
* mongodb
* monk
* path
* yup
* nodemon

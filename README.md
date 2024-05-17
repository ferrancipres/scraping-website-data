`#APIREST` `#SoySuper` `#Scraping` `#Crawler` `#Javascript` `#MVC` `#Routes` `#Controllers` `#.env` `#server` `#swagger-UI` `#testing` `#jest` `#docker` `#docker-compose` `#redis` `#cache` `#performance`

<div> 
    <h1> API REST - Scraper Web </h1>
</div>

#### Table of Contents

- [About project](#-about-project)
- [Project Planing](#-project-planing)
- [Organization folders](#️-organization-folders)
- [Branch Structure](#-branch-structure)
- [API_REST](#-api-rest)
- [Scraper Web](#-scraper-web)
- [Installation and Startup-local](#-installation-startup-local)
- [Installation and Startup-remote](#-installation-startup-remote)
- [Contributions](#-contributions)
- [Contact](#-contact)

##### About project

**SoySuper-Challenge** is an application developed as part of a technical test for the Junior Developer position.

The main goal was to create a **API REST (server.js) with specific endpoints** that would allow to call a **scrapper** to collect information from the web platform **https://news.ycombinator.com/.**”

##### Project planning

The project planning has been done through **github project**, where I have unstructured each phase of the project and developed the total set of tasks starting from research to implementation.

The **project planning** was done through **GitHub Project**, where I broke down each phase of the project and developed a full set of tasks ranging from research to implementation. This included technical research to determine best development practices.

##### Organization folders

For this project I used the **model-view-controller** software architecture pattern that allows us to improve the structure, maintainability and scalability of the code.

├── node_modules
├── src
│ ├── controllers
│ ├── routes
│ ├── test
│ ├── .env.development
│ ├── .env.production
│ ├── index.js
│ ├── scraper.js
│ ├── server.js
│ └── swagger.js
├── .babelrc
├── .gitignore
├── .docker-compose.yml
├── dockerfile
├── package.json
├── package-lock.json
└── README

##### Branch Structure

For this project, I organized the development using **branches in Git**, which allowed an iterative and organized approach. Three major development blocks were distinguished:

**API-REST development**
At this stage, I focused on the creation of the server, which included API implementation, environment variable configuration, Swagger UI library integration and unit testing.

**Scraping-web development**.
Here, the focus was on the creation of the scraper-web using technologies such as Playwright and Redis for cache management. This part of the project allowed to collect specific information from the target web platform in an efficient way.

\*\*API-REST & Scraper Implementation
Finally, I unified both branches to integrate the scraper into the API endpoints. This involved the final implementation of the project, including Docker and Docker-compose configuration to ensure portability and dependency management.

Throughout the development, each branch focused on a specific part of the project and merged in an orderly fashion to achieve a successful and complete implementation of the system.

**Git-branch**:

- main
- dev
- dev_server
- dev_server_swagger

- dev_scraping_web
- dev_scraping_web_redis

- dev_server_scraping_web -> API + Scraper
- dev_server_scraping_web_docker
- dev_server_scraping_web_redis_docker

##### API REST

I have created an API through Node.js and Express that listens on **port 3000**. To manage the port configuration more flexibly, I used environment variables, separating the settings for development and production environments in files:

- .env.development
- .env.production

In the Express server configuration, I have implemented several middleware to improve the functionality and management of incoming requests:

**app.use(express.json())** - This is middleware that is used to parse the bodies of incoming requests in a JSON format.

**app.use(responseTime())** - This is another middleware that records the response time of requests.

**app.use('/', scraperRoutes)** - This is a routing middleware. All requests arriving at the base route ('/') will be handled by scraperRoutes:

    - scraperRoutes.get('/', callback), in this case the callback is the controller following the MVC model that we have called it 'getNews', where its main function is to collect the information through the url scraper: (https://news.ycombinator.com/).

    - scraper.Routes.get('/:pageId', callback), in this case to the route we have incorporated a dynamic parameter that will allow us the pagination through query-params and the callback following the MVC would be getNewsByPage that its function is to collect information through the pages.

**Swagger**
To document the API and facilitate interaction with the endpoints, I have implemented the **Swagger library**. This allows developers to visualize and test the API endpoints through a link.

IMPORTANT: To use the library, follow these steps:

1. Open enpoint deployment.
2. Click "Try it out"
3. Execute

At the bottom, you could visualize all the information of the call together with the data collected with the scraper.

IMPORTANT: In case you want to use the dynamic endpoint “pageId” it will always be necessary to enter a number value to make the request.

**Testing**
Finally, to ensure the quality and stability of the API, I performed tests using **Jest and Supertest**. These tests range from validation of the API calls to verification of the responses, ensuring correct operation in different scenarios and conditions.

1. To start the tests, command:
   `npm run test`

##### Scraper Web

For the web scraper in this project, I chose to use **Playwright** instead of its main competitors, such as Puppeteer or Cheerio. Playwright is a library that offers web browser automation, which makes it ideal for handling dynamic web pages and scraping across multiple browsers such as Chrome, Firefox, Safari and Edge.

Attached are the main differences with Cheerios and Puppetter:

**Playwright over Cheerio**:
Playwright is the right choice if you need to handle dynamic web pages, perform cross-browser scraping, or interact intensively with the web page, including authentication and network manipulation. Cheerio, on the other hand, is suitable for simple static HTML scraping without the need to run JavaScript or interact with the page.

**Playwright over Puppeteer**:
Playwright offers support for more browsers and additional features such as better session handling and authentication. In contrast,
Puppeteer is still a solid choice, especially if your focus is exclusively on Chromium.

**Redis**
To optimize the performance of API_REST calls, I implemented Redis to store the information collected from the web page with unique “news_number” variables. Redis (Remote Dictionary Server) is a high-performance, open source, key-value, in-memory, in-memory database.

1. To start redis, open console (cmd):
   `redis-server`

2. To install node-redis, simply:

   `npm install redis`

3. To display the stored information:
   `redis-commander`

IMPORTANT: I used tools like redis-commander to visualize the stored content and redis-server to raise Redis locally.
DOCUMENTATION:
https://redis.io/docs/latest/develop/connect/clients/nodejs/

**Testing**
To ensure the quality and integrity of the collected data, I performed tests using Jest. These tests were mainly focused on verifying the content collected by the web scraper, thus ensuring a correct functioning of the API_REST and the integrity of the data provided to the users.

1.To start the tests, command:
`npm run test`

**Docker**
To ensure the integrity of the remote project configuration, I have implemented Docker-Compose in a YAML file to then run and manage the service, in this case the API_REST service.

1. Build image in docker via Dockerfile
2. Define and manage docker services
3. Create the image, simple:
   `docker build -t nombre-imagen .`

4. Create and run the containers defined above.
   `docker-compose up`

#### Installation and Startup - Local

Before you start you must take into account that if you want to run the program locally (No docker):

1. The branch you need is: `dev_scraping_web_redis`

2. Clone repository.
   `https://github.com/ferrancipres/scraping-website-data`

3. Through the console (enter the folder):
   `cd scraping-web`

4. Install dependencies via npm:
   `npm install`

5. Configure the environment variables. Create a file in the root:
   Create an .env file in the root of your project :

   - .env.development y incluir PORT=3000
   - .env.production y añadir PORT=3002

6. Start the development server:
   npm run dev

IMPORTANT: If everything went correctly it should appear:
server-1 | 🚀 Server is running on port 3000
server-1 | Swagger docs running on http://localhost:3000/api/docs
server-1 | Connected to Redis

#### Installation and Startup - Remote (Docker)

Before you start you should note that if you want to run the program remotely (Docker):

1. The branch you need is: `dev_server_scraping_web_redis_docker`

2. Clone repository.
   `https://github.com/ferrancipres/scraping-website-data`

3. Through the console (enter the folder):
   `cd scraping-web`

4. Install dependencies via npm:
   `npm install`

5. Configure the environment variables. Create a file in the root:
   Create an .env file in the root of your project:

   - .env.development y incluir PORT=3000
   - .env.production y añadir PORT=3002

6. Open Docker Desktop, where we are going to generate the image.

7. Create the image, simple:
   `docker build -t nombre-imagen .`

8. Create and run the containers defined above.
   `docker-compose up`

IMPORTANT: If everything went correctly it should appear:
server-1 | 🚀 Server is running on port 3000
server-1 | Swagger docs running on http://localhost:3000/api/docs
server-1 | Connected to Redis

#### Contributions

If you encounter any issues or have improvement suggestions, feel free to open an issue or submit a pull request.

#### Contact

For any questions or comments, please contact us at:

ferrancipres@gmail.com
https://www.linkedin.com/in/ferran-cipres/

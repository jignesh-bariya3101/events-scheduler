# events-scheduler
# Node Version : 18.18.0 must required

# Install Dependency from package.json : npm install

# Project Run : npm start
    - If not running using npm start, check package.json check in script and update below code 
          "scripts": {
                "test": "jest",
                "start": "tsc && node dist/app.js"
            },
        
# RUN npx jest
    - It's use to run test cases

# Bull used for jobs

# I added env.exaple file, Please update database url as local or cloud any of one is prefer

# Also used node_scheduler for job

# Here I attached REST End Point

    - http://localhost:3000/api/events 
      Create Event
      POST Method
      You need to pass payload exactly same it is.
        {
            "title": "E Lob Bar 1",
            "startDate": "2024-01-01",
            "endDate": "2024-12-31",
            "recurrence": "everyminute",
            "eventTime": "12:00" // It's exactly same format
        }

    - http://localhost:3000/api/events 
      List All Events
      GET Method

    - http://localhost:3000/api/events/:id
      Get Event By Id
      GET Method

    - http://localhost:3000/api/events/:id
      Update Event
      PUT Method
      You need to pass payload exactly same it is.
        {
            "title": "E Lob Bar 1",
            "startDate": "2024-01-01",
            "endDate": "2024-12-31",
            "recurrence": "everyminute",
            "eventTime": "12:00" // It's exactly same format
        }

    - http://localhost:3000/api/events/:id
      Get Event By Id
      DELETE Method

# I also attached POSTMAN collection in root directory of project named with : 
    - Event Scheduler.postman_collection.json
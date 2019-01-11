# Simple Database - lab 3

**Author**: [Cari Palazzolo](https://github.com/caripizza)

## Overview
In this lab, I implemented a simple object database that stores and retrieves JSON objects from the file system; includes unit tests.

## Technologies used
Node.js, JavaScript, [Jest](https://www.npmjs.com/package/jest)

## Getting Started
1. Clone and download [GitHub repo](https://github.com/caripizza/simple-database)
1. Install dev dependencies:\
`npm i -D jest eslint shortid mkdirp rimraf`

1. Using the Store API:\
The Store saves and retrieves JSON objects by writing and reading them to files in the _testData > store_ directory; functions run asynchronously:
+ > `create(objectToSave, callback(error, objectThatSaved))`\
Creates and saves a JSON object with unique ID
+ > `findById(_id, callback(error, objectFromFile))`\
Retrieves an object by ID
+ > `findByIdAndDelete(_id, callback(error, removedSuccessObject))`\
Removes an object by ID
+ > `find(callback(error, arrayOfObjects))`\
Retrieve all objects from the directory
+ > `findByIdAndUpdate(_id, objectToUpdate, callback(error, updatedObject))`\
Writes a new object to the directory, replacing the existing object
3. Run tests:\
`npm run lint`\
`npm run pretest`\
`npm run test`\
`npm run test:watch`
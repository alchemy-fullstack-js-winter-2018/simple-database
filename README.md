### `Store`

* A Class with a constructor that takes its root directory it should save and read files to and from.
* The directory should already exist!
* The class has the following methods:

1. `.create(objectToSave, callback(error, objectThatSaved))`
    * Creates a `_id` property for the object (Use third-party npm module like `shortid` or `uuid` or ?)
    * Saves the object to a file (`JSON.stringify`), where the filename is the `_id`. For example, if the id is 3k4e66, the file will be `3k4e66.json`
    * takes a callback which takes an error and the deserialized (`JSON.parse`) saved object
1. `.findById(_id, callback(error, objectFromFile))`
    * Takes a callback which takes an error and the deserialized (`JSON.parse`) object that has
      that id
    * If an object with that id does not exists, objectFromFile is `null`
1. `.findByIdAndDelete(_id, callback(error, removedSuccessObject))`
    * The store should removes the file of the object with that id.
    * Takes a callback that takes an error and an object `{ deleted: 1 }` if object was removed,
    or `{ deleted: 0 }` if the id did not exist (HINT: catch `ENOENT` error)
1. `.find(callback(error, arrayOfObjects))`
    * Takes a callback that takes an error and an array of all objects in the directory. (hint:
    can you use the store's `findById(id)` method as part of this?), or resolves to an empty
    array `[]` when no objects in the directory.
1. STRETCH GOAL: `.findByIdAndUpdate(_id, objectToUpdate, callback(error, updatedObject))`
    * Write the new object to file, replacing existing object
    * Takes a callback which takes an error and the deserialized (`JSON.parse`) updated object
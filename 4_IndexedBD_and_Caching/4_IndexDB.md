### 4.1 Introducing the IDB Promised Library

Data base is the best model to add/remove/iterate/query the posts.
Web Workers has  [IndexDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/) functionality - the database to store records holding simple values and hierarchical objects.

Generally, we have *one* database per *Application*.

IndexDB terms:

    database = [{object store}, ...]
    object store = [{item: object|primitive},..]
    item = out-of-line key | inline key
    key = unique identifier of an object
    index = objet store view ordered by particular property(ies)

All **read and write** operations MUST be part of a **transaction**. If a transaction fails, all operations within this transaction are rolled back.

IndexDB bad reputation comes from its "horrid" syntax: it precedes Promises and is all asynchronous.

### 4.2 Getting Started with IDB

Library to mirror IndexDB messy syntax: https://github.com/jakearchibald/idb

*Open/upgrade database*: to maintain DB integrity, object stores and indexes must be created within the upgrade function (*DBOpenRequest.onupgradeneeded* or library 'open' function last *parameter* ).
Upgrade function is called only if the **database doesn't exist** or a **newer version** number is provided.

    var dbPromise = idb.open(<name:string>, <version:number>, function(<dataBaseToUpgrade:UpgradeDB>) {
    //do something with upgradeDb
      var keyValStore = upgradeDb.createObjectStore('keyval');
      keyValStore.put("world", "hello");
    });
Note: '<>' in the code snippet signifies a place holder with the parameter brief explanation and its type, for example instead of `<name:string>` you would write `'my-store'`.

For more details about **UpgradeDB** object, see [idb library code](https://github.com/jakearchibald/idb/blob/97e4e8787079b672edcb05abda4504719e592e19/lib/idb.js#L204).

### 4.3 Quiz: Getting Started with IDB

Working with **/public/js/idb-test/index.js**
Test URL **http://localhost:8888/idb-test**

*Hint1*:  see the foo-bar example provided in the code.

*Hint2*: what to do:
 - start a [transaction](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/transaction) for 'keyval'
 - get 'keyval' store from transaction
 - put a value (keep in mind strange parameters order: value, key)
 - complete the transaction and return the completion promise

NOTE:  'Refresh' button for the 'keyval' store in dev tools might be helpful.

### 4.4 Quiz: More IDB

#### Database creation/upgrade:

[IDBVersionChangeEvent.oldVersion](https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeEvent/oldVersion%22DBVersionChangeEvent.oldVersion) - gives the old database version number, can be used to add operations in upgrade function per version. Using idb library we have it in `UpgradeDB` onject.

When `upgradeDb.oldVersion = 0`, the database doesn't exist.

[IDBDatabase.createObjectStore(name, options)](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/createObjectStore%22IDBDatabase.createObjectStore%22) 
*keyPath* option provides property names for inline key

*Hint*:  the code for previous versions doesn't execute in the database upgrade function

#### Index creation:

[IDBObjectStore.createIndex()](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/createIndex)

Must be called only from a VersionChange [transaction](https://developer.mozilla.org/en-US/docs/Web/API/IDBRequest/transaction) (i.e. 
a transaction of the database upgrade request ).Using [idb](https://github.com/jakearchibald/idb) library, we have acces to it through `UpgradeDB` object property: *upgradeDb.transaction*.

*Hint1*: see 'animal' index creation example and its usage which are provided in the code

### 4.5 Using the IDB Cache and Display Entries

We are going to use the database to store the posts.

What we will do:

1. Get already stored posts from the cache and display them.
2. Get posts update from the network and store the update in the database.
NOTE: websocket (posts update arrive by ws) bypass both HTTP cache and the Service Worker.
3. We want to show stored post ordered by date.


### 4.6 Quiz: Using IDB Cache

Task: create a new database and store new posts in it.

Working with **/public/js/main/IndexController.js**
Method which handles newly arrived posts is `IndexController.prototype._onSocketMessage`.
Each post has `id` alphanumerique field and `time` field

*Hint*: What we've already done in **/public/js/idb-test/index.js** is a good reference.
*Hint*: to delete a database: 

* in Dev tools Console run `indexedDB.deleteDatabase('wittr')` 
* or just delete it in Application -> Storage panel -> IndexedDB -> choose 'wittr' database -> 'Delete database' button

NOTE: the ES6 `for (let .. of ..)` could be useful

### 4.7 Quiz: Using IDB 2

Task: show stored posts before connecting to the WebSocket.

NOTE: personally, I used  [idb iteratecursor](https://github.com/jakearchibald/idb#iteratecursor--iteratekeycursor) to finish this task.

*Hint*: _showCachedMessages must return a promise which resolves when cached posts are shown. 
*Hint*: a post with the most recent date must be at the beginning, so in index reversed order.



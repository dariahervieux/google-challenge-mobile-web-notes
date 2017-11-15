###4.1 Introducing the IDB Promised Library

Data base is the best model to add/remove/iterate/query the posts.
Web Workers has  [IndexDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/) functionality - the database to store records holding simple values and hierarchical objects.

Generaly, we have *one* database per *Application*.

IndexDB terms:

    database = [{object store}, ...]
    object store = [{item: object|primitive},..]
    item = out-of-line key | inline key
    key = unique identifier of an object
    index = objet store view ordered by particular property(ies)

All **read and write** operations MUST be part of a **transaction**. If a transaction fails, all operations within this thransaction are rolled back.

IndexDB bad reputation comes from its "horrid" syntax: it preceeds Promises and is all asynchonious.

### 4.2 Getting Started with IDB

Library to mirror IndexDB messy syntax: https://github.com/jakearchibald/idb

*Open/upgrade database*: to maintain DB integrity, object stored and indexes ought to be created within the upgrade function (*DBOpenRequest.onupgradeneeded* or library 'open' function last *parameter* ).
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

*Hint1*:  see the foo-bar example juste above.

*Hint2*:  TODO:
 - start a [transaction](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/transaction) for 'keyval'
 - get 'keyval' store from transaction
 - put a value (keep in mind strange parameters order: value, key)
 - complete the transaction and return completion promise

*Hint*:  'Refresh' button for the 'keyval' store in dev tools might be helpfull.

### 4.4 Quiz: More IDB

[IDBVersionChangeEvent.oldVersion](https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeEvent/oldVersion%22DBVersionChangeEvent.oldVersion) - gives the old database version number, can be used to add operations in upgrade function per version.

[IDBDatabase.createObjectStore(name, options)](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/createObjectStore%22IDBDatabase.createObjectStore%22) 
*keyPath* option provides properties names for inline key

Indexes for object stores must be created within a transaction of database upgrade request: *upgradeDb.transaction*.

*Hint1*: see 'animal' index creation and its usage which are provided in the code
*Hint1*:  keep in mind that the code for previous versions doesn't execute in database upgrade function
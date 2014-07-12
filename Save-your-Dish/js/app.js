// variable which will hold the database connection
var db;

function initializeDB() {
	if (window.indexedDB) {
	  console.log("IndexedDB support is there");
	}
	else {
	   alert("Indexed DB is not supported. Where are you trying to run this ? ");
	}
 
	// open the database
	// 1st parameter : Database name. We are using the name 'notesdb'
	// 2nd parameter is the version of the database.
	var request = indexedDB.open('notesdb', 1);
	
	request.onsuccess = function (e) {
	  // e.target.result has the connection to the database
	  db = e.target.result;
	  //Alternately, if you want - you can retrieve all the items
	}
	 
	request.onerror = function (e) {
	   console.log(e);
	};
	 
	// this will fire when the version of the database changes
	// We can only create Object stores in a versionchange transaction.
	request.onupgradeneeded = function (e) {
	   // e.target.result holds the connection to database
	   db = e.target.result;
	   
	   if (db.objectStoreNames.contains("notes")) {
	     db.deleteObjectStore("notes");
	   }
		
	   // create a store named 'notes'
	   // 1st parameter is the store name
	   // 2nd parameter is the key field that we can specify here. Here we have opted for autoIncrement but it could be your
	   // own provided value also.
	   var objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
	   
	   console.log("Object Store has been created");
	};
}
 
document.querySelector('#btn-action-menu').addEventListener ('click', function () {
  document.querySelector('#action-menu').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';

});

document.querySelector('#btn-buttons-backs').addEventListener ('click', function () {
  document.querySelector('#action-menu').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});
//buttons

document.querySelector('#btn-buttons-back').addEventListener ('click', function () {
  document.querySelector('#buttons').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});


// add the dish
var matches = document.querySelector('#adddish').addEventListener ('click', function()
{
 var title =document.getElementById('dish-name').value;
 var ing =document.getElementById('ing-name').value;
 var desc =document.getElementById('desc-name').value;

		   // create the transaction with 1st parameter is the list of stores and the second specifies
		   // a flag for the readwrite option
		   var transaction = db.transaction([ 'notes' ], 'readwrite');
	
		   //Create the Object to be saved i.e. our Note
		   var value = {};
		   value.title = title;
		   value.details = ing;
			value.noteDes = desc;
		   // alert("hai");

		   // add the note to the store
		   var store = transaction.objectStore('notes');
		   var request = store.add(value);
		   request.onsuccess = function (e) {
			  alert("Your note has been saved");
document.getElementById('dish-name').value="";
document.getElementById('ing-name').value="";
document.getElementById('desc-name').value="";

		   };
		   request.onerror = function (e) {
		     alert("Error in saving the note. Reason : " + e.value);
		   }
});

//view the dish

document.querySelector('#btn-buttons').addEventListener ('click', function()
{
document.querySelector('#buttons').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';

document.getElementById("note-list").innerHTML='';

document.getElementById("note-list").value='';

		  //Read the notes
var transaction = db.transaction(["notes"]);
var objectStore = transaction.objectStore("notes")

		
  		  // open a cursor to retrieve all items from the 'notes' store
		  objectStore.openCursor().onsuccess = function (e) {
//document.getElementById("note-list").innerHTML='';
			  var cursor = e.target.result;

			  if (cursor) {
			    var value = cursor.value;


var para=document.createElement("h1");
para.className = 'dishhead';

var node=document.createTextNode(value.title);
para.appendChild(node);
var element=document.getElementById("note-list");
element.appendChild(para);



var para=document.createElement("p");
para.className = 'dishing';
var node=document.createTextNode(value.details);
para.appendChild(node);
var element=document.getElementById("note-list");
element.appendChild(para);

var para=document.createElement("p");
para.className = 'dishdes';
var node=document.createTextNode(value.noteDes);
para.appendChild(node);
var element=document.getElementById("note-list");
element.appendChild(para);

var para=document.createElement("button");
para.temp=value.id;
para.id = value.title;
para.className = 'dishbut';
var node=document.createTextNode("Delete");
para.appendChild(node);
para.addEventListener('click', function()
{
var request = db.transaction(["notes"], "readwrite")
                .objectStore("notes")

var request = db.transaction(["notes"], "readwrite")
                .objectStore("notes")
                .delete(para.temp);

 request.onsuccess = function(e) {
   alert(para.id+" has been deleted");  // Refresh the screen
location.reload();
  };

  request.onerror = function(e) {
    console.log(e);
location.reload();
  };
});
var element=document.getElementById("note-list");
element.appendChild(para);

			 
			    // move to the next item in the cursor
				cursor.continue();
			  }
			 
			};




});





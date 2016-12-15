console.log( 'js' );

$(document).ready(function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $('#addButton').on('click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      sex: $('#sexIn').val(),
      ready_for_transfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click

  //edit koala button click
  $('#editButton').on('click', function() {
    console.log('editButton clicked');
    // create object to edit
    var objectToEdit = {
      id: $('#koalaEditSelect').val(),
      name: $('#nameEditIn').val(),
      age: $('#ageEditIn').val(),
      sex: $('#sexEditIn').val(),
      ready_for_transfer: $('#readyForTransferEditIn').val(),
      notes: $('#notesEditIn').val(),
    };
    console.log(objectToEdit);
    editKoala(objectToEdit);
  }); // end editButton
}); // end doc ready

var editKoala = function(koalaToEdit) {
  console.log('in editKoala');
  $.ajax({
    url: '/editKoala',
    type: 'post',
    data: koalaToEdit,
    success: function(data){
      console.log( 'edited a koala! response:', data);
      generateDOM(data);
    } // end success
  });
}; // end editKoalas

var getKoalas = function(){
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    url: '/getKoalas',
    type: 'GET',
    success: function( data ){
      console.log('got some koalas: ', data);
      generateDOM(data);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
}; // end getKoalas

var saveKoala = function(newKoala){
  console.log('in saveKoala', newKoala);
  // ajax call to server to add koala
  $.ajax({
    url: '/addKoala',
    type: 'post',
    data: newKoala,
    success: function(data){
      console.log('got some koalas: ', data);
      generateDOM(data);
    } // end success
  }); //end ajax
};

var generateDOM = function(array) {
  $('#koalaEditSelect').html('');
  $('#allKoalasTable').html('');
  var koalaOptionsText = '';
  var koalaTableRowsText = '<tr><th>ID</th><th>Name</th><th>Sex</th><th>Age</th><th>Ready For Transfer</th><th>Notes</th></tr>';
  for (var i = 0; i < array.length; i++) {
    koalaOptionsText += '<option value="' + array[i].id + '">' + array[i].id + ', ' + array[i].name + '</option>';
    koalaTableRowsText += '<tr><td>' + array[i].id + '</td><td>' + array[i].name + '</td><td>' + array[i].sex + '</td><td>' + array[i].age + '</td><td>' + array[i].ready_for_transfer + '</td><td>' + array[i].notes + '</td></tr>';
  } // end for
  $('#koalaEditSelect').html(koalaOptionsText);
  $('#allKoalasTable').html(koalaTableRowsText);
}; // end generateDOM

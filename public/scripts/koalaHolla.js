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

  $(document).on('click', '.edit-koala-btn', function() {
    console.log('new edit koala clicked');
    var editableFields = $(this).closest('tr').find('.editable').html('this one');
    editableFields.html('<input type="text" class="form-control">');
    //transform button to be a save button
    $(this).text('Save');
    $(this).removeClass('btn-primary');
    $(this).addClass('btn-danger');
    //$(this);
  });

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
  //clear inner html of edit select and the table body
  $('#koalaEditSelect').html('');
  $('#allKoalasTableBody').html('');
  var koalaOptionsText = '';
  var koalaTableRowsText = '';
  for (var i = 0; i < array.length; i++) {
    koalaOptionsText += '<option value="' + array[i].id + '">' + array[i].id + ', ' + array[i].name + '</option>';
    koalaTableRowsText += '<tr><td>' + array[i].id + '</td>';
    koalaTableRowsText += '<td class="editable">' + array[i].name + '</td>';
    koalaTableRowsText +=  '<td class="editable">' + array[i].sex + '</td>';
    koalaTableRowsText += '<td class="editable">' + array[i].age + '</td>';
    koalaTableRowsText += '<td class="editable">' + array[i].ready_for_transfer + '</td>';
    koalaTableRowsText += '<td class="editable">' + array[i].notes + '</td>';
    koalaTableRowsText += '<td><button class="btn btn-primary btn-sm edit-koala-btn">Edit</button></td></tr>';
  } // end for
  $('#koalaEditSelect').html(koalaOptionsText);
  $('#allKoalasTableBody').html(koalaTableRowsText);
}; // end generateDOM

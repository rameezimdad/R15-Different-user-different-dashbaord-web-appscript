 function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
  .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  .setFaviconUrl('https://cdn.bio.link/uploads/profile_pictures/2023-04-16/LtkOkQHLljUSvYcfJpKC8NRFH1q3MfXZ.png')
  .setTitle('R15 | Dashboards for User & Admin')
.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

// Contact the Developer for Custom Project : https://wa.me/923224083545

function authenticateUser(username, password) {
  var spreadsheetId = '///// Replace Your Own ID /////';
  var sheetName = 'Login';

  var data = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName).getDataRange().getValues();

  var isValidCredentials = data.slice(1).some(function(row) {
    return row[0] === username && row[1] === password;
  });

  return isValidCredentials;
}


function determineUserRole(username) {
  if (username.startsWith('admin')) {
    return 'admin';
  } else {
    return 'user';
  }
}
function submitFormToSheet(name, gender, address, email, contact) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Input');
  sheet.appendRow([name, gender, address, email, contact]);
}


function getAdminDataTable() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Input');
  var data = sheet.getDataRange().getValues();
  var htmlTable = '<table id="dataTable" class="display"><thead><tr><th>Name</th><th>Gender</th><th>Address</th><th>Email</th><th>Contact</th><th>Action</th></tr></thead><tbody>';

  for (var i = 1; i < data.length; i++) {
    htmlTable += '<tr><td>' + data[i][0] + '</td><td>' + data[i][1] + '</td><td>' + data[i][2] + '</td><td>' + data[i][3] + '</td><td>' + data[i][4] + 
  '</td><td><button class="delete-button btn btn-danger" onclick="deleteRow(' + i + ')">Delete</button></td></tr>';
  }

  htmlTable += '</tbody></table>';
  return htmlTable;
}


function deleteRow(rowIndex) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Input');
    if (rowIndex >= 1 && rowIndex < sheet.getLastRow()) {
        sheet.deleteRow(rowIndex + 1);
    } else {
        Logger.log('Invalid rowIndex: ' + rowIndex);
  }
}


function getDataFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Input');
  const data = sheet.getDataRange().getValues();
  console.log(data);
  return data;
}

function getRowData(rowIndex) {
  if (rowIndex < 0) {
    console.error('Invalid rowIndex:', rowIndex);
    return null;
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Input');
  var lastRow = sheet.getLastRow();
  if (rowIndex >= lastRow) {
    console.error('Row does not exist:', rowIndex);
    return null;
  }

  var rowData = sheet.getRange(rowIndex + 1, 1, 1, 3).getValues()[0];
  console.log('Row Data:', rowData);
  return rowData;
}


function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

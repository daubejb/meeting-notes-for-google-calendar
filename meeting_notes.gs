function createMeetingNotesNextTimePeriod() {

  //<-------------------------------------VARIABLES------------------------------------------>  
  
  // define a custom style for all data labels
  var labelStyle ={};
  labelStyle[DocumentApp.Attribute.BOLD] = true;
  labelStyle[DocumentApp.Attribute.FONT_SIZE] = 11;
  
   // get today's date
  var today = new Date();
  
  // create a formatted version of today's date
  var formatted_today = Utilities.formatDate(today, "EDT","yyyy-MM-dd");   
  
  // number of hours from now to check for meetings
  var hours = 2
  
  // create variable for now
  var now = new Date();
  
  // create variable for number of hours from now in milliseconds
  var period_from_now = new Date(now.getTime() + (hours * 60 * 60 * 1000));
  


  //<------------------------CREATE A MEETING NOTES FOLDER---------------------------------->
  
  // check to see if a meeting notes folder exists
  var meeting_notes_folder_exists = DriveApp.getFoldersByName('Meeting Notes').hasNext();
  
  Logger.log('meeting_notes_folder_exists = ' + meeting_notes_folder_exists);
  // create the main meeting notes folder if it does note exist
  if (meeting_notes_folder_exists == false) {
    DriveApp.createFolder('Meeting Notes');
    Logger.log('Meeting Notes folder created');
  }
  
  // locate folder named Meeting Notes and instatiate variable
  var meeting_notes_folder = DriveApp.getFoldersByName('Meeting Notes').next();
  
  
  
  //<------------------------CREATE A FOLDER FOR TODAYS NOTES------------------------------->
  
  // check to see if a folder with todays formatted date exists
  var date_folder_exists = meeting_notes_folder.getFoldersByName(formatted_today).hasNext();
  Logger.log('date_folder_exists = ' + date_folder_exists);
  
  // create the folder if it does not exist
  if (date_folder_exists == false) {
    meeting_notes_folder.createFolder(formatted_today);
    Logger.log(formatted_today + ' folder created')
  }
  
  //<--------------------GET EVENTS/ATTRIBUTES FOR TIME PERIOD FROM NOW--------------------->
  
  
  // retrieve all calendar events for time period
  var events = CalendarApp.getDefaultCalendar().getEvents(now, period_from_now) ;
  
  Logger.log('Number of events: ' + events.length);
  
    // loop through each event an get meeting attributes, 
  
  for (var i=0;i<events.length;i++) {
    var title = events[i].getTitle();
    var description = events[i].getDescription();
    var eventstart = events[i].getStartTime();
    var eventend = events[i].getEndTime();
    var location = events[i].getLocation();
    var owner = events[i].getCreators();
    var guestlist = events[i].getGuestList();
        
        
  //<---------------------CREATE MEETING NOTE DOC AND PUT IN TODAY'S FOLDER----------------->  

    // create a google doc with the meeting name as the title
    
    var file_exists = DriveApp.getFoldersByName(formatted_today).next()
      .getFilesByName(title).hasNext();
    
    Logger.log('file_exists: ' + file_exists);
    
    // check to see if file already exists, if does skip if loop
    if ((file_exists == false) && (guestlist.length >= 1)) {
      var doc = DocumentApp.create(title);
      Logger.log(title + ' was created');
     
      // move file to meeting notes folder for today  
      var file = DriveApp.getRootFolder().getFilesByName(title).next();
      file.makeCopy(DriveApp.getFoldersByName(formatted_today).next()).setName(file.getName());
      file.setTrashed(true);
      var doc_2 = DriveApp.getFilesByName(title).next().getId() ;
      var doc_copy = DocumentApp.openById(doc_2);
    
      // loop through event guests and get their emails and status
      for (var j=0;j<guestlist.length;j++) {
        doc_copy.getBody().appendParagraph(guestlist[j].getEmail() + ': ' + guestlist[j].getGuestStatus());
      }
    
      doc_copy.getBody().editAsText()
      .insertText(0, 'Guest list:\n')
      .setAttributes(0, 10, labelStyle);
                           
      doc_copy.getBody().editAsText()
      .insertText(0, 'Description:' + '\n\n' + description + '\n\n')
      .setAttributes(0, 11, labelStyle);
                 
      doc_copy.getBody().editAsText()
      .insertText(0, 'Owner:  ' + owner + '\n\n' )
      .setAttributes(0, 5, labelStyle);
      
      doc_copy.getBody().editAsText()
      .insertText(0, 'Location:  ' + location + '\n\n')
      .setAttributes(0, 8, labelStyle);
      
      doc_copy.getBody().editAsText()
      .insertText(0, 'End:  ' + eventend + '\n\n')
      .setAttributes(0, 3, labelStyle);
      
      doc_copy.getBody().editAsText()
      .insertText(0, 'Start:  ' + eventstart + '\n')
      .setAttributes(0, 5, labelStyle);
      
      doc_copy.getBody().editAsText()
      .insertText(0, title + '\n\n')
      .setFontSize(0, title.length, 14)
      .setBold(0, title.length, true)
      .setForegroundColor(0, title.length, '#cc0000');

    }  // if for file exists

  }  // for loop for each event 

}  // functionCreateMeetingNotesNextTimePeriod

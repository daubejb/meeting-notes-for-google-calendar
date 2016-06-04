## Synopsis

My company uses the Google Productivity Suite.  There was not an "approved" method to automatically generate meeting notes documents.  I had previously worked in an environment that had Microsoft products and had gotten used to the Outlook OneNote integration that did this automatically.  I bring you "Meeting Notes for Google Calendar.  This Google Apps Script:

1. runs automatically hourly
2. looks at the next two hours on your calendar
3. creates a google doc within a yyyy-mm-dd folder within a meeting notes folder on google drive
4. the doc contains
  - Meeting subject
  - Location
  - Date
  - Time
  - Description
  - Attendees
  - Attendees status (accept, invited, declined)

Now when you are in a meeting you simply open your meeting notes folders, and take down the pertinent notes --- avoiding the tedium of writing down all of the standard meeting details.

## Code Example

```

 for (var i=0;i<events.length;i++) {
    var title = events[i].getTitle();
    var description = events[i].getDescription();
    var eventstart = events[i].getStartTime();
    var eventend = events[i].getEndTime();
    var location = events[i].getLocation();
    var owner = events[i].getCreators();
    var guestlist = events[i].getGuestList();

```

## Motivation

I wrote this script so that others would not have to manually create each and every meeting notes document.

## Installation Instructions

### To use the script, simply:

1. **Copy** the text out of the file named, "meeting_notes.gs"
2. **Open** your Google Drive
3. **Create** a new Google Apps Script
  - if you do not have the google apps script application, **go to**:  [google store - search for - google apps script](https://chrome.google.com/webstore/search/google%20apps%20script)
4. **Name** the Script anything you want
5. **Save** ths Script
6. **Click the play button** in the docs toolbar to test the script
7. To schedule this script to run every hour, **click on the clock icon** in the docs toolbar
8. **Click** on "No triggers set up. Click here to add one now."
9. **Click** the Save button
10. Instructions complete, happy meetings!

## Tests

A couple of quick notes on the way this script works:

1. The script will only create a meeting notes folder the first time you run the script
2. The script will only create one folder per day to house all meeting notes for that day in that folder
3. The script will only create a google doc if a meeting exists within the next two hours

## License

MIT License

Copyright (c) 2016 Jeffrey B. Daube

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

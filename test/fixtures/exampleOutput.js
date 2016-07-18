const string = 'BEGIN:VCALENDAR\r\n' +
               'VERSION:2.0\r\n' +
               'PRODID:XYZ Corp\r\n' +
               'BEGIN:VEVENT\r\n' +
               'UID:1\r\n' +
               'DTSTAMP;VALUE=DATE:19910711\r\n' +
               'SUMMARY:Birthdate\r\n' +
               'DTSTART;VALUE=DATE-TIME:19910307T070000\r\n' +
               'DTEND:19910307T193000\r\n' +
               'ATTENDEE;CN=Sample Company;RSVP=FALSE:foo@example.com\r\n' +
               'BEGIN:VALARM\r\n' +
               'ACTION:DISPLAY\r\n' +
               'TRIGGER:-PT12H\r\n' +
               'DESCRIPTION:Event reminder\r\n' +
               'END:VALARM\r\n' +
               'END:VEVENT\r\n' +
               'BEGIN:VTODO\r\n' +
               'UID:1\r\n' +
               'DTSTAMP:20150718T100000\r\n' +
               'DUE:20150719T100000\r\n' +
               'SUMMARY:To Do (the purpose of creating this long string is to test the 75 c\r\n' +
               ' haracter limit per the RFC)\r\n' +
               'CATEGORIES:WORK,FAMILY\r\n' +
               'END:VTODO\r\n' +
               'END:VCALENDAR'

export default string

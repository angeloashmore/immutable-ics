/* eslint-env mocha */

import assert from 'assert'
import { Components, Properties } from '../../src'

let calendar = new Components.VCALENDAR({
  properties: [
    new Properties.VERSION({ value: 2 })
  ]
})

calendar = calendar.pushProperty(new Properties.PRODID({ value: 'XYZ Corp' }))

let event = new Components.VEVENT()

event = event.pushProperty(new Properties.UID({ value: 1 }))
event = event.pushProperty(new Properties.DTSTAMP({
  value: new Date('1991-07-11'),
  parameters: { VALUE: 'DATE' }
}))
event = event.pushProperty(new Properties.SUMMARY({ value: 'Birthdate' }))
event = event.pushProperty(new Properties.DTSTART({
  value: new Date('1991-03-07 07:00:00'),
  parameters: { VALUE: 'DATE-TIME' }
}))
event = event.pushProperty(new Properties.DTEND({
  value: new Date('1991-03-07 19:30:00')
}))
event = event.pushProperty(new Properties.ATTENDEE({
  parameters: {
    CN: 'Sample Company',
    RSVP: 'FALSE:foo@example.com'
  }
}))

const eventAlarm = new Components.VALARM({
  properties: [
    new Properties.ACTION({ value: 'DISPLAY' }),
    new Properties.TRIGGER({ value: '-PT12H' }),
    new Properties.DESCRIPTION({ value: 'Event reminder' })
  ]
})

event = event.pushComponent(eventAlarm)

calendar = calendar.pushComponent(event)

const todo = new Components.VTODO({
  properties: [
    new Properties.UID({ value: 1 }),
    new Properties.DTSTAMP({ value: new Date('2015-07-18 10:00:00') }),
    new Properties.DUE({ value: new Date('2015-07-19 10:00:00') }),
    new Properties.SUMMARY({ value: 'To Do (the purpose of creating this long string is to test the 75 character limit per the RFC)' }),
    new Properties.CATEGORIES({ value: ['WORK', 'FAMILY'] })
  ]
})

calendar = calendar.pushComponent(todo)

const singleInstantiationCalendar = new Components.VCALENDAR({
  components: [
    new Components.VEVENT({
      components: [
        new Components.VALARM({
          properties: [
            new Properties.ACTION({ value: 'DISPLAY' }),
            new Properties.TRIGGER({ value: '-PT12H' }),
            new Properties.DESCRIPTION({ value: 'Event reminder' })
          ]
        })
      ],
      properties: [
        new Properties.UID({ value: 1 }),
        new Properties.DTSTAMP({
          value: new Date('1991-07-11'),
          parameters: { VALUE: 'DATE' }
        }),
        new Properties.SUMMARY({ value: 'Birthdate' }),
        new Properties.DTSTART({
          value: new Date('1991-03-07 07:00:00'),
          parameters: { VALUE: 'DATE-TIME' }
        }),
        new Properties.DTEND({
          value: new Date('1991-03-07 19:30:00')
        }),
        new Properties.ATTENDEE({
          parameters: {
            CN: 'Sample Company',
            RSVP: 'FALSE:foo@example.com'
          }
        })
      ]
    }),
    new Components.VTODO({
      properties: [
        new Properties.UID({ value: 1 }),
        new Properties.DTSTAMP({ value: new Date('2015-07-18 10:00:00') }),
        new Properties.DUE({ value: new Date('2015-07-19 10:00:00') }),
        new Properties.SUMMARY({ value: 'To Do (the purpose of creating this long string is to test the 75 character limit per the RFC)' }),
        new Properties.CATEGORIES({ value: ['WORK', 'FAMILY'] })
      ]
    })
  ],
  properties: [
    new Properties.VERSION({ value: 2 }),
    new Properties.PRODID({ value: 'XYZ Corp' })
  ]
})

const icsString = 'BEGIN:VCALENDAR\r\n' +
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

describe('immutable-ics', () => {
  describe('creating an ICS file', () => {
    it('should return an ICS file as a string', () => {
      assert.equal(calendar.toString(), icsString)
      assert.equal(singleInstantiationCalendar.toString(), icsString)
    })
  })
})

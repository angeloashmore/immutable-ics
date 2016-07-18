/* eslint-env mocha */

import assert from 'assert'
import { Component, Property } from '../../src'

let calendar = new Component({
  name: 'VCALENDAR',
  properties: [
    new Property({ name: 'VERSION', value: 2 })
  ]
})

calendar = calendar.pushProperty(new Property({ name: 'PRODID', value: 'XYZ Corp' }))

let event = new Component({ name: 'VEVENT' })

event = event.pushProperty(new Property({ name: 'UID', value: 1 }))
event = event.pushProperty(new Property({
  name: 'DTSTAMP',
  value: new Date('1991-07-11'),
  parameters: { VALUE: 'DATE' }
}))
event = event.pushProperty(new Property({ name: 'SUMMARY', value: 'Birthdate' }))
event = event.pushProperty(new Property({
  name: 'DTSTART',
  value: new Date('1991-03-07 07:00:00'),
  parameters: { VALUE: 'DATE-TIME' }
}))
event = event.pushProperty(new Property({
  name: 'DTEND',
  value: new Date('1991-03-07 19:30:00')
}))
event = event.pushProperty(new Property({
  name: 'ATTENDEE',
  parameters: {
    CN: 'Sample Company',
    RSVP: 'FALSE:foo@example.com'
  }
}))

const eventAlarm = new Component({
  name: 'VALARM',
  properties: [
    new Property({ name: 'ACTION', value: 'DISPLAY' }),
    new Property({ name: 'TRIGGER', value: '-PT12H' }),
    new Property({ name: 'DESCRIPTION', value: 'Event reminder' })
  ]
})

event = event.pushComponent(eventAlarm)

calendar = calendar.pushComponent(event)

const todo = new Component({
  name: 'VTODO',
  properties: [
    new Property({ name: 'UID', value: 1 }),
    new Property({ name: 'DTSTAMP', value: new Date('2015-07-18 10:00:00') }),
    new Property({ name: 'DUE', value: '20150719T100000' }),
    new Property({ name: 'SUMMARY', value: 'To Do (the purpose of creating this long string is to test the 75 character limit per the RFC)' }),
    new Property({ name: 'CATEGORIES', value: ['WORK', 'FAMILY'] })
  ]
})

calendar = calendar.pushComponent(todo)

const singleInstantiationCalendar = new Component({
  name: 'VCALENDAR',
  components: [
    new Component({
      name: 'VEVENT',
      components: [
        new Component({
          name: 'VALARM',
          properties: [
            new Property({ name: 'ACTION', value: 'DISPLAY' }),
            new Property({ name: 'TRIGGER', value: '-PT12H' }),
            new Property({ name: 'DESCRIPTION', value: 'Event reminder' })
          ]
        })
      ],
      properties: [
        new Property({ name: 'UID', value: 1 }),
        new Property({
          name: 'DTSTAMP',
          value: new Date('1991-07-11'),
          parameters: { VALUE: 'DATE' }
        }),
        new Property({ name: 'SUMMARY', value: 'Birthdate' }),
        new Property({
          name: 'DTSTART',
          value: new Date('1991-03-07 07:00:00'),
          parameters: { VALUE: 'DATE-TIME' }
        }),
        new Property({
          name: 'DTEND',
          value: new Date('1991-03-07 19:30:00')
        }),
        new Property({
          name: 'ATTENDEE',
          parameters: {
            CN: 'Sample Company',
            RSVP: 'FALSE:foo@example.com'
          }
        })
      ]
    }),
    new Component({
      name: 'VTODO',
      properties: [
        new Property({ name: 'UID', value: 1 }),
        new Property({ name: 'DTSTAMP', value: new Date('2015-07-18 10:00:00') }),
        new Property({ name: 'DUE', value: '20150719T100000' }),
        new Property({ name: 'SUMMARY', value: 'To Do (the purpose of creating this long string is to test the 75 character limit per the RFC)' }),
        new Property({ name: 'CATEGORIES', value: ['WORK', 'FAMILY'] })
      ]
    })
  ],
  properties: [
    new Property({ name: 'VERSION', value: 2 }),
    new Property({ name: 'PRODID', value: 'XYZ Corp' })
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

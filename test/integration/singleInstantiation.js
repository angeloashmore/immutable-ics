/* eslint-env mocha */

import assert from 'assert'
import { Component, Property } from '../../src'
import exampleOutput from '../fixtures/exampleOutput'

const calendar = new Component({
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
        new Property({
          name: 'SUMMARY',
          value: 'To Do (the purpose of creating this long string is to test the 75 character limit per the RFC)'
        }),
        new Property({
          name: 'DESCRIPTION',
          value: 'Test character escaping: \n , ; \\'
        }),
        new Property({ name: 'CATEGORIES', value: ['WORK', 'FAMILY'] })
      ]
    })
  ],
  properties: [
    new Property({ name: 'VERSION', value: 2 }),
    new Property({ name: 'PRODID', value: 'XYZ Corp' })
  ]
})

describe('immutable-ics', () => {
  describe('creating an ICS file with single instantiation', () => {
    it('should return an ICS file as a string', () => {
      assert.equal(calendar.toString(), exampleOutput)
    })
  })
})

import React from 'react'
import {render} from 'react-dom'
import {equal, ok} from 'assert'
import uniqueName from './uniqueName'

describe('uniqueName', () => {
  describe('no name specified', () => {
    it('has unique id', () => {
      const root = document.createElement('div')

      function Input ({name}) {
        return <input name={name} />
      }

      const UniquelyNamedInput = uniqueName(Input)

      render(
        <div>
          <UniquelyNamedInput />
          <UniquelyNamedInput />
          <UniquelyNamedInput />
        </div>,
        root
      )

      const inputList = root.children[0].children

      ok(
        inputList[0]
          .getAttribute('name')
          .match(/^Input-[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
      )

      ok(
        inputList[0].getAttribute('name') !== inputList[1].getAttribute('name')
      )

      ok(
        inputList[1].getAttribute('name') !== inputList[2].getAttribute('name')
      )

      ok(
        inputList[0].getAttribute('name') !== inputList[2].getAttribute('name')
      )
    })
  })

  describe('name specified', () => {
    it('has the name', () => {
      const root = document.createElement('div')

      function Input ({name}) {
        return <input name={name} />
      }

      const UniquelyNamedInput = uniqueName(Input)

      render(
        <UniquelyNamedInput name='actualName' />,
        root
      )

      equal(root.children[0].getAttribute('name'), 'actualName')
    })
  })
})

import { BaseEvent, IBaseEvent, listenAppEvent, sendAppEvent } from '../../../src/common'
import { EventEmitter } from 'events'

class SampleEvent extends BaseEvent {}

describe('common', () => {
  describe('app-events', () => {
    it('BaseEvent', () => {
      const event = new SampleEvent('sample-event')
      expect(event.systemName).toEqual('sample-event')
    })
    it('sendAppEvent', () => {
      const event = new SampleEvent('sample-event')

      const mockEmitFn = jest.fn()
      EventEmitter.prototype.emit = mockEmitFn

      sendAppEvent(event)

      expect(mockEmitFn).toBeCalled()
      expect(mockEmitFn.mock.calls[0][0]).toEqual('sample-event')
      expect(mockEmitFn.mock.calls[0][1]).toEqual(event)
    })
    it('listenAppEvent', () => {
      const mockAddListener = jest.fn()
      const mockListener = jest.fn()

      EventEmitter.prototype.addListener = mockAddListener

      listenAppEvent('sample-event', mockListener)

      expect(mockAddListener).toBeCalled()
      expect(mockAddListener.mock.calls[0][0]).toEqual('sample-event')
      expect(mockAddListener.mock.calls[0][1]).toEqual(mockListener)
    })
  })
})

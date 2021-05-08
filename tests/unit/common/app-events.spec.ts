
import { BaseEvent, IBaseEvent, listenAppEvent, sendAppEvent } from '../../../src/common'

class SampleEvent extends BaseEvent {}

describe('common', () => {
  describe('app-events', () => {
    it('BaseEvent', () => {
      const event = new SampleEvent('sample-event')
      expect(event.systemName).toEqual('sample-event')
    })
    it('listenAppEvent', async () => {
      const mockListener = jest.fn()
      const mockListener2 = jest.fn()

      listenAppEvent('sample-event', mockListener)
      listenAppEvent('sample-event', mockListener2)

      await sendAppEvent(new SampleEvent('sample-event'))

      expect(mockListener).toBeCalled()
      expect(mockListener2).toBeCalled()
    })
    it('listenAppEvent regex', async () => {
      const mockListener = jest.fn()
      const mockListener2 = jest.fn()
      const mockListener3 = jest.fn()

      listenAppEvent(new RegExp(/^entity\.([a-zA-Z0-9]{1,})\.created$/), mockListener)
      listenAppEvent('entity.sample.created', mockListener2)
      listenAppEvent('entity.sample', mockListener3)

      await sendAppEvent(new SampleEvent('entity.sample.created'))

      expect(mockListener).toBeCalled()
      expect(mockListener2).toBeCalled()
      expect(mockListener3).not.toBeCalled()
    })
  })
})

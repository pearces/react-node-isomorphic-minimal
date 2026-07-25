import util from 'util';
import { jest, expect, describe, it, test, beforeEach, afterEach } from '@jest/globals';

Object.assign(globalThis, { jest, expect, describe, it, test, beforeEach, afterEach });

type MessageHandler = (event: MessageEvent) => void;

if (typeof globalThis.MessageChannel === 'undefined') {
  class MockMessagePort {
    public onmessage: MessageHandler | null = null;
    public remotePort: MockMessagePort | null = null;

    public postMessage(data: unknown): void {
      if (this.remotePort?.onmessage) {
        // Defer execution to mimic async microtasks safely
        setTimeout(() => {
          this.remotePort?.onmessage?.({ data } as MessageEvent);
        }, 0);
      }
    }

    public close(): void {
      // no-op
    }
  }

  class MockMessageChannel {
    public port1: MockMessagePort;
    public port2: MockMessagePort;

    constructor() {
      this.port1 = new MockMessagePort();
      this.port2 = new MockMessagePort();
      this.port1.remotePort = this.port2;
      this.port2.remotePort = this.port1;
    }
  }

  globalThis.MessageChannel = MockMessageChannel as unknown as typeof globalThis.MessageChannel;
}

if (typeof globalThis.TextEncoder === 'undefined') {
  Object.defineProperty(globalThis, 'TextEncoder', {
    value: util.TextEncoder,
    configurable: true
  });
}

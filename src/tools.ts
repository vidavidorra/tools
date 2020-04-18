import { Tool } from './tool';
import { tool as bufferConverter } from './buffer-converter';
import { tool as hexStringConverter } from './hex-string-converter';

class Tools {
  private tools: Tool[];

  constructor() {
    this.tools = [bufferConverter, hexStringConverter];
  }

  print(): void {
    this.tools.forEach((tool): void => {
      tool.print();
    });
  }
}

new Tools().print();

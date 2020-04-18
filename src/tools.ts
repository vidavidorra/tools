import { Tool } from './tool';
import { tool as bufferConverter } from './buffer-converter';

class Tools {
  private tools: Tool[];

  constructor() {
    this.tools = [bufferConverter];
  }

  print(): void {
    this.tools.forEach((tool): void => {
      tool.print();
    });
  }
}

new Tools().print();

import { Tool } from './tool';
import { tool as bufferConverter } from './buffer-converter';
import { tool as hexStringConverter } from './hex-string-converter';
import { tool as mapGnuSymbol } from './map-gnu-symbol';
import { tool as vidavidorraLogo } from './vidavidorra-logo';

class Tools {
  private tools: Tool[];

  constructor() {
    this.tools = [
      bufferConverter,
      hexStringConverter,
      mapGnuSymbol,
      vidavidorraLogo,
    ];
  }

  print(): void {
    this.tools.forEach((tool): void => {
      tool.print();
    });
  }
}

new Tools().print();

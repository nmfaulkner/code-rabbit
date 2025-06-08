import { Logger } from "./logger";

export function WithLogger() {
  return function (
    _target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const logger = new Logger();
      const method = this.constructor.name.replace("Controller", "");
      const endpoint = `/${method.toLowerCase()}/${propertyKey}`;

      logger.info(`HTTP POST ${endpoint}`);

      return originalMethod.apply(this, [...args, logger]);
    };

    return descriptor;
  };
}

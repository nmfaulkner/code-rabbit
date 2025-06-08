// TODO: replace with Datadog, Sentry etc
export class Logger {
  constructor(private readonly requestId: string = Math.random().toString(36).substring(7)) {}

  info(message: string, params?: any) {
    console.log("INFO: " + JSON.stringify({ requestId: this.requestId, info: message, ...params }));
  }

  error(message: string, params?: any) {
    console.error("ERROR: " + JSON.stringify({ requestId: this.requestId, error: message, ...params }));
  }
}

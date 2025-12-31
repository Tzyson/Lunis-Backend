import type { Context } from "hono"

interface ErrorData {
  errorCode: string | number;
  errorMessage: string;
  messageVars: (string | null)[];
  numericErrorCode: number;
  originatingService: string;
  intent: string;
  createdAt: string;
  error?: any;
  error_description?: string;
}

export default class ErrorHandler {
  private static errors: ErrorData[] = [];
  static create (
    errorCode: string | number,
    errorMessage: string,
    messageVars: (string | null)[] = [],
    numericErrorCode: number,
    error: any | null,
    statusCode: number,
    c?: Context
  ): Response {
    const data: ErrorData = {
      errorCode,
      errorMessage,
      messageVars,
      numericErrorCode,
      originatingService: "Lynt",
      intent: "prod",
      createdAt: new Date().toISOString(),
      error,
      error_description: errorMessage,
    };
    if (c) {
      c.header("X-Epic-Error-Name", String(errorCode))
      c.header("X-Epic-Error-Code", String(numericErrorCode))
      return c.json(data, { status: statusCode as any })
    }
    /*for (const messagevar of messageVars)
    {
      this.errors.messageVars?.push(messageVars);
    }*/
    this.errors.push(data);
    return new Response(JSON.stringify(data), { status: statusCode });
  }

  static getAll(): ErrorData[] {
    return this.errors;
  }

  static clear(): void {
    this.errors = [];
  }
}
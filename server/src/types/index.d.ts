declare global {
  type APIErrorDetails = {
    field?: string;
    message?: string;
  };
  type APITypeError = {
    type: string;
    details?: APIErrorDetails[];
  };
  type APIErrorType = string | APITypeError;
}

export {};

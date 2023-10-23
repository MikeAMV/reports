export type Entity<ID extends number | string> = {
  id: ID;
};

export type TPagination = {
  filter: string;
  page?: number;
  offset?: number;
  limit?: number;
  sortBy?: string;
  totalPages?: number;
  sort?: string;
  total?: number;
};

export type TStatus = Entity<number> & {
  description?: string;
};

export type TJson = {
  [x: string]: any;
};

export type TJsonArray = TJson[];

export enum Errors {
  NO_DATA_FOUND = 'NoDataFound',
  INTERNAL_SERVER_ERROR = 'InternalServerError',
  UNAUTHORIZED = 'UnAuthorized',
  MISSING_FIELDS = 'MissingFields',
  RECORD_NOT_REGISTERED = 'RecordNotRegistered',
  RECORD_NOT_UPDATED = 'RecordNotUpdated',
  ALREADY_EXISTS = 'Alreadyexists',
  INVALIDFIELDS = 'InvalidDataTypeInFields',
  CREDENTIALS_MISMATCH = 'CredentialsMismatch',
}

export const ErrorMessage: TJson = {
  NO_DATA_FOUND: { message: 'NoDataFound', error: true, status: 400 },
  INTERNAL_SERVER_ERROR: {
    message: 'InternalServerError',
    error: true,
    status: 400,
  },
  UNAUTHORIZED: {
    message: 'UnAuthorized',
    error: true,
    status: 400,
  },
  MISSING_FIELDS: {
    message: 'MissingFields',
    error: true,
    status: 400,
  },
  RECORD_NOT_REGISTERED: {
    message: 'RecordNotRegistered',
    error: true,
    status: 400,
  },
  RECORD_NOT_UPDATED: {
    message: 'RecordNotUpdated',
    error: true,
    status: 400,
  },
  ALREADY_EXISTS: {
    message: 'Alreadyexists',
    error: true,
    status: 400,
  },
  INVALIDFIELDS: {
    message: 'InvalidDataTypeInFields',
    error: true,
    status: 400,
  },
  CREDENTIALS_MISMATCH: {
    message: 'CredentialsMismatch',
    error: true,
    status: 400,
  },
};

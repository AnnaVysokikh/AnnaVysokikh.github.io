export type Product = {
  id: string;
  name: string;
  photo?: string;
  desc?: string;
  createdAt: Date;
  updatedAt: Date;
  oldPrice?: number;
  price: number;
  category: Category;
};
export interface ImageItem {
  id: number;
  imageKey: string;
  fileName?: string;
  selectedFile: boolean;
}

export type NewProduct = {
  id?: string;
  name: string;
  file?: File;
  url?: string;
  desc?: string;
  oldPrice?: number;
  price: number;
  categoryId: string;
};

export type Category = {
  id: string;
  name: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ServerErrors = {
  errors: {
    extensions: {
      code: ErrorCode;
    };

    name: string;
    stack: string;
    message: string;
  }[];
};

export type Message = {
  caption?: string;
  text?: string;
  errors?: ServerErrors;
  messageType: 'Error' | 'Info';
};

enum ErrorCode {
  ERR_INCORRECT_EMAIL_OR_PASSWORD = 'ERR_INCORRECT_EMAIL_OR_PASSWORD',
  ERR_NOT_FOUND = 'ERR_NOT_FOUND',
  ERR_FIELD_REQUIRED = 'ERR_FIELD_REQUIRED',
  ERR_INCORRECT_PASSWORD = 'ERR_INCORRECT_PASSWORD',
  ERR_ACCOUNT_ALREADY_EXIST = 'ERR_ACCOUNT_ALREADY_EXIST',
  ERR_INVALID_PASSWORD = 'ERR_INVALID_PASSWORD',
  ERR_AUTH = 'ERR_AUTH',
  ERR_NO_FILES = 'ERR_NO_FILES',
  ERR_NOT_ALLOWED = 'ERR_NOT_ALLOWED',
  ERR_DATA_BASE_ERROR = 'ERR_DATA_BASE_ERROR',
  ERR_VALIDATION_ERROR = 'ERR_VALIDATION_ERROR',
}


export type CategoryList = {
  data: Category[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name';
  }
}


export type UploadFile = {
  url: string;
}

export type SignUpBody = {
  email: string;
  password: string;
  commandId: string;
};

export type AuthResult = {
  token: string;
};

export type SignInBody = {
  email: string;
  password: string;
};

export interface ThunkApi {
  errorMessage: string;
  // ...
}

export type Profile = {
  id: string;
  name: string;
  email: string;
  signUpDate: Date;
};

export type UpdateProfileBody = {
  name: string;
};

export type ChangePasswordBody = {
  password: string;
  newPassword: string;
};

export type ChangePasswordResult = {
  success: boolean;
};
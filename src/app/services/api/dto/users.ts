export interface CreateUserRequest {
    staffId: string;
    name: string;
    email: string;
    designation: string;
    role: string;
}

export interface CreateUserResponse {
    message: string;
}

export interface EditUserRequest {
    staffId: string;
    name: string;
    email: string;
    designation: string;
}

export interface AddProfilePictureRequest {
    fileName: string;
    dataUrl: any;
    extension: string;
}

export interface GetUserResponse {
    id: string;
    staffId: string;
    name: string;
    email: string;
    designation: string;
    role: string;
}

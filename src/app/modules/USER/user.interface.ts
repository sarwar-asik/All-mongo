/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type IUser = {
  _id?:Types.ObjectId,
  password: string;
  role: 'buyer' | 'seller' | 'admin';
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
  budget?: number;
  income?: number;
};

// export type UserModel =Model<IUser,Record<string,unknown>>

export type UserModel = {
  isUserExistsMethod(
    phoneNumber: string
  ): Promise<Pick<IUser, 'password' | 'role' | 'phoneNumber'|'_id'>>;
  isPasswordMatchMethod(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean | null>;
} & Model<IUser>;

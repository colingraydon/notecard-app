/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Card = {
  __typename?: "Card";
  cardId: Scalars["Float"];
  createdAt: Scalars["String"];
  creatorId: Scalars["Float"];
  subject: Subject;
  text: Scalars["String"];
  title: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type CardInput = {
  subId: Scalars["Float"];
  text: Scalars["String"];
  title: Scalars["String"];
};

export type CardResponse = {
  __typename?: "CardResponse";
  card?: Maybe<Card>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  changePassword: UserResponse;
  createCard: CardResponse;
  createNotification: Notification;
  createSubject: SubjectResponse;
  deleteCard: Scalars["Boolean"];
  deleteNotification: Scalars["Boolean"];
  deleteSubject: Scalars["Boolean"];
  deleteUser: Scalars["Boolean"];
  forgotPassword: Scalars["Boolean"];
  login: UserResponse;
  logout: Scalars["Boolean"];
  register: UserResponse;
  updateCard?: Maybe<Card>;
  updateNotification: NotificationResponse;
  updateSubject: Subject;
  updateSubjectName: Subject;
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars["String"];
  token: Scalars["String"];
};

export type MutationCreateCardArgs = {
  input: CardInput;
};

export type MutationCreateNotificationArgs = {
  read: Scalars["Boolean"];
  text: Scalars["String"];
};

export type MutationCreateSubjectArgs = {
  input: Scalars["String"];
};

export type MutationDeleteCardArgs = {
  cardId: Scalars["Int"];
};

export type MutationDeleteNotificationArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteSubjectArgs = {
  id: Scalars["Int"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  usernameOrEmail: Scalars["String"];
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationUpdateCardArgs = {
  cardId: Scalars["Int"];
  text: Scalars["String"];
  title: Scalars["String"];
};

export type MutationUpdateNotificationArgs = {
  id: Scalars["Int"];
  read: Scalars["Boolean"];
};

export type MutationUpdateSubjectArgs = {
  input: SubjectInput;
};

export type MutationUpdateSubjectNameArgs = {
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type Notification = {
  __typename?: "Notification";
  createdAt: Scalars["String"];
  creatorId?: Maybe<Scalars["Float"]>;
  id: Scalars["Float"];
  owner: User;
  read: Scalars["Boolean"];
  text: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type NotificationResponse = {
  __typename?: "NotificationResponse";
  errors?: Maybe<Array<FieldError>>;
  notification?: Maybe<Notification>;
};

export type Query = {
  __typename?: "Query";
  card?: Maybe<Card>;
  getNotifications?: Maybe<Array<Notification>>;
  getSubjects?: Maybe<Array<Subject>>;
  me?: Maybe<User>;
  meEmail?: Maybe<User>;
  notification?: Maybe<Notification>;
  subject?: Maybe<Subject>;
  test: Scalars["String"];
};

export type QueryCardArgs = {
  id: Scalars["Int"];
};

export type QueryNotificationArgs = {
  id: Scalars["Int"];
};

export type QuerySubjectArgs = {
  id: Scalars["Int"];
};

export type Subject = {
  __typename?: "Subject";
  cards: Array<Card>;
  createdAt: Scalars["String"];
  creator: User;
  creatorId?: Maybe<Scalars["Float"]>;
  id: Scalars["Float"];
  name: Scalars["String"];
  prevScore?: Maybe<Scalars["Float"]>;
  prevTime?: Maybe<Scalars["Float"]>;
  updatedAt: Scalars["String"];
};

export type SubjectInput = {
  id: Scalars["Float"];
  name: Scalars["String"];
  prevScore: Scalars["Float"];
  prevTime: Scalars["Float"];
};

export type SubjectResponse = {
  __typename?: "SubjectResponse";
  errors?: Maybe<Array<FieldError>>;
  subject?: Maybe<Subject>;
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["String"];
  email: Scalars["String"];
  id: Scalars["Float"];
  notifications?: Maybe<Array<Notification>>;
  subjects?: Maybe<Array<Subject>>;
  updatedAt: Scalars["String"];
  username: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars["String"];
  newPassword: Scalars["String"];
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      message: string;
      field: string;
    }> | null;
    user?: {
      __typename?: "User";
      createdAt: string;
      id: number;
      updatedAt: string;
      username: string;
    } | null;
  };
};

export type CreateCardMutationVariables = Exact<{
  input: CardInput;
}>;

export type CreateCardMutation = {
  __typename?: "Mutation";
  createCard: {
    __typename?: "CardResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    card?: { __typename?: "Card"; text: string; title: string } | null;
  };
};

export type CreateNotificationMutationVariables = Exact<{
  read: Scalars["Boolean"];
  text: Scalars["String"];
}>;

export type CreateNotificationMutation = {
  __typename?: "Mutation";
  createNotification: {
    __typename?: "Notification";
    id: number;
    text: string;
    read: boolean;
  };
};

export type CreateSubjectMutationVariables = Exact<{
  input: Scalars["String"];
}>;

export type CreateSubjectMutation = {
  __typename?: "Mutation";
  createSubject: {
    __typename?: "SubjectResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    subject?: {
      __typename?: "Subject";
      name: string;
      createdAt: string;
      updatedAt: string;
      id: number;
    } | null;
  };
};

export type DeleteCardMutationVariables = Exact<{
  cardId: Scalars["Int"];
}>;

export type DeleteCardMutation = {
  __typename?: "Mutation";
  deleteCard: boolean;
};

export type DeleteNotificationMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteNotificationMutation = {
  __typename?: "Mutation";
  deleteNotification: boolean;
};

export type DeleteSubjectMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteSubjectMutation = {
  __typename?: "Mutation";
  deleteSubject: boolean;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ForgotPasswordMutation = {
  __typename?: "Mutation";
  forgotPassword: boolean;
};

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      message: string;
      field: string;
    }> | null;
    user?: {
      __typename?: "User";
      createdAt: string;
      id: number;
      updatedAt: string;
      username: string;
      email: string;
    } | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      message: string;
      field: string;
    }> | null;
    user?: {
      __typename?: "User";
      createdAt: string;
      id: number;
      updatedAt: string;
      username: string;
      email: string;
    } | null;
  };
};

export type UpdateCardMutationVariables = Exact<{
  cardId: Scalars["Int"];
  title: Scalars["String"];
  text: Scalars["String"];
}>;

export type UpdateCardMutation = {
  __typename?: "Mutation";
  updateCard?: {
    __typename?: "Card";
    cardId: number;
    title: string;
    text: string;
  } | null;
};

export type UpdateNotificationMutationVariables = Exact<{
  id: Scalars["Int"];
  read: Scalars["Boolean"];
}>;

export type UpdateNotificationMutation = {
  __typename?: "Mutation";
  updateNotification: {
    __typename?: "NotificationResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    notification?: {
      __typename?: "Notification";
      id: number;
      text: string;
      read: boolean;
    } | null;
  };
};

export type UpdateSubjectMutationVariables = Exact<{
  input: SubjectInput;
}>;

export type UpdateSubjectMutation = {
  __typename?: "Mutation";
  updateSubject: {
    __typename?: "Subject";
    id: number;
    prevScore?: number | null;
    prevTime?: number | null;
  };
};

export type UpdateSubjectNameMutationVariables = Exact<{
  name: Scalars["String"];
  id: Scalars["Int"];
}>;

export type UpdateSubjectNameMutation = {
  __typename?: "Mutation";
  updateSubjectName: { __typename?: "Subject"; id: number; name: string };
};

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never }>;

export type GetNotificationsQuery = {
  __typename?: "Query";
  getNotifications?: Array<{
    __typename?: "Notification";
    id: number;
    text: string;
    read: boolean;
    createdAt: string;
  }> | null;
};

export type GetSubjectsQueryVariables = Exact<{ [key: string]: never }>;

export type GetSubjectsQuery = {
  __typename?: "Query";
  getSubjects?: Array<{
    __typename?: "Subject";
    name: string;
    id: number;
    prevScore?: number | null;
    updatedAt: string;
    prevTime?: number | null;
    cards: Array<{
      __typename?: "Card";
      cardId: number;
      title: string;
      text: string;
    }>;
  }> | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: { __typename?: "User"; id: number; username: string } | null;
};

export type MeEmailQueryVariables = Exact<{ [key: string]: never }>;

export type MeEmailQuery = {
  __typename?: "Query";
  meEmail?: {
    __typename?: "User";
    id: number;
    username: string;
    email: string;
  } | null;
};

export const ChangePasswordDocument = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      errors {
        message
        field
      }
      user {
        createdAt
        id
        updatedAt
        username
      }
    }
  }
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
  Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const CreateCardDocument = gql`
  mutation createCard($input: CardInput!) {
    createCard(input: $input) {
      errors {
        field
        message
      }
      card {
        text
        title
      }
    }
  }
`;
export type CreateCardMutationFn = Apollo.MutationFunction<
  CreateCardMutation,
  CreateCardMutationVariables
>;

/**
 * __useCreateCardMutation__
 *
 * To run a mutation, you first call `useCreateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCardMutation, { data, loading, error }] = useCreateCardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCardMutation,
    CreateCardMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCardMutation, CreateCardMutationVariables>(
    CreateCardDocument,
    options
  );
}
export type CreateCardMutationHookResult = ReturnType<
  typeof useCreateCardMutation
>;
export type CreateCardMutationResult =
  Apollo.MutationResult<CreateCardMutation>;
export type CreateCardMutationOptions = Apollo.BaseMutationOptions<
  CreateCardMutation,
  CreateCardMutationVariables
>;
export const CreateNotificationDocument = gql`
  mutation CreateNotification($read: Boolean!, $text: String!) {
    createNotification(read: $read, text: $text) {
      id
      text
      read
    }
  }
`;
export type CreateNotificationMutationFn = Apollo.MutationFunction<
  CreateNotificationMutation,
  CreateNotificationMutationVariables
>;

/**
 * __useCreateNotificationMutation__
 *
 * To run a mutation, you first call `useCreateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNotificationMutation, { data, loading, error }] = useCreateNotificationMutation({
 *   variables: {
 *      read: // value for 'read'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateNotificationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNotificationMutation,
    CreateNotificationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateNotificationMutation,
    CreateNotificationMutationVariables
  >(CreateNotificationDocument, options);
}
export type CreateNotificationMutationHookResult = ReturnType<
  typeof useCreateNotificationMutation
>;
export type CreateNotificationMutationResult =
  Apollo.MutationResult<CreateNotificationMutation>;
export type CreateNotificationMutationOptions = Apollo.BaseMutationOptions<
  CreateNotificationMutation,
  CreateNotificationMutationVariables
>;
export const CreateSubjectDocument = gql`
  mutation CreateSubject($input: String!) {
    createSubject(input: $input) {
      errors {
        field
        message
      }
      subject {
        name
        createdAt
        updatedAt
        id
      }
    }
  }
`;
export type CreateSubjectMutationFn = Apollo.MutationFunction<
  CreateSubjectMutation,
  CreateSubjectMutationVariables
>;

/**
 * __useCreateSubjectMutation__
 *
 * To run a mutation, you first call `useCreateSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubjectMutation, { data, loading, error }] = useCreateSubjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSubjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSubjectMutation,
    CreateSubjectMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateSubjectMutation,
    CreateSubjectMutationVariables
  >(CreateSubjectDocument, options);
}
export type CreateSubjectMutationHookResult = ReturnType<
  typeof useCreateSubjectMutation
>;
export type CreateSubjectMutationResult =
  Apollo.MutationResult<CreateSubjectMutation>;
export type CreateSubjectMutationOptions = Apollo.BaseMutationOptions<
  CreateSubjectMutation,
  CreateSubjectMutationVariables
>;
export const DeleteCardDocument = gql`
  mutation DeleteCard($cardId: Int!) {
    deleteCard(cardId: $cardId)
  }
`;
export type DeleteCardMutationFn = Apollo.MutationFunction<
  DeleteCardMutation,
  DeleteCardMutationVariables
>;

/**
 * __useDeleteCardMutation__
 *
 * To run a mutation, you first call `useDeleteCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCardMutation, { data, loading, error }] = useDeleteCardMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *   },
 * });
 */
export function useDeleteCardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCardMutation,
    DeleteCardMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteCardMutation, DeleteCardMutationVariables>(
    DeleteCardDocument,
    options
  );
}
export type DeleteCardMutationHookResult = ReturnType<
  typeof useDeleteCardMutation
>;
export type DeleteCardMutationResult =
  Apollo.MutationResult<DeleteCardMutation>;
export type DeleteCardMutationOptions = Apollo.BaseMutationOptions<
  DeleteCardMutation,
  DeleteCardMutationVariables
>;
export const DeleteNotificationDocument = gql`
  mutation DeleteNotification($id: Int!) {
    deleteNotification(id: $id)
  }
`;
export type DeleteNotificationMutationFn = Apollo.MutationFunction<
  DeleteNotificationMutation,
  DeleteNotificationMutationVariables
>;

/**
 * __useDeleteNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNotificationMutation, { data, loading, error }] = useDeleteNotificationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNotificationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteNotificationMutation,
    DeleteNotificationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteNotificationMutation,
    DeleteNotificationMutationVariables
  >(DeleteNotificationDocument, options);
}
export type DeleteNotificationMutationHookResult = ReturnType<
  typeof useDeleteNotificationMutation
>;
export type DeleteNotificationMutationResult =
  Apollo.MutationResult<DeleteNotificationMutation>;
export type DeleteNotificationMutationOptions = Apollo.BaseMutationOptions<
  DeleteNotificationMutation,
  DeleteNotificationMutationVariables
>;
export const DeleteSubjectDocument = gql`
  mutation DeleteSubject($id: Int!) {
    deleteSubject(id: $id)
  }
`;
export type DeleteSubjectMutationFn = Apollo.MutationFunction<
  DeleteSubjectMutation,
  DeleteSubjectMutationVariables
>;

/**
 * __useDeleteSubjectMutation__
 *
 * To run a mutation, you first call `useDeleteSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubjectMutation, { data, loading, error }] = useDeleteSubjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSubjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteSubjectMutation,
    DeleteSubjectMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteSubjectMutation,
    DeleteSubjectMutationVariables
  >(DeleteSubjectDocument, options);
}
export type DeleteSubjectMutationHookResult = ReturnType<
  typeof useDeleteSubjectMutation
>;
export type DeleteSubjectMutationResult =
  Apollo.MutationResult<DeleteSubjectMutation>;
export type DeleteSubjectMutationOptions = Apollo.BaseMutationOptions<
  DeleteSubjectMutation,
  DeleteSubjectMutationVariables
>;
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult =
  Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      errors {
        message
        field
      }
      user {
        createdAt
        id
        updatedAt
        username
        email
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      errors {
        message
        field
      }
      user {
        createdAt
        id
        updatedAt
        username
        email
      }
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const UpdateCardDocument = gql`
  mutation UpdateCard($cardId: Int!, $title: String!, $text: String!) {
    updateCard(cardId: $cardId, title: $title, text: $text) {
      cardId
      title
      text
    }
  }
`;
export type UpdateCardMutationFn = Apollo.MutationFunction<
  UpdateCardMutation,
  UpdateCardMutationVariables
>;

/**
 * __useUpdateCardMutation__
 *
 * To run a mutation, you first call `useUpdateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCardMutation, { data, loading, error }] = useUpdateCardMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *      title: // value for 'title'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdateCardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCardMutation,
    UpdateCardMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCardMutation, UpdateCardMutationVariables>(
    UpdateCardDocument,
    options
  );
}
export type UpdateCardMutationHookResult = ReturnType<
  typeof useUpdateCardMutation
>;
export type UpdateCardMutationResult =
  Apollo.MutationResult<UpdateCardMutation>;
export type UpdateCardMutationOptions = Apollo.BaseMutationOptions<
  UpdateCardMutation,
  UpdateCardMutationVariables
>;
export const UpdateNotificationDocument = gql`
  mutation UpdateNotification($id: Int!, $read: Boolean!) {
    updateNotification(id: $id, read: $read) {
      errors {
        field
        message
      }
      notification {
        id
        text
        read
      }
    }
  }
`;
export type UpdateNotificationMutationFn = Apollo.MutationFunction<
  UpdateNotificationMutation,
  UpdateNotificationMutationVariables
>;

/**
 * __useUpdateNotificationMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationMutation, { data, loading, error }] = useUpdateNotificationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      read: // value for 'read'
 *   },
 * });
 */
export function useUpdateNotificationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateNotificationMutation,
    UpdateNotificationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateNotificationMutation,
    UpdateNotificationMutationVariables
  >(UpdateNotificationDocument, options);
}
export type UpdateNotificationMutationHookResult = ReturnType<
  typeof useUpdateNotificationMutation
>;
export type UpdateNotificationMutationResult =
  Apollo.MutationResult<UpdateNotificationMutation>;
export type UpdateNotificationMutationOptions = Apollo.BaseMutationOptions<
  UpdateNotificationMutation,
  UpdateNotificationMutationVariables
>;
export const UpdateSubjectDocument = gql`
  mutation UpdateSubject($input: SubjectInput!) {
    updateSubject(input: $input) {
      id
      prevScore
      prevTime
    }
  }
`;
export type UpdateSubjectMutationFn = Apollo.MutationFunction<
  UpdateSubjectMutation,
  UpdateSubjectMutationVariables
>;

/**
 * __useUpdateSubjectMutation__
 *
 * To run a mutation, you first call `useUpdateSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubjectMutation, { data, loading, error }] = useUpdateSubjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSubjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSubjectMutation,
    UpdateSubjectMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateSubjectMutation,
    UpdateSubjectMutationVariables
  >(UpdateSubjectDocument, options);
}
export type UpdateSubjectMutationHookResult = ReturnType<
  typeof useUpdateSubjectMutation
>;
export type UpdateSubjectMutationResult =
  Apollo.MutationResult<UpdateSubjectMutation>;
export type UpdateSubjectMutationOptions = Apollo.BaseMutationOptions<
  UpdateSubjectMutation,
  UpdateSubjectMutationVariables
>;
export const UpdateSubjectNameDocument = gql`
  mutation UpdateSubjectName($name: String!, $id: Int!) {
    updateSubjectName(name: $name, id: $id) {
      id
      name
    }
  }
`;
export type UpdateSubjectNameMutationFn = Apollo.MutationFunction<
  UpdateSubjectNameMutation,
  UpdateSubjectNameMutationVariables
>;

/**
 * __useUpdateSubjectNameMutation__
 *
 * To run a mutation, you first call `useUpdateSubjectNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubjectNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubjectNameMutation, { data, loading, error }] = useUpdateSubjectNameMutation({
 *   variables: {
 *      name: // value for 'name'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateSubjectNameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSubjectNameMutation,
    UpdateSubjectNameMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateSubjectNameMutation,
    UpdateSubjectNameMutationVariables
  >(UpdateSubjectNameDocument, options);
}
export type UpdateSubjectNameMutationHookResult = ReturnType<
  typeof useUpdateSubjectNameMutation
>;
export type UpdateSubjectNameMutationResult =
  Apollo.MutationResult<UpdateSubjectNameMutation>;
export type UpdateSubjectNameMutationOptions = Apollo.BaseMutationOptions<
  UpdateSubjectNameMutation,
  UpdateSubjectNameMutationVariables
>;
export const GetNotificationsDocument = gql`
  query GetNotifications {
    getNotifications {
      id
      text
      read
      createdAt
    }
  }
`;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotificationsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetNotificationsQuery,
    GetNotificationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(
    GetNotificationsDocument,
    options
  );
}
export function useGetNotificationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetNotificationsQuery,
    GetNotificationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetNotificationsQuery,
    GetNotificationsQueryVariables
  >(GetNotificationsDocument, options);
}
export type GetNotificationsQueryHookResult = ReturnType<
  typeof useGetNotificationsQuery
>;
export type GetNotificationsLazyQueryHookResult = ReturnType<
  typeof useGetNotificationsLazyQuery
>;
export type GetNotificationsQueryResult = Apollo.QueryResult<
  GetNotificationsQuery,
  GetNotificationsQueryVariables
>;
export const GetSubjectsDocument = gql`
  query GetSubjects {
    getSubjects {
      name
      id
      prevScore
      updatedAt
      prevTime
      cards {
        cardId
        title
        text
      }
    }
  }
`;

/**
 * __useGetSubjectsQuery__
 *
 * To run a query within a React component, call `useGetSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSubjectsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSubjectsQuery,
    GetSubjectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSubjectsQuery, GetSubjectsQueryVariables>(
    GetSubjectsDocument,
    options
  );
}
export function useGetSubjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSubjectsQuery,
    GetSubjectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSubjectsQuery, GetSubjectsQueryVariables>(
    GetSubjectsDocument,
    options
  );
}
export type GetSubjectsQueryHookResult = ReturnType<typeof useGetSubjectsQuery>;
export type GetSubjectsLazyQueryHookResult = ReturnType<
  typeof useGetSubjectsLazyQuery
>;
export type GetSubjectsQueryResult = Apollo.QueryResult<
  GetSubjectsQuery,
  GetSubjectsQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MeEmailDocument = gql`
  query MeEmail {
    meEmail {
      id
      username
      email
    }
  }
`;

/**
 * __useMeEmailQuery__
 *
 * To run a query within a React component, call `useMeEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeEmailQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeEmailQuery(
  baseOptions?: Apollo.QueryHookOptions<MeEmailQuery, MeEmailQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeEmailQuery, MeEmailQueryVariables>(
    MeEmailDocument,
    options
  );
}
export function useMeEmailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeEmailQuery, MeEmailQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeEmailQuery, MeEmailQueryVariables>(
    MeEmailDocument,
    options
  );
}
export type MeEmailQueryHookResult = ReturnType<typeof useMeEmailQuery>;
export type MeEmailLazyQueryHookResult = ReturnType<typeof useMeEmailLazyQuery>;
export type MeEmailQueryResult = Apollo.QueryResult<
  MeEmailQuery,
  MeEmailQueryVariables
>;

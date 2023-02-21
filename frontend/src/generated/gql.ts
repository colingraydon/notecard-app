/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      message\n      field\n    }\n    user {\n      createdAt\n      id\n      updatedAt\n      username\n    }\n  }\n}": types.ChangePasswordDocument,
    "mutation createCard($input: CardInput!) {\n  createCard(input: $input) {\n    errors {\n      field\n      message\n    }\n    card {\n      text\n      title\n    }\n  }\n}": types.CreateCardDocument,
    "mutation CreateSubject($input: String!) {\n  createSubject(input: $input) {\n    errors {\n      field\n      message\n    }\n    subject {\n      name\n      createdAt\n      updatedAt\n      id\n    }\n  }\n}": types.CreateSubjectDocument,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}": types.ForgotPasswordDocument,
    "mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    errors {\n      message\n      field\n    }\n    user {\n      createdAt\n      id\n      updatedAt\n      username\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($options: UsernamePasswordInput!) {\n  register(options: $options) {\n    errors {\n      message\n      field\n    }\n    user {\n      createdAt\n      id\n      updatedAt\n      username\n    }\n  }\n}": types.RegisterDocument,
    "query GetSubjects {\n  getSubjects {\n    name\n    id\n    cards {\n      title\n      text\n    }\n  }\n}": types.GetSubjectsDocument,
    "query Me {\n  me {\n    id\n    username\n  }\n}": types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      message\n      field\n    }\n    user {\n      createdAt\n      id\n      updatedAt\n      username\n    }\n  }\n}"): (typeof documents)["mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      message\n      field\n    }\n    user {\n      createdAt\n      id\n      updatedAt\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createCard($input: CardInput!) {\n  createCard(input: $input) {\n    errors {\n      field\n      message\n    }\n    card {\n      text\n      title\n    }\n  }\n}"): (typeof documents)["mutation createCard($input: CardInput!) {\n  createCard(input: $input) {\n    errors {\n      field\n      message\n    }\n    card {\n      text\n      title\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateSubject($input: String!) {\n  createSubject(input: $input) {\n    errors {\n      field\n      message\n    }\n    subject {\n      name\n      createdAt\n      updatedAt\n      id\n    }\n  }\n}"): (typeof documents)["mutation CreateSubject($input: String!) {\n  createSubject(input: $input) {\n    errors {\n      field\n      message\n    }\n    subject {\n      name\n      createdAt\n      updatedAt\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"): (typeof documents)["mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    errors {\n      message\n      field\n    }\n    user {\n      createdAt\n      id\n      updatedAt\n      username\n    }\n  }\n}"): (typeof documents)["mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    errors {\n      message\n      field\n    }\n    user {\n      createdAt\n      id\n      updatedAt\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($options: UsernamePasswordInput!) {\n  register(options: $options) {\n    errors {\n      message\n      field\n    }\n    user {\n      createdAt\n      id\n      updatedAt\n      username\n    }\n  }\n}"): (typeof documents)["mutation Register($options: UsernamePasswordInput!) {\n  register(options: $options) {\n    errors {\n      message\n      field\n    }\n    user {\n      createdAt\n      id\n      updatedAt\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetSubjects {\n  getSubjects {\n    name\n    id\n    cards {\n      title\n      text\n    }\n  }\n}"): (typeof documents)["query GetSubjects {\n  getSubjects {\n    name\n    id\n    cards {\n      title\n      text\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    id\n    username\n  }\n}"): (typeof documents)["query Me {\n  me {\n    id\n    username\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
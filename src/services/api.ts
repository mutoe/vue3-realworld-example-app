/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginUser {
  email: string;
  /** @format password */
  password: string;
}

export interface NewUser {
  username: string;
  email: string;
  /** @format password */
  password: string;
}

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
}

export interface UpdateUser {
  email?: string;
  password?: string;
  username?: string;
  bio?: string;
  image?: string;
}

export interface Profile {
  username: string;
  bio: string | null;
  image: string | null;
  following: boolean;
}

export interface Article {
  id: number;               
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

export interface NewArticle {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

export interface UpdateArticle {
  title?: string;
  description?: string;
  body?: string;
}

export interface Comment {
  id: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  body: string;
  author: Profile;
}

export interface NewComment {
  body: string;
}

export interface GenericErrorModel {
  errors: {
    body: string[];
  };
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  secure?: boolean;
  path: string;
  type?: ContentType;
  query?: QueryParamsType;
  format?: ResponseFormat;
  body?: unknown;
  baseUrl?: string;
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<
    RequestParams,
    "baseUrl" | "cancelToken" | "signal"
  >;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:8000/api"; 
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(
      typeof value === "number" ? value : `${value}`
    )}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value
      .map((v: any) => this.encodeQueryParam(key, v))
      .join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key]
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null &&
      (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);
    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${
        queryString ? `?${queryString}` : ""
      }`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) r.data = data;
              else r.error = data;
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) this.abortControllers.delete(cancelToken);
      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Conduit API
 * @version 1.0.0
 * @license MIT License
 * @baseUrl http://localhost:8000/api
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  users = {
    login: (data: { user: LoginUser }, params: RequestParams = {}) =>
      this.request<{ user: User }, GenericErrorModel>({
        path: `/users/login`,
        method: "POST",
        body: data,
        ...params,
      }),

    createUser: (data: { user: NewUser }, params: RequestParams = {}) =>
      this.request<{ user: User }, GenericErrorModel>({
        path: `/users`,
        method: "POST",
        body: data,
        ...params,
      }),
  };

  user = {
    getCurrentUser: (params: RequestParams = {}) =>
      this.request<{ user: User }, GenericErrorModel>({
        path: `/user`,
        method: "GET",
        secure: true,
        ...params,
      }),

    updateCurrentUser: (data: { user: UpdateUser }, params: RequestParams = {}) =>
      this.request<{ user: User }, GenericErrorModel>({
        path: `/user`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),
  };

  profiles = {
    getProfileByUsername: (username: string, params: RequestParams = {}) =>
      this.request<{ profile: Profile }, GenericErrorModel>({
        path: `/profiles/${username}`,
        method: "GET",
        ...params,
      }),

    followUserByUsername: (username: string, params: RequestParams = {}) =>
      this.request<{ profile: Profile }, GenericErrorModel>({
        path: `/profiles/${username}/follow`,
        method: "POST",
        secure: true,
        ...params,
      }),

    unfollowUserByUsername: (username: string, params: RequestParams = {}) =>
      this.request<{ profile: Profile }, GenericErrorModel>({
        path: `/profiles/${username}/follow`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };

  articles = {
    getArticlesFeed: (
      query?: { offset?: number; limit?: number },
      params: RequestParams = {}
    ) =>
      this.request<{ articles: Article[]; articlesCount: number }, GenericErrorModel>({
        path: `/articles/feed`,
        method: "GET",
        query,
        secure: true,
        ...params,
      }),

    getArticles: (
      query?: {
        tag?: string;
        author?: string;
        favorited?: string;
        offset?: number;
        limit?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<{ articles: Article[]; articlesCount: number }, GenericErrorModel>({
        path: `/articles`,
        method: "GET",
        query,
        ...params,
      }),

    createArticle: (data: { article: NewArticle }, params: RequestParams = {}) =>
      this.request<{ article: Article }, GenericErrorModel>({
        path: `/articles`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),

    getArticle: (slug: string, params: RequestParams = {}) =>
      this.request<{ article: Article }, GenericErrorModel>({
        path: `/articles/${slug}`,
        method: "GET",
        ...params,
      }),

    updateArticle: (
      slug: string,
      data: { article: UpdateArticle },
      params: RequestParams = {}
    ) =>
      this.request<{ article: Article }, GenericErrorModel>({
        path: `/articles/${slug}`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),

    deleteArticle: (slug: string, params: RequestParams = {}) =>
      this.request<any, GenericErrorModel>({
        path: `/articles/${slug}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    getArticleComments: (slug: string, params: RequestParams = {}) =>
      this.request<{ comments: Comment[] }, GenericErrorModel>({
        path: `/articles/${slug}/comments`,
        method: "GET",
        ...params,
      }),

    createArticleComment: (
      slug: string,
      data: { comment: NewComment },
      params: RequestParams = {}
    ) =>
      this.request<{ comment: Comment }, GenericErrorModel>({
        path: `/articles/${slug}/comments`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),

    deleteArticleComment: (slug: string, id: number, params: RequestParams = {}) =>
      this.request<any, GenericErrorModel>({
        path: `/articles/${slug}/comments/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    createArticleFavorite: (slug: string, params: RequestParams = {}) =>
      this.request<{ article: Article }, GenericErrorModel>({
        path: `/articles/${slug}/favorite`,
        method: "POST",
        secure: true,
        ...params,
      }),

    deleteArticleFavorite: (slug: string, params: RequestParams = {}) =>
      this.request<{ article: Article }, GenericErrorModel>({
        path: `/articles/${slug}/favorite`,
        method: "DELETE",
        secure: true,
        ...params,
      }),


   getArticleRevisions: (articleId: number, params: RequestParams = {}) =>
  this.request<{
    data: {
      user: { id: number; username: string };
      revisions: {
        id: number;
        title: string;
        slug: string;
        description: string;
        body: string;
        created_at: string;
      }[];
    };
  }>({
    path: `/articles/${articleId}/revisions`,
    method: "GET",
    secure: true,     
    ...params,
  }),

  revertArticleRevision: (articleId: number, revisionId: number, params: RequestParams = {}) =>
  this.request<{ article: Article }>({
    path: `/articles/${articleId}/revisions/${revisionId}/revert`,
    method: "POST",
    secure: true,
    ...params,
  }),


  };



  tags = {
    getTags: (params: RequestParams = {}) =>
      this.request<{ tags: string[] }, GenericErrorModel>({
        path: `/tags`,
        method: "GET",
        ...params,
      }),
  };
}

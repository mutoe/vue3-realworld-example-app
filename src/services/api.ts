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

export interface LoginUserRequest {
  user: LoginUser;
}

export interface NewUser {
  username: string;
  email: string;

  /** @format password */
  password: string;
}

export interface NewUserRequest {
  user: NewUser;
}

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface UserResponse {
  user: User;
}

export interface UpdateUser {
  email?: string;
  // The correct field is password but not token. Refer https://github.com/gothinkster/realworld/issues/950
  password?: string;
  username?: string;
  bio?: string;
  image?: string;
}

export interface UpdateUserRequest {
  user: UpdateUser;
}

export interface ProfileResponse {
  profile: Profile;
}

export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface Article {
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

export interface SingleArticleResponse {
  article: Article;
}

export interface MultipleArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface NewArticle {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

export interface NewArticleRequest {
  article: NewArticle;
}

export interface UpdateArticle {
  title?: string;
  description?: string;
  body?: string;
}

export interface UpdateArticleRequest {
  article: UpdateArticle;
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

export interface SingleCommentResponse {
  comment: Comment;
}

export interface MultipleCommentsResponse {
  comments: Comment[];
}

export interface NewComment {
  body: string;
}

export interface NewCommentRequest {
  comment: NewComment;
}

export interface TagsResponse {
  tags: string[];
}

export interface GenericErrorModel {
  errors: { body: string[] };
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "/api";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

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

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
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

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
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

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Conduit API
 * @version 1.0.0
 * @license MIT License (https://opensource.org/licenses/MIT)
 * @baseUrl /api
 * @contact RealWorld (https://realworld.io)
 *
 * Conduit API
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  users = {
    /**
     * @description Login for existing user
     *
     * @tags User and Authentication
     * @name Login
     * @summary Existing user login
     * @request POST:/users/login
     */
    login: (data: LoginUserRequest, params: RequestParams = {}) =>
      this.request<UserResponse, void | GenericErrorModel>({
        path: `/users/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Register a new user
     *
     * @tags User and Authentication
     * @name CreateUser
     * @summary Register a new user
     * @request POST:/users
     */
    createUser: (data: NewUserRequest, params: RequestParams = {}) =>
      this.request<UserResponse, GenericErrorModel>({
        path: `/users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * @description Gets the currently logged-in user
     *
     * @tags User and Authentication
     * @name GetCurrentUser
     * @summary Get current user
     * @request GET:/user
     * @secure
     */
    getCurrentUser: (params: RequestParams = {}) =>
      this.request<UserResponse, void | GenericErrorModel>({
        path: `/user`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Updated user information for current user
     *
     * @tags User and Authentication
     * @name UpdateCurrentUser
     * @summary Update current user
     * @request PUT:/user
     * @secure
     */
    updateCurrentUser: (data: UpdateUserRequest, params: RequestParams = {}) =>
      this.request<UserResponse, void | GenericErrorModel>({
        path: `/user`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  profiles = {
    /**
     * @description Get a profile of a user of the system. Auth is optional
     *
     * @tags Profile
     * @name GetProfileByUsername
     * @summary Get a profile
     * @request GET:/profiles/{username}
     */
    getProfileByUsername: (username: string, params: RequestParams = {}) =>
      this.request<ProfileResponse, void | GenericErrorModel>({
        path: `/profiles/${username}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Follow a user by username
     *
     * @tags Profile
     * @name FollowUserByUsername
     * @summary Follow a user
     * @request POST:/profiles/{username}/follow
     * @secure
     */
    followUserByUsername: (username: string, params: RequestParams = {}) =>
      this.request<ProfileResponse, void | GenericErrorModel>({
        path: `/profiles/${username}/follow`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Unfollow a user by username
     *
     * @tags Profile
     * @name UnfollowUserByUsername
     * @summary Unfollow a user
     * @request DELETE:/profiles/{username}/follow
     * @secure
     */
    unfollowUserByUsername: (username: string, params: RequestParams = {}) =>
      this.request<ProfileResponse, void | GenericErrorModel>({
        path: `/profiles/${username}/follow`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  articles = {
    /**
     * @description Get most recent articles from users you follow. Use query parameters to limit. Auth is required
     *
     * @tags Articles
     * @name GetArticlesFeed
     * @summary Get recent articles from users you follow
     * @request GET:/articles/feed
     * @secure
     */
    getArticlesFeed: (query?: { limit?: number; offset?: number }, params: RequestParams = {}) =>
      this.request<MultipleArticlesResponse, void | GenericErrorModel>({
        path: `/articles/feed`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get most recent articles globally. Use query parameters to filter results. Auth is optional
     *
     * @tags Articles
     * @name GetArticles
     * @summary Get recent articles globally
     * @request GET:/articles
     */
    getArticles: (
      query?: { tag?: string; author?: string; favorited?: string; limit?: number; offset?: number },
      params: RequestParams = {},
    ) =>
      this.request<MultipleArticlesResponse, void | GenericErrorModel>({
        path: `/articles`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create an article. Auth is required
     *
     * @tags Articles
     * @name CreateArticle
     * @summary Create an article
     * @request POST:/articles
     * @secure
     */
    createArticle: (data: NewArticleRequest, params: RequestParams = {}) =>
      this.request<SingleArticleResponse, void | GenericErrorModel>({
        path: `/articles`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get an article. Auth not required
     *
     * @tags Articles
     * @name GetArticle
     * @summary Get an article
     * @request GET:/articles/{slug}
     */
    getArticle: (slug: string, params: RequestParams = {}) =>
      this.request<SingleArticleResponse, GenericErrorModel>({
        path: `/articles/${slug}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update an article. Auth is required
     *
     * @tags Articles
     * @name UpdateArticle
     * @summary Update an article
     * @request PUT:/articles/{slug}
     * @secure
     */
    updateArticle: (slug: string, data: UpdateArticleRequest, params: RequestParams = {}) =>
      this.request<SingleArticleResponse, void | GenericErrorModel>({
        path: `/articles/${slug}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete an article. Auth is required
     *
     * @tags Articles
     * @name DeleteArticle
     * @summary Delete an article
     * @request DELETE:/articles/{slug}
     * @secure
     */
    deleteArticle: (slug: string, params: RequestParams = {}) =>
      this.request<void, void | GenericErrorModel>({
        path: `/articles/${slug}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Get the comments for an article. Auth is optional
     *
     * @tags Comments
     * @name GetArticleComments
     * @summary Get comments for an article
     * @request GET:/articles/{slug}/comments
     */
    getArticleComments: (slug: string, params: RequestParams = {}) =>
      this.request<MultipleCommentsResponse, void | GenericErrorModel>({
        path: `/articles/${slug}/comments`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create a comment for an article. Auth is required
     *
     * @tags Comments
     * @name CreateArticleComment
     * @summary Create a comment for an article
     * @request POST:/articles/{slug}/comments
     * @secure
     */
    createArticleComment: (slug: string, data: NewCommentRequest, params: RequestParams = {}) =>
      this.request<SingleCommentResponse, void | GenericErrorModel>({
        path: `/articles/${slug}/comments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a comment for an article. Auth is required
     *
     * @tags Comments
     * @name DeleteArticleComment
     * @summary Delete a comment for an article
     * @request DELETE:/articles/{slug}/comments/{id}
     * @secure
     */
    deleteArticleComment: (slug: string, id: number, params: RequestParams = {}) =>
      this.request<void, void | GenericErrorModel>({
        path: `/articles/${slug}/comments/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Favorite an article. Auth is required
     *
     * @tags Favorites
     * @name CreateArticleFavorite
     * @summary Favorite an article
     * @request POST:/articles/{slug}/favorite
     * @secure
     */
    createArticleFavorite: (slug: string, params: RequestParams = {}) =>
      this.request<SingleArticleResponse, void | GenericErrorModel>({
        path: `/articles/${slug}/favorite`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Unfavorite an article. Auth is required
     *
     * @tags Favorites
     * @name DeleteArticleFavorite
     * @summary Unfavorite an article
     * @request DELETE:/articles/{slug}/favorite
     * @secure
     */
    deleteArticleFavorite: (slug: string, params: RequestParams = {}) =>
      this.request<SingleArticleResponse, void | GenericErrorModel>({
        path: `/articles/${slug}/favorite`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  tags = {
    /**
     * @description Get tags. Auth not required
     *
     * @name TagsList
     * @summary Get tags
     * @request GET:/tags
     */
    tagsList: (params: RequestParams = {}) =>
      this.request<TagsResponse, GenericErrorModel>({
        path: `/tags`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}

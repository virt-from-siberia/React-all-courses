import {
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
// FIXME: add no-restricted-imports exceptions for ~entities/*/@x/**
// eslint-disable-next-line no-restricted-imports
import { Profile, mapProfile } from '~entities/profile/@x/article';
import {
  ArticleDto,
  GenericErrorModel,
  RequestParams,
  realworldApi,
} from '~shared/api/realworld';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

export function mapArticle(articleDto: ArticleDto): Article {
  const { author, ...article } = articleDto;
  return {
    ...article,
    author: mapProfile(author),
  };
}

export type GlobalfeedQuery = {
  tag?: string;
  author?: string;
  favorited?: string;
  offset: number;
  limit: number;
};

export type UserfeedQuery = {
  offset: number;
  limit: number;
};

export const articleKeys = {
  articles: {
    root: ['articles'],
    globalfeed: {
      root: () => [...articleKeys.articles.root, 'globalfeed'],
      query: (query: GlobalfeedQuery) => [
        ...articleKeys.articles.globalfeed.root(),
        query,
      ],
    },
    userfeed: {
      root: () => [...articleKeys.articles.root, 'userfeed'],
      query: (query: GlobalfeedQuery) => [
        ...articleKeys.articles.userfeed.root(),
        query,
      ],
    },
  },

  article: {
    root: ['article'],
    slug: (slug: string) => [...articleKeys.article.root, slug],
  },

  mutation: {
    create: () => [...articleKeys.article.root, 'create'],
    delete: () => [...articleKeys.article.root, 'delete'],
    update: () => [...articleKeys.article.root, 'update'],
    favorite: () => [...articleKeys.article.root, 'favorite'],
    unfavorite: () => [...articleKeys.article.root, 'unfavorite'],
  },
};

type UseInfinityArticlesProps = {
  queryKey: unknown[];
  queryFn: typeof realworldApi.articles.getArticles;
  query: GlobalfeedQuery | UserfeedQuery;
  params?: RequestParams;
};

const useInfinityArticles = ({
  queryKey,
  queryFn,
  query,
  params,
}: UseInfinityArticlesProps) => {
  const { offset, limit } = query;

  return useInfiniteQuery<Article[], GenericErrorModel, Article[], unknown[]>({
    queryKey,

    queryFn: async ({ pageParam = offset, signal }) => {
      const response = await queryFn(
        { ...query, offset: pageParam },
        { signal, ...params },
      );

      return response.data.articles.map(mapArticle);
    },

    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < limit) return null;

      const nextPageParam = lastPage.length ? pages.length * limit : null;

      return nextPageParam;
    },
  });
};

export const useGlobalInfinityArticles = (
  query: GlobalfeedQuery,
  params?: RequestParams,
) =>
  useInfinityArticles({
    queryKey: articleKeys.articles.globalfeed.query(query),
    queryFn: realworldApi.articles.getArticles,
    query,
    params,
  });

export const useUserInfinityArticles = (
  query: UserfeedQuery,
  params?: RequestParams,
) =>
  useInfinityArticles({
    queryKey: articleKeys.articles.userfeed.query(query),
    queryFn: realworldApi.articles.getArticlesFeed,
    query,
    params,
  });

type UseArticleQuery = UseQueryOptions<
  Article,
  GenericErrorModel,
  Article,
  string[]
>;
type UseArticleQueryOptions = Omit<UseArticleQuery, 'queryKey' | 'queryFn'>;

export const useArticle = (
  slug: string,
  params?: RequestParams,
  options?: UseArticleQueryOptions,
) =>
  useQuery<Article, GenericErrorModel, Article, string[]>({
    queryKey: articleKeys.article.slug(slug),

    queryFn: async ({ signal }) => {
      const response = await realworldApi.articles.getArticle(slug, {
        signal,
        ...params,
      });

      return mapArticle(response.data.article);
    },

    ...options,
  });

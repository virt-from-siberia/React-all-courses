import { ReactNode } from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { GenericErrorModel } from '~shared/api/realworld';
import { ErrorHandler } from '~shared/ui/error-handler';
import { Article } from '../../api/articleApi';

type ArticlesListProps = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: GenericErrorModel | null;
  hasNextPage?: boolean;
  infinityArticles?: InfiniteData<Article[]>;
  renderArticles: (article: Article) => ReactNode;
  nextPageAction: ReactNode;
};

export function ArticlesList(props: ArticlesListProps) {
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    hasNextPage,
    infinityArticles,
    renderArticles,
    nextPageAction,
  } = props;

  return (
    <>
      {isLoading && <div className="article-preview">Loading articles...</div>}

      {isError && (
        <div className="article-preview">
          <ErrorHandler error={error!} />
        </div>
      )}

      {isSuccess &&
        !hasNextPage &&
        infinityArticles!.pages.length === 1 &&
        infinityArticles!.pages[0].length === 0 && (
          <div className="article-preview">No articles are here... yet.</div>
        )}

      {isSuccess &&
        infinityArticles!.pages.map((group) => group.map(renderArticles))}

      {hasNextPage && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {nextPageAction}
        </div>
      )}
    </>
  );
}

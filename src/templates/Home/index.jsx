import { useCallback, useEffect, useState } from 'react';
import './styles.css';

import { loadPosts } from '../../utils/loadPosts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postPerPages /*setPostsPerPages*/] = useState(2);
  const [searchValue, setSearchValue] = useState('');

  const noMorePost = page + postPerPages >= allPosts.length;

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback(async (page, postPerPages) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postPerPages));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postPerPages);
  }, [handleLoadPosts, postPerPages]);

  const loadMorePosts = () => {
    const nextPage = page + postPerPages;
    const nextPost = allPosts.slice(nextPage, nextPage + postPerPages);
    posts.push(...nextPost);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search value: {searchValue}</h1>}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
      {filteredPosts.length === 0 && <p>Não tem nenhum post!</p>}

      <div className="button-container">{!searchValue && <Button text="Load More post" onClick={loadMorePosts} disabled={noMorePost} />}</div>
    </section>
  );
};

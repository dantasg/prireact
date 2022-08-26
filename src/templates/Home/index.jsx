import { Component } from 'react';
import './styles.css';

import { loadPosts } from '../../utils/loadPosts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPages: 2,
    searchValue: '',
  };

  async componentDidMount() { // Assim que o componente montar
    await this.loadPosts();
  }

  componentDidUpdate() {
    console.log('PROP0', this.props)
  }

  loadPosts = async () => {
    const { page, postPerPages } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postPerPages),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postPerPages,
      allPosts, 
      posts
    } = this.state;

    const nextPage = page + postPerPages;
    const nextPost = allPosts.slice(nextPage, nextPage + postPerPages);
    posts.push( ...nextPost );

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target

    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postPerPages, allPosts, searchValue } = this.state;
    const noMorePost = page + postPerPages >= allPosts.length;

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      )
    })
    : 
    posts;
  
    return (
      <section className='container'>
        <div className="search-container">
          {!!searchValue && (
              <h1>Search value: {searchValue}</h1>
          )}
          
          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>
        
          {filteredPosts.length > 0 && (
            <Posts posts={filteredPosts}/> 
          )}
          {filteredPosts.length === 0 && (
            <p>Não tem nenhum post!</p>
          )}

        <div className='button-container'>
          {!searchValue && (
            <Button 
              text='Load More post'
              onClick={this.loadMorePosts}
              disabled={noMorePost}
            />
          )}

        </div>
      </section>
    )
  }
}

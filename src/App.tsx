import { useEffect, useRef, useState } from 'react';
import EditRemoveContext from './Components/EditRemoveContext';
import { usePosts } from './Components/hooks/usePost';
import PostFilter from './Components/PostFilter';
import PostForm from './Components/PostForm';
import PostList from './Components/PostList';
import MyButton from './Components/UI/button/MyButton';
import MyModal from './Components/UI/modal/MyModal';
import { PostInterface } from './types/post.interface';
import axios from 'axios'
import { getPagesCount } from './utils/pages';
import Pagination from './Components/UI/pagination/Pagination';


interface FilterState {
  sort: 'body' | 'title' | '';
  query: string;
}

function App() {

  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [filter, setFilter] = useState<FilterState>({ sort: '', query: '' });
  const [editingPost, setEditingPost] = useState<PostInterface | null>(null);
  const sortedAndFindedPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef<HTMLDivElement>(null);
  let observer: IntersectionObserver;

  console.log(lastElement);

  const callback = function () {
    console.log('visible');
  };
  observer = new IntersectionObserver(callback);
  if (null !== lastElement.current)
    observer.observe(lastElement.current);


  const fetchPosts = async () => {
    setIsPostLoading(true)
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _limit: limit,
        _page: page,
      }
    });
    const getedPosts = response.data.map((post: { userId: number, id: number, title: string, body: string }, index: number) => {
      return {
        id: Math.random(),
        number: index + 1,
        title: post.title,
        body: post.body,
      }
    })
    setPosts([...posts, ...getedPosts]);
    setTotalPages(getPagesCount(Number(response.headers['x-total-count']), limit));
    setIsPostLoading(false);
  };

  useEffect(() => { fetchPosts() }, [page])

  const craetePost = (newPost: PostInterface) => {
    setPosts([...posts, newPost])
    setCreateModal(false);
  }

  const removePost = (removingPost: PostInterface) => {
    console.log(removingPost)
    setPosts(posts.filter((post) => post.id !== removingPost.id))
  }

  const editPost = (editedPost: PostInterface) => {
    posts[editedPost.number - 1].title = editedPost.title;
    posts[editedPost.number - 1].body = editedPost.body;
    setPosts([...posts])
    setEditModal(false);
  }

  const getPostToEdit = (post: PostInterface) => {
    console.log(post)
    setEditModal(true);
    setEditingPost(post);
  }

  const changePage = (page: number) => {
    setPage(page);
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: '30px' }} onClick={() => { setCreateModal(true) }}>Add new Post</MyButton>
      {createModal ?
        <MyModal
          setVisible={setCreateModal} >
          <PostForm action={craetePost} />
        </MyModal>
        : null}
      {editModal ?
        <MyModal
          setVisible={setEditModal} >
          <PostForm action={editPost}
            post={editingPost || undefined} />
        </MyModal> : null}

      <hr style={{ margin: '15px 0' }}></hr>
      <PostFilter
        filter={filter}
        setFilter={setFilter} />
      <EditRemoveContext.Provider
        value={{ delete: removePost, edit: getPostToEdit }}>
        {isPostLoading ?
          <h1>LOADING...</h1>
          : <PostList
            ref={lastElement}
            posts={sortedAndFindedPosts}
            title={'List'} />
        }
      </EditRemoveContext.Provider>
      <Pagination
        changePage={changePage}
        totalPages={totalPages}
        page={page} />
    </div >
  );
}

export default App;


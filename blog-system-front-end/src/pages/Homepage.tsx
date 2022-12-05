import { Flex, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Logout from '../components/Logout';

const TodoHome = () => {
  const [blog, setBlog] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();
  const fetchBlogs = async () => {
    const request = await fetch('/api/v1/blog', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    const data = await request.json();
    setBlog(data);
  };
  const addNewBlog = async () => {
    try {
      if (!title) {
        return;
      }

      const request = await fetch('/api/v1/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, message }),
      });

      const data = await request.json();
      toast({
        title: data.message,
        status: 'success',
        duration: 3000,
        position: 'top',
      });

      if (request.status !== 201) {
        toast({
          title: data.message,
          status: 'error',
          duration: 3000,
          position: 'top',
        });
        return;
      }
      fetchBlogs();
      setTitle('');
      setMessage('');
    } catch (error) {
      console.log(error);
      toast({
        title: 'Server Error !',
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const navigate = useNavigate();
  const showMyBlog = () => {
    navigate('/blog-details');
  };
  const deleteBlog = async (id: string) => {
    try {
      const request = await fetch(`/api/v1/blog/${id}`, {
        method: 'DELETE',
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      const data = await request.json();

      if (request.status !== 200) {
        toast({
          title: data.message,
          status: 'error',
          duration: 3000,
          position: 'top',
        });
        return;
      }
      toast({
        title: data.message,
        status: 'success',
        duration: 3000,
        position: 'top',
      });
      fetchBlogs();
    } catch (error) {
      console.log(error);
      toast({
        title: 'Server Error !',
        status: 'error',
        duration: 3000,
        position: 'top',
      });
    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="bg-img-form">
      <div className="content">
        <header>New Blog</header>
        <form onSubmit={submitHandler}>
          <div className="field">
            <span className="fa fa-user"></span>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="space2">
            <textarea
              name="comment"
              form="usrform"
              placeholder="Enter blog here..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></textarea>
          </div>
          <div className="field2">
            <input type="submit" value="Add blog" onClick={addNewBlog} />
            <Flex justifyContent={'space-around'}>
              <input
                type="submit"
                value="Go to my blogs"
                onClick={showMyBlog}
              />
            </Flex>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoHome;

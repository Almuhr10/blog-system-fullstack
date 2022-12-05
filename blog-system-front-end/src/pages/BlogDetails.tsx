import React from 'react';
import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  //   Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Logout from '../components/Logout';
import { Link } from 'react-router-dom';

const BlogDetails = () => {
  const [blogs, setBlog] = useState<string[]>([]);
  const [title] = useState('');
  const [message] = useState('');
  const toast = useToast();
  const fetchBlogsDetails = async () => {
    const request = await fetch('/api/v1/blog', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    const data = await request.json();
    setBlog(data);
  };
  const showBlog = async () => {
    try {
      const request = await fetch('/api/v1/blog', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, message }),
      });

      const data = await request.json();

      if (request.status !== 201) {
        toast({
          title: data.message,
          status: 'error',
          duration: 3000,
          position: 'top',
        });
        return;
      }
      fetchBlogsDetails();
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
    fetchBlogsDetails();
  }, []);

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
      fetchBlogsDetails();
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

  return (
    <div className="bg-img-form">
      <div className="content2">
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <VStack spacing="3rem">
            <Heading>My blogs !</Heading>
            <VStack
              //   border="1px"
              padding="10"
              width="40rem"
              borderRadius="1rem"
              color={'white'}
            >
              {blogs.map((blog: any) => (
                <HStack
                  //   bg={'white'}
                  //   color={'black'}
                  overflow="auto"
                  width="500px"
                  key={blog.id}
                  border="1px solid"
                  padding="8"
                  justifyContent="space-between"
                  borderRadius="1rem"
                >
                  <div className="blog-style">
                    <p className="title-style">{blog.title}</p>
                    <p>{blog.message}</p>
                  </div>
                  <Button
                    onClick={() => deleteBlog(blog.id)}
                    backgroundColor="red.400"
                  >
                    Delete
                  </Button>
                </HStack>
              ))}

              <VStack spacing="1rem" mt="2rem !important">
                <Divider color="white" backgroundColor="black" />
              </VStack>
            </VStack>
            <Flex>
              <Link to="/">
                <Button backgroundColor="blue.400">Go Back</Button>
              </Link>
              <Logout />
            </Flex>
          </VStack>
        </Flex>
      </div>
    </div>
  );
};

export default BlogDetails;

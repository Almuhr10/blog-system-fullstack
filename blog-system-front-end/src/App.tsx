import {
  ChakraProvider,
  Box,
  theme,
  Flex,
  Heading,
  Text,
  VStack,
  Input,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './components/login/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import Homepage from './pages/Homepage';
import BlogDetails from './pages/BlogDetails';

export const App = () => {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/blog-details" element={<BlogDetails />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
};

/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import App from './components/App';
import ContentPage from './components/ContentPage';
import AdminPage from './components/AdminPage';
import CarouselPage from './components/CarouselPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/contact', async () => <ContactPage />);

  on('/login', async () => <LoginPage />);

  on('/admin', async () => {
    const images = await http.get(`/api/images`);
    return images && <AdminPage images={images} />
  });

  on('/register', async () => <RegisterPage />);

  on('*', async (state) => {
    const images = await http.get(`/api/images/${state.path}`);
    return images && <CarouselPage images={images} />;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

export default router;

/// <reference types="vite/client" />

import { createRoot } from 'react-dom/client'
import './index.css'
import { createInertiaApp } from '@inertiajs/react'
import { ucFirst } from './Helpers/utilities';
import axios from 'axios';
import { configureEcho } from "@laravel/echo-react";

 const csrfMeta = document?.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
    const csrfToken = csrfMeta?.getAttribute('content') ?? '';

createInertiaApp({
  title: (title: string) => `${title} - Analytic Dashboard`,
  resolve: name => {

    const pages = import.meta.glob('./pages/**/*.[jt]sx', { eager: true })


    const page = pages[`./pages/${name}.tsx`];
    if (!page) {
      throw new Error(`Page not found: ./pages/${ucFirst(name)}.tsx`);
    }

    return typeof page === 'function' ? page() : page;
  },
  setup({ el, App, props }) {

    // axios.defaults.headers.common["Authorization"] = `${tokenType} ${token}`;
    // axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    // axios.defaults.baseURL = 'http://localhost:8000';
    // axios.defaults.withCredentials = true;
   
    if (csrfToken) {
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
    }

    createRoot(el).render(<App {...props} />)
  },
  defaults: {
    visitOptions: (href, options) => {
      return { viewTransition: true }
    },
  },
  progress: {
    color: '#4B5563',
  },
});

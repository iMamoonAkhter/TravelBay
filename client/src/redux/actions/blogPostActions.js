import axios from 'axios';

import { setLoading, setBlogPost, setBlogPostByCategory, setError, blogPostCreated, blogPostRemoved, blogPostUpdated, setNextPage, setPreviousPage, reset, setRemoveButtonLoading, setStatus, setUpdatedButtonLoading } from '../slices/blogPost';
const host = 'http://localhost:10000'
export const getBlogPostsByCategory = (category, pageItems) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        const {data, status} = await axios.get(`${host}/api/blog-posts/${category}/${pageItems}`, {
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        dispatch(setBlogPostByCategory(data));
        dispatch(setStatus(status));
    } catch (error) {
     dispatch(setError(error.response && error.response.data.message ? error.response.data.message : error.message ? error.message : "An unexpected error has occured. Please try again later"))   
    }
};

export const nextPageClick = (pageItems) => async (dispatch)=> {
    dispatch(setNextPage(pageItems + 1));
}
export const previousPageClick = (pageItems) => async (dispatch)=> {
    dispatch(setPreviousPage(pageItems - 1));
}

export const resetLoaderAndFlags = () => async (dispatch)=>{
    dispatch(reset());
};
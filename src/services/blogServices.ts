import axios from "axios";

export const fetchAllPosts = async ({ queryKey }: any) => {
  let url = "/blogs/my-blogs";
  let queryOptions = "";

  
  //page
  if (queryKey[1]) {
    queryOptions += `?page=${queryKey[1]}`;
  }

  //items per page
  if (queryKey[2]) {
    queryOptions += `&limit=${queryKey[2]}`;
  }

  //search
  if (queryKey[3]) {
    queryOptions += `&search=${queryKey[3]}`;
  }

  url += queryOptions;
  const response: any = await axios.get(`${url}`).catch((e) => ({ error: e }));

  //check error
  if (response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg);
  }

  return response?.data;
};

export const fetchBlogStats = async () => {
  const response: any = await axios
    .get(`/blogs/stats`)
    .catch((e) => ({ error: e }));
  //check error
  if (response?.error) {
    const err = response?.error?.response?.data;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg);
  }

  return response?.data;
};

export const AddPost = async (data: any) => {
  const response: any = await axios
    .post(`/blogs`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg);
  }

  return response?.data;
};




export const deleteBlogPost = async (id: string | undefined) => {
    const response: any = await axios
      .delete(`/blogs/${id}`)
      .catch((e) => ({ error: e }));
    //check error
    if (response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg);
    }
  
    return response?.data;
};

export const createBlogCategory = async (data: any) => {
  const response: any = await axios
    .post(`/blog-categories`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg);
  }

  return response?.data;
};
export const updateBlogCategory = async (id: string | undefined, data: any) => {
  const response: any = await axios
    .patch(`/blog-categories/${id}`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg);
  }

  return response?.data;
};
export const fetchBlogCategories = async () => {
  const response: any = await axios
    .get(`/blog-categories`)
    .catch((e) => ({ error: e }));
  //check error
  if (response?.error) {
    const err = response?.error?.response?.data;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg);
  }

  return response?.data;
};
export const deleteBlogCategory = async (id: string | undefined) => {
    const response: any = await axios
      .delete(`/blog-categories/${id}`)
      .catch((e) => ({ error: e }));
    //check error
    if (response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg);
    }
  
    return response?.data;
};

export const updatePost = async (id: string | undefined, data: any) => {
  const response: any = await axios
    .patch(`/blogs/${id}`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response?.error) {
    const err = response?.error?.response.data;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg);
  }

  return response?.data;
};
export const fetchPostDetails = async (id: string | undefined) => {
  const response: any = await axios
    .get(`/blogs/my-blogs/${id}`)
    .catch((e) => ({ error: e }));
  //check error
  if (response?.error) {
    const err = response?.error?.response.data;
    const msg = err?.data?.message || err?.status;
    throw new Error(msg);
  }

  return response?.data;
};

export const uploadMediaFile = async (data: any) => {
    const response: any = await axios
      .post(`blogs/gallery/upload_media`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((e) => ({ error: e }));
    //check error
    if (response && response?.error) {
      const err = response?.error?.response.data;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg);
    }
  
    return response?.data;
  };

export const deletePost = async (id: string | undefined) => {
    const response: any = await axios
      .delete(`/blogs/${id}`)
      .catch((e) => ({ error: e }));
    //check error
    if (response?.error) {
      const err = response?.error?.response;
      const msg = err?.data?.message || err?.status;
      throw new Error(msg);
    }
  
    return response?.data;
};
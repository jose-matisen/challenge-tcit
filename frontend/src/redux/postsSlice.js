import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const res = await fetch("http://localhost:3001/api/posts");
    if (!res.ok) throw new Error("Error al mostrar los posts");
    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
});

export const addPost = createAsyncThunk("posts/addPost", async (post) => {
  try {
    const res = await fetch("http://localhost:3001/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error("Error al crear el post");
    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  try {
    const res = await fetch(`http://localhost:3001/api/posts/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar el post");
    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (p) => p.id !== Number(action.payload.id)
        );
      });
  },
});

export default postsSlice.reducer;

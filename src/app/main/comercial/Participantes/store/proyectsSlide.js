import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProjects = createAsyncThunk(
  "ParticipantesApp/projects/getProjects",
  async (numero = 1, PageIndex = 10, PageSize = 1) => {
    if (numero === 1) {
      const response = await axios.get(
        " https://trigonosapi.azurewebsites.net/api/Participantes"
      );
      return response.data.data;
    }

    const response = await axios.get(
      ` https://trigonosapi.azurewebsites.net/api/Participantes?All=s&PageIndex=${PageIndex}&PageSize=${PageSize}`
    );
    return response.data.data;
  }
);

const projectsAdapter = createEntityAdapter({});

export const {
  selectAll: selectProjects,
  selectEntities: selectProjectsEntities,
  selectById: selectProjectById,
} = projectsAdapter.getSelectors((state) => state.ParticipantesApp.projects);

const projectsSlice = createSlice({
  name: "ParticipantesApp/projects",
  initialState: projectsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getProjects.fulfilled]: projectsAdapter.setAll,
  },
});

export default projectsSlice.reducer;

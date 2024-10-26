import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../constants/values";

const baseUrl = `${SERVER_URL}/api/user`;

export const updateProfile = createAsyncThunk("profile/updateProfile", async ({userId, fName, lName, imageUrl, email}: {userId: string; fName: string; lName: string; imageUrl: string; email: string}) => {
    const response = await axios.post(`${baseUrl}/${userId}/profile`, { f_name: fName, l_name: lName, image: imageUrl, email }, { withCredentials: true });
    return response.data.user;
});
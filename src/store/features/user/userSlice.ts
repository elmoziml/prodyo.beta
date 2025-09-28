import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  accountStatus: string;
  subscription: {
    plan: string;
    expires: string;
  };
}

const initialState: UserState = {
  id: '12345',
  name: 'Fares Kontrilo',
  username: 'fares.kontrilo',
  email: 'fares@kontrilo.com',
  image: 'https://scontent.faae2-4.fna.fbcdn.net/v/t39.30808-6/422926915_1834131783707604_727834211486350521_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGis81kRT6MCi2mpZjiT9dvMhYouQ4zvmsyFii5DjO-a5GgEQJeKfDnwhFFdmZ6xWXCCrA_bKcrlC98mepgXrZT&_nc_ohc=ilChuuJANlEQ7kNvwE9n58k&_nc_oc=Adl2FBB-S2J3dqUOCElopv8rAU1V08zrQksuAcBKRJhx3qOF19caSOpEH379itPq_7A&_nc_zt=23&_nc_ht=scontent.faae2-4.fna&_nc_gid=1ubqn7dQpybYS57SVG3Yiw&oh=00_Afb5MTaIP1Uu7SZDVWjcsIrxSlvQZPCSOZQIql61BpeqTg&oe=68DC9668',
  emailVerified: true,
  phoneVerified: false,
  accountStatus: 'verified',
  subscription: {
    plan: 'Premium',
    expires: '2025-12-31',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    clearUser: () => {
      return initialState; // Or a truly empty state
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

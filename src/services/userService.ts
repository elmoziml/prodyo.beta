import apiService from './apiService';

// Define a type for the user, you can move this to a types file
interface User {
  id: number;
  name: string;
  email: string;
}

export const userService = {
  getUsers: (): Promise<User[]> => {
    return apiService.get<User[]>('/users');
  },

  // Example of getting a single user
  // getUser: (id: number): Promise<User> => {
  //   return apiService.get<User>(`/users/${id}`);
  // },

  // Example of creating a user
  // createUser: (user: Omit<User, 'id'>): Promise<User> => {
  //   return apiService.post<User>('/users', user);
  // },
};

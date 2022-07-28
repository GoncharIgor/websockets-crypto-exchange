import create from 'zustand';
import { User } from '../types/User';

interface UserStoreState {
    user: User;
    setUser: (user: User) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
    user: {
        id: 'IgorGonchar',
        name: 'IgorGonchar'
    },
    setUser: (user: User) => set((state: UserStoreState) => ({ user }))
}));

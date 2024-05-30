import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    userMainEmail: string;
    firstName: string;
    middleName: string | undefined;
    lastName: string;
    orcid: string | undefined;
    otherEmails: string[];
    experienceLevel: 'resident' | 'junior' | 'senior' | undefined;
    password: string;
}

const fakeUser: User = {
    userMainEmail: 'test@tester.com',
    firstName: 'Test',
    middleName: 'Middle',
    lastName: 'Tester',
    orcid: '0000-0000-0000-0000',
    otherEmails: ['test2@tester.com'],
    experienceLevel: 'senior',
    password: 'password',
};

const initialState: {
    user: User | null;
} = {
    user: fakeUser,
};

const availableUsers: User[] = [fakeUser];

export const { reducer: userReducer, actions: userActions } = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<{
                email: string | undefined;
                password: string | undefined;
            }>
        ) => {
            const { email, password } = action.payload;
            if (!email || !password) {
                throw new Error('No empty email or password');
            }

            const existingUser = availableUsers.find(
                (user) =>
                    user.userMainEmail === email ||
                    // In case the user has multiple emails, check if the main email is in the list of other emails
                    user.otherEmails.includes(email)
            );

            if (!existingUser || existingUser.password !== password) {
                console.log(availableUsers);
                throw new Error('Invalid email or password');
            }

            state.user = existingUser;
        },
        logout: (state) => {
            state.user = null;
        },
        signup: (state, action: PayloadAction<User>) => {
            const existingUser = availableUsers.find(
                (user) =>
                    user.userMainEmail === action.payload.userMainEmail ||
                    // In case the user has multiple emails, check if the main email is in the list of other emails
                    user.otherEmails.includes(action.payload.userMainEmail) ||
                    action.payload.otherEmails.includes(user.userMainEmail)
            );
            if (existingUser) {
                throw new Error('User already exists');
            }
            availableUsers.push(action.payload);
            state.user = action.payload;
        },
    },
});

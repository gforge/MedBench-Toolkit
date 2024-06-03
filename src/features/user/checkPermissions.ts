import type { User } from './slice';

export function onlySelfOrAdmin({
    user,
    createdBy,
}: {
    user: Pick<User, 'type' | 'userMainEmail'>;
    createdBy: string;
}): boolean {
    if (createdBy === '@@migrated@@') {
        return true;
    }

    return user.userMainEmail === createdBy || user.type === 'admin';
}

export function onlyAdmin({ user }: { user: Pick<User, 'type'> }): boolean {
    return user.type === 'admin';
}

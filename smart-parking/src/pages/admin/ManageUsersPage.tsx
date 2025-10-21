import { useMemo } from 'react';
import type { AppUser } from '../../types';

export function ManageUsersPage() {
  const users: AppUser[] = useMemo(() => {
    const demo: AppUser = {
      id: 'demo-user',
      email: 'demo@example.com',
      displayName: 'Demo User',
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    return [demo];
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Manage Users</h2>
      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-b">
              <td className="py-2">{u.email}</td>
              <td>{u.displayName}</td>
              <td>{u.role}</td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

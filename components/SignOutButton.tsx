// components/SignOutButton.tsx
'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="text-sm text-red-600 hover:underline"
    >
      Sign Out
    </button>
  );
}

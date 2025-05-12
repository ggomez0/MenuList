import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

export default function AdminPage() {
  return (
    <div className="admin-page">
      <h2>Administración</h2>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <p>Estas logueado</p>
      </SignedIn>
    </div>
  );
} 
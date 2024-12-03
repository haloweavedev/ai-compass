// app/routes/dashboard._index.tsx
import { getAuth } from "@clerk/remix/ssr.server";
import { LoaderFunction, redirect } from '@remix-run/node';
import { UserButton } from "@clerk/remix";

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect('/');
  }
  return null;
};

export default function Dashboard() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <UserButton afterSignOutUrl="/" />
        </div>
        <p>Welcome to your dashboard!</p>
      </div>
    </div>
  );
}
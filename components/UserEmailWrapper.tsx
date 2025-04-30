// components/UserEmailWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const UserEmail = dynamic(() => import("./UserEmail"), {
  ssr: true, // render it on server
  loading: () => <span>Loading...</span>,
});

export default function UserEmailWrapper() {
  return <UserEmail />;
}

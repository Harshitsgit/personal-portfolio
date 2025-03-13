import React from "react";

function page({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

export default page;

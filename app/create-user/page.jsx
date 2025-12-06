"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CreateUserPage = () => {
  const router = useRouter();

  useEffect(() => {
    const createUser = async () => {
      try {
        const res = await fetch("/api/signup", { method: "POST" });
        const data = await res.json();

        if (data.ok === true) {
          router.push("/");
        } else {
          console.error("Signup failed:", data);
        }
      } catch (err) {
        console.error("Error creating user:", err);
      }
    };

    createUser();
  }, [router]);

  return <div>Redirecting...</div>;
};

export default CreateUserPage;

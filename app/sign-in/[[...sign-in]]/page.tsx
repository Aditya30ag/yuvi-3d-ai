import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Sign in | Studio3D" };

export default function SignInPage() {
  return (
    <AuthLayout>
      <Suspense>
        <AuthForm mode="sign-in" />
      </Suspense>
    </AuthLayout>
  );
}

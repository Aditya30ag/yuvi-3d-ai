import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Create your account | Studio3D" };

export default function SignUpPage() {
  return (
    <AuthLayout>
      <Suspense>
        <AuthForm mode="sign-up" />
      </Suspense>
    </AuthLayout>
  );
}

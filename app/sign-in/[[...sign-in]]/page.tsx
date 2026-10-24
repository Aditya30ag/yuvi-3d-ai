import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { OtpSignInForm } from "@/components/auth/OtpSignInForm";

export const metadata: Metadata = { title: "Sign in | Studio3D" };

export default function SignInPage() {
  return (
    <AuthLayout>
      <Suspense>
        <OtpSignInForm mode="sign-in" />
      </Suspense>
    </AuthLayout>
  );
}

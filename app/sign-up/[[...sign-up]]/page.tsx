import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { OtpSignInForm } from "@/components/auth/OtpSignInForm";

export const metadata: Metadata = { title: "Create your account | Studio3D" };

export default function SignUpPage() {
  return (
    <AuthLayout>
      <Suspense>
        <OtpSignInForm mode="sign-up" />
      </Suspense>
    </AuthLayout>
  );
}

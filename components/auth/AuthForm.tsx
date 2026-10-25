"use client";

import React, { useState } from "react";
import { OtpSignInForm } from "./OtpSignInForm";
import { PasswordAuthForm } from "./PasswordAuthForm";

interface AuthFormProps {
  mode: "sign-in" | "sign-up";
}

/** Password auth by default, with the emailed one-time code as a fallback. */
export function AuthForm({ mode }: AuthFormProps) {
  const [method, setMethod] = useState<"password" | "code">("password");

  return method === "password" ? (
    <PasswordAuthForm mode={mode} onUseCode={() => setMethod("code")} />
  ) : (
    <OtpSignInForm mode={mode} onUsePassword={() => setMethod("password")} />
  );
}

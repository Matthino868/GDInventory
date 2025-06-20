"use client";

import Image from "next/image";
import { Suspense } from "react";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/");
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-md w-full p-4">
                <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                        <Image
                            src="/global_discounter_bv.png"
                            alt="Logo"
                            width={320}
                            height={100}
                            className="mx-auto"
                        />
                        <h2 className="mt-10 text-2xl font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <Suspense fallback={<div>Loading form...</div>}>
                                <LoginForm />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


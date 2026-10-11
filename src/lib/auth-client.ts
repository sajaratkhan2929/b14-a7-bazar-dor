"use client";

import { createAuthClient } from "better-auth/react";

// baseURL na dile current site-er /api/auth e request jabe (localhost ar Vercel duto jaygay-i kaj kore)
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;
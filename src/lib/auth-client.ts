import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

export const { signIn, signOut, signUp, useSession } = authClient;

// export const useAuth = cache(() => {
//   const user = useSession();

//   useEffect(() => {
//     if (user.error) {
//       toast.error(user.error.message);
//       signOut();
//       redirect("/signin");
//     }
//   }, [user.error]);

//   return {
//     isAuthenticated: !!user.data?.user,
//     user: user.data?.user
//       ? {
//           id: user.data.user.id,
//           avatar: user.data.user.image,
//           firstName: user.data.user.name.split(" ")[0],
//           name: user.data.user.name,
//           email: user.data.user.email,
//           username: user.data.user.username || null,
//           metadata: {
//             verified: user.data.user.emailVerified,
//             createdAt: user.data.user.createdAt,
//           },
//         }
//       : null,
//     isPending: user.isPending,
//     refetch: user.refetch,
//     isRefetching: user.isRefetching,
//   };
// });

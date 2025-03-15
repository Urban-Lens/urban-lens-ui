import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/modules/auth/provider";
import { Toaster } from "sonner";


interface Props {
    children: React.ReactNode;
}


export const AppProviders = ({ children }: Props) => {
    const queryClient = new QueryClient();

    return (
        <>

            <AuthProvider>
                <Toaster duration={2000} richColors position="top-right" />
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </AuthProvider>

        </>
    );
};

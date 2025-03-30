import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { checkAdminAuth, loginAdmin } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import AdminDashboard from '@/components/AdminDashboard';
import KledeLogo from '@/components/KledeLogo';

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Admin: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check authentication status
  const authQuery = useQuery<{isAuthenticated: boolean}>({
    queryKey: ['/api/admin/check'],
    queryFn: async () => {
      try {
        console.log("Checking admin authentication...");
        const res = await checkAdminAuth();
        console.log("Auth response:", res);
        const data = await res.json();
        console.log("Auth data:", data);
        return data;
      } catch (error) {
        console.error("Auth check error:", error);
        return { isAuthenticated: false };
      }
    }
  });
  
  // Set authentication state when the query completes
  useEffect(() => {
    if (!authQuery.isPending) {
      console.log("Auth query completed:", authQuery.data);
      setIsAuthenticated(!!authQuery.data?.isAuthenticated);
      setIsLoading(false);
    }
  }, [authQuery.isPending, authQuery.data]);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginFormValues) => {
      console.log("Attempting login with:", { username: credentials.username });
      try {
        const response = await loginAdmin(credentials.username, credentials.password);
        console.log("Login response:", response);
        return response;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    onSuccess: async (response) => {
      try {
        console.log("Login succeeded, parsing response");
        const data = await response.json();
        console.log("Login data:", data);
        
        if (data.success) {
          console.log("Setting authenticated state to true");
          setIsAuthenticated(true);
          toast({
            title: "Login successful",
            description: "Welcome to the admin dashboard",
          });
        } else {
          console.log("Login response indicated failure");
          toast({
            title: "Login failed",
            description: "Server returned unsuccessful response",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error parsing login response:", error);
        toast({
          title: "Login error",
          description: "Could not process server response",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      console.error("Login mutation error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <AdminDashboard />;
  }
  
  return (
    <div className="checkered-bg min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <KledeLogo />
          </div>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        disabled={loginMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        disabled={loginMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02] hover:shadow-md" 
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Log in"
                )}
              </Button>
              
              <Button 
                variant="outline" 
                type="button" 
                className="w-full mt-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.02]" 
                onClick={() => setLocation('/')}
              >
                Back to Home
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;

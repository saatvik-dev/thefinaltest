import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteWaitlistEntry, getAllWaitlistEntries, logoutAdmin } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogOut, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLocation } from 'wouter';
import { format } from 'date-fns';
import { WaitlistEntry } from '@shared/schema';

const AdminDashboard: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const { data: entries = [], isLoading } = useQuery({
    queryKey: ['/api/admin/waitlist'],
    queryFn: async () => {
      const res = await getAllWaitlistEntries();
      const data = await res.json();
      return data as WaitlistEntry[];
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteWaitlistEntry(id),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Entry deleted successfully"
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/waitlist'] });
      setDeleteId(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete entry",
        variant: "destructive"
      });
    }
  });
  
  const logoutMutation = useMutation({
    mutationFn: () => logoutAdmin(),
    onSuccess: () => {
      toast({
        title: "Logged out",
        description: "You have been logged out"
      });
      setLocation('/');
    }
  });

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId);
    }
  };
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  const formatDate = (dateString: Date) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Waitlist Admin</h1>
        <Button variant="outline" onClick={handleLogout} disabled={logoutMutation.isPending}>
          {logoutMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <LogOut className="h-4 w-4 mr-2" />}
          Logout
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Waitlist Entries</CardTitle>
          <CardDescription>
            Manage all subscribers on the waiting list.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No entries found. The waitlist is empty.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.id}</TableCell>
                    <TableCell>{entry.email}</TableCell>
                    <TableCell>{formatDate(entry.createdAt)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteClick(entry.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this waitlist entry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/contexts/auth-context";
import {
  computeInvoiceStats,
  createInvoice,
  deleteInvoice,
  fetchInvoices,
  updateInvoiceStatus,
} from "@/lib/invoices";
import type { CreateInvoiceInput, InvoiceStatus } from "@/types/invoice";

export function useInvoices() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["invoices", user?.id],
    queryFn: () => fetchInvoices(user!.id),
    enabled: !!user?.id,
  });
}

export function useInvoiceStats() {
  const query = useInvoices();
  const stats = computeInvoiceStats(query.data ?? []);
  return { ...query, stats };
}

export function useCreateInvoice() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateInvoiceInput) => createInvoice(user!.id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices", user?.id] });
    },
  });
}

export function useUpdateInvoiceStatus() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: InvoiceStatus }) =>
      updateInvoiceStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices", user?.id] });
    },
  });
}

export function useDeleteInvoice() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteInvoice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices", user?.id] });
    },
  });
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateItem } from "@/hooks/use-items";
import { toast } from "sonner";
import { useEffect } from "react";
import type Item from "@/types/item";

const itemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be non-negative"),
  status: z.number().min(0).max(1),
});

type ItemFormValues = z.infer<typeof itemSchema>;

interface UpdateItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Item | null;
}

export default function UpdateItemModal({
  open,
  onOpenChange,
  item,
}: UpdateItemModalProps) {
  const updateItem = useUpdateItem();

  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      price: 0,
      status: 1,
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        name: item.name || "",
        price: item.price || 0,
        status: item.status ?? 1,
      });
    }
  }, [item, form]);

  const onSubmit = async (data: ItemFormValues) => {
    if (!item?.uuid) return;
    try {
      await updateItem.mutateAsync({ uuid: item.uuid, item: data });
      toast.success("Item updated successfully");
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update item");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Item</DialogTitle>
          <DialogDescription>
            Update the item information. All fields are required.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Item name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Active</SelectItem>
                      <SelectItem value="0">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={updateItem.isPending}>
              {updateItem.isPending ? "Updating..." : "Update"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


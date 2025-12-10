import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateIngredient } from "@/presentation/hooks/use-ingredients";
import type { Ingredient } from "@/core/domain/entities/Ingredient";
import {
  useState,
  type ComponentPropsWithRef,
  useEffect,
  useMemo,
} from "react";
import { toast } from "sonner";

interface UpdateIngredientModalProps
  extends ComponentPropsWithRef<typeof Dialog> {
  ingredient: Ingredient | null;
}

export default function UpdateIngredientModal({
  ingredient,
  ...props
}: UpdateIngredientModalProps) {
  const initialValues = useMemo(
    () => ({
      name: ingredient?.name ?? "",
      causeAlergy: ingredient?.cause_alergy ?? false,
      type: ingredient?.type ?? 0,
      status: ingredient?.status ?? 1,
    }),
    [ingredient]
  );
  const [name, setName] = useState(ingredient?.name ?? "");
  const [causeAlergy, setCauseAlergy] = useState(
    ingredient?.cause_alergy ?? false
  );
  const [type, setType] = useState(ingredient?.type ?? 0);
  const [status, setStatus] = useState(ingredient?.status ?? 1);
  const { mutate: updateIngredient } = useUpdateIngredient();

  useEffect(() => {
    setName(initialValues.name);
    setCauseAlergy(initialValues.causeAlergy);
    setType(initialValues.type);
    setStatus(initialValues.status);
  }, [initialValues]);

  const handleSubmit = () => {
    if (!ingredient) return;
    updateIngredient(
      {
        uuid: ingredient!.uuid!,
        ingredient: { name, cause_alergy: causeAlergy, type, status },
      },
      {
        onSuccess: () => {
          toast.success("Ingredient updated successfully");
          props.onOpenChange?.(false);
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to update ingredient");
        },
      }
    );
  };
  return (
    <Dialog {...props}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Ingredient</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Cause Alergy</Label>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={causeAlergy}
                onCheckedChange={(value) => setCauseAlergy(value === true)}
              />
              <Label>Accept terms and conditions</Label>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Type</Label>
            <Select
              value={type.toString()}
              onValueChange={(value) => setType(Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="1">Veggie</SelectItem>
                <SelectItem value="2">Vegan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select
              value={status.toString()}
              onValueChange={(value) => setStatus(Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Inactive</SelectItem>
                <SelectItem value="1">Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogContent>
    </Dialog>
  );
}


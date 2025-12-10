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
import { useCreateIngredient } from "@/presentation/hooks/use-ingredients";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateIngredientModal() {
  const [name, setName] = useState("");
  const [causeAlergy, setCauseAlergy] = useState(false);
  const [type, setType] = useState(0);
  const [status, setStatus] = useState(1);
  const { mutate: createIngredient } = useCreateIngredient();

  const handleSubmit = () => {
    createIngredient(
      { name, cause_alergy: causeAlergy, type, status },
      {
        onSuccess: () => {
          toast.success("Ingredient created successfully");
          setName("");
          setCauseAlergy(false);
          setType(0);
          setStatus(1);
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to create ingredient");
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Ingredient</Button>
      </DialogTrigger>
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

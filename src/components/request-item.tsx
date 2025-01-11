import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAddSurvivorInventoryMutation from "@/hooks/useAddSurvivorInventoryMutation";
import { useAlertStore } from "@/store/alertStore";
import { RequestItemInputs, SurvivorInventory } from "@/types/inventory";
import { Item } from "@/types/item";
import { useState } from "react";
import { set, SubmitHandler, useForm } from "react-hook-form";

interface RequestItemProps {
  refetch: any; // Function to refetch the data
  survivor: SurvivorInventory;
  items: Item[];
}

const RequestItem: React.FC<RequestItemProps> = ({ refetch, survivor, items }) => {
  const showMessage = useAlertStore((state) => state.showMessage);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RequestItemInputs>();

  setValue("survivorId", survivor.id);

  const addSurvivorInventoryMutation = useAddSurvivorInventoryMutation();

  const onSubmit: SubmitHandler<RequestItemInputs> = (data) => {
    addSurvivorInventoryMutation.mutate(data, {
      onSuccess: () => {
        showMessage("The item has been successfully requested!", "success"); // Trigger success message
        setOpen(false); // Close the dialog
        refetch(); // Refetch the data
      },
      onError: (error: any) => {
        showMessage(error.message || "An error occurred while requesting the item.", "error"); // Trigger error message
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="border rounded-lg">
          Request Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Item</DialogTitle>
          <DialogDescription>From {survivor.name}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Item Selection */}
            <div className="grid gap-4">
              <Label className="font-semibold" htmlFor="item">
                Choose Item
              </Label>
              <Select
                onValueChange={(value) => setValue("itemId", parseInt(value, 10))}
                value={watch("itemId")?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an Item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Items</SelectLabel>
                    {items?.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.itemId && <p className="text-red-500 text-sm">{errors.itemId.message}</p>}
            </div>

            {/* Quantity Input */}
            <div className="grid gap-4">
              <Label className="font-semibold" htmlFor="quantity">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                {...register("quantity", { required: "Quantity is required", valueAsNumber: true })}
              />
              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
            </div>
          </div>

          <DialogFooter className="grid grid-cols-2 gap-4">
            <Button variant="ghost">Cancel</Button>
            <Button className="bg-[#4D194D]" type="submit">
              Request Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestItem;

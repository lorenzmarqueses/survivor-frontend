"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAddSurvivorMutation from "@/hooks/useAddSurvivorMutation";
import { useAlertStore } from "@/store/alertStore";
import { AddSurvivorInputs } from "@/types/survivor";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";

interface AddSurvivorProps {
  refetch: any;
}

const AddSurvivor: React.FC<AddSurvivorProps> = ({ refetch }) => {
  const showMessage = useAlertStore((state) => state.showMessage);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddSurvivorInputs>();

  const addSurvivorMutation = useAddSurvivorMutation();

  const onSubmit: SubmitHandler<AddSurvivorInputs> = (data) => {
    addSurvivorMutation.mutate(data, {
      onSuccess: () => {
        showMessage("The survivor has been successfully added!", "success"); // Trigger success message
        setOpen(false); // Close the dialog
        refetch(); // Refetch the data
      },
      onError: (error: any) => {
        showMessage(error.message || "An error occurred while adding the survivor.", "error"); // Trigger error message
        setOpen(false); // Close the dialog
      },
    });
  };

  // Watch the "infected" field for the Select value
  const infected = watch("infected");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="border rounded-lg">
          <FaPlusCircle className="mr-2" />
          Add Survivor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Survivor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label className="font-semibold" htmlFor="name">
                Full Name of Survivor
              </Label>
              <Input
                id="name"
                placeholder="Enter survivor's name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label className="font-semibold" htmlFor="age">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter survivor's age"
                {...register("age", {
                  required: "Age is required",
                  valueAsNumber: true,
                })}
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label className="font-semibold" htmlFor="gender">
                Gender
              </Label>
              <Select onValueChange={(value) => setValue("gender", value)} value={watch("gender")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label className="font-semibold" htmlFor="infected">
                Infected Status
              </Label>
              <Select onValueChange={(value) => setValue("infected", value === "true")} value={infected?.toString()}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="true">Infected</SelectItem>
                    <SelectItem value="false">Not Infected</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.infected && <p className="text-red-500 text-sm">{errors.infected.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label className="font-semibold" htmlFor="latitude">
                Latitude
              </Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                placeholder="Enter latitude"
                {...register("latitude", {
                  required: "Latitude is required",
                  valueAsNumber: true,
                })}
              />
              {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label className="font-semibold" htmlFor="longitude">
                Longitude
              </Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                placeholder="Enter longitude"
                {...register("longitude", {
                  required: "Longitude is required",
                  valueAsNumber: true,
                })}
              />
              {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude.message}</p>}
            </div>
          </div>
          <DialogFooter className="grid grid-cols-2 gap-4">
            <Button variant="ghost" type="button">
              Cancel
            </Button>
            <Button className="bg-[#4D194D]" type="submit">
              Add Survivor
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSurvivor;
